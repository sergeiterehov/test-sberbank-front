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
     * Sorting direction. Null - for default sorting.
     */
    orderBy: null|number;
}

export class SortableTable extends React.Component<IPropsSortableTable, IStateSortableTable> {
    constructor(props) {
        super(props);

        this.state = {
            orderBy: null,
        };
    }

    public render() {
        const head = this.props.head;
        const body = this.props.body;

        return <table>
            <tr>
                {head.map((item) => <th>{item}</th>)}
            </tr>
            {body.map((row) => <tr>
                {row.map((cell) => <td>{cell.view}</td>)}
            </tr>)}
        </table>;
    }
}
