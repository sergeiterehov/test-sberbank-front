import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ISortableTableCell {
    value: null|string|number|boolean;
    view: JSX.Element;
}

export interface IPropsSortableTable {
    head: string[];
    body: ISortableTableCell[][];
}

interface IStateSortableTable {
    /**
     * Columns index for sorting.
     */
    orderBy: null|number;
    /**
     * Sorting direction.
     */
    orderDirection: number;
}

/**
 * Labels for sort direction.
 */
const directionLabels = {
    1: <span>&uarr;</span>,
    0: <span>&mdash;</span>,
    [-1]: <span>&darr;</span>,
};

/**
 * Table with sorting functions.
 */
export class SortableTable extends React.PureComponent<IPropsSortableTable, IStateSortableTable> {
    constructor(props: IPropsSortableTable) {
        super(props);

        this.state = {
            orderBy: null,
            orderDirection: 1,
        };
    }

    public render() {
        const head = this.props.head;
        const body = this.body;

        return <table className="sb-table">
            <thead>
                <tr>
                    {head.map((item, column) => <th key={column} onClick={() => this.handlerSortTable(column)}>
                        {item}
                        {column === this.state.orderBy
                            ? <span className="direction">
                                {directionLabels[this.state.orderDirection]}
                            </span>
                            : null}
                    </th>)}
                </tr>
            </thead>
            <tbody>
                {body.map((row, ir) => <tr key={ir}>
                    {row.map((cell, ic) => <td key={ic}>{cell.view}</td>)}
                </tr>)}
            </tbody>
        </table>;
    }

    /**
     * Returns current prepared body.
     * If body was updated, will prepare it.
     */
    private get body() {
        const body = [...this.props.body];

        const sortColumn = this.state.orderBy;
        const sortDirection = this.state.orderDirection;

        if (null !== sortColumn && 0 !== sortDirection) {
            body.sort((a, b) => {
                const aValue = a[sortColumn].value;
                const bValue = b[sortColumn].value;

                const k = aValue > bValue ? 1 : aValue === bValue ? 0 : -1;

                return k * sortDirection;
            });
        }

        return body;
    }

    /**
     * Changes sorting method by column.
     *
     * @param index Index of column for sorting.
     */
    private handlerSortTable(index: number) {
        this.setState((prev) => ({
            orderBy: index,
            orderDirection: prev.orderBy === index ? - prev.orderDirection : 1,
        }));
    }
}
