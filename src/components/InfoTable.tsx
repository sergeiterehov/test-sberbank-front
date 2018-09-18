import * as React from "react";
import * as ReactDOM from "react-dom";
import { IGetDataResult } from "../DataPrivider";

export interface IPropsInfoTable {
    data: null|IGetDataResult;
}

interface IStateInfoTable {
    /**
     * Sorting direction. Null - for default sorting.
     */
    orderBy: null|number;
}

/**
 * Main table with data.
 */
export class InfoTable extends React.Component<IPropsInfoTable, IStateInfoTable> {
    constructor(props) {
        super(props);

        this.state = {
            orderBy: null,
        };
    }

    public render() {
        const data = this.props.data;

        if (null === data) {
            return <div>Data is not ready.</div>;
        }

        const axisHeads = data.axis.map(
            (axis) => <th key={axis.id}>{axis.name}</th>,
        );
        const rows = this.renderRows(data);

        return <table>
            <tr>
                {axisHeads}
                <th>Deviation from plan</th>
            </tr>
            {rows}
        </table>;
    }

    /**
     * Renders all rows of table.
     */
    private renderRows(data: IGetDataResult) {
        /**
         * Max absolute delta's value.
         */
        const maxAbsDelta = data.data.reduce(
            (maxAbs, item) => Math.max(Math.abs(item.delta), maxAbs),
            0,
        );

        // TODO: Realize sort!
        const rows = [...data.data].sort((a, b) => 0).map(
            (item, itemIndex) => {
                const cells = item.vector.map(
                    (dimension, dimensionIndex) => <td key={dimensionIndex}>{dimension}</td>,
                );

                const deltaAbsNormalized = 0 === maxAbsDelta ? 0 : Math.abs(item.delta) / maxAbsDelta;

                const progressNegative = item.delta < 0 ? <span>NEG[{deltaAbsNormalized}]</span> : null;
                const progressPositive = item.delta > 0 ? <span>POS[{deltaAbsNormalized}]</span> : null;

                return <tr key={itemIndex}>
                    {cells}
                    <td key="delta">
                        {progressNegative}
                        <span>{item.delta} {item.deltaMeasurement.ru}</span>
                        {progressPositive}
                    </td>
                </tr>;
            },
        );

        return rows;
    }
}
