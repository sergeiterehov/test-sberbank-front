import * as React from "react";
import * as ReactDOM from "react-dom";
import { IGetDataResult } from "../DataPrivider";
import { SortableTable, ISortableTableCell } from "./SratableTable";

export interface IPropsInfoTable {
    data: null|IGetDataResult;
}

/**
 * Main table with data.
 */
export class InfoTable extends React.Component<IPropsInfoTable> {
    constructor(props) {
        super(props);
    }

    public render() {
        const data = this.props.data;

        if (null === data) {
            return <div>Data is not ready.</div>;
        }

        const head = data.axis.map(
            (axis) => axis.name,
        );
        const body = this.getTable(data);

        return <SortableTable head={[...head, "Deviation from plan"]} body={body} />;
    }

    private getTable(data: IGetDataResult): ISortableTableCell[][] {
        /**
         * Max absolute delta's value.
         */
        const maxAbsDelta = data.data.reduce(
            (maxAbs, item) => Math.max(Math.abs(item.delta), maxAbs),
            0,
        );

        // TODO: Realize sort!
        const rows = [...data.data].sort((a, b) => 0).map(
            (item) => {
                const cells = item.vector.map(
                    (dimension) => ({
                        value: dimension,
                        view: <span>{dimension}</span>,
                    }),
                );

                const deltaAbsNormalized = 0 === maxAbsDelta ? 0 : Math.abs(item.delta) / maxAbsDelta;

                const progressNegative = item.delta < 0 ? <span>NEG[{deltaAbsNormalized}]</span> : null;
                const progressPositive = item.delta > 0 ? <span>POS[{deltaAbsNormalized}]</span> : null;

                return [
                    ...cells,
                    {
                        value: item.delta,
                        view: <span>
                            {progressNegative}
                            <span>{item.delta} {item.deltaMeasurement.ru}</span>
                            {progressPositive}
                        </span>,
                    },
                ];
            },
        );

        return rows;
    }
}
