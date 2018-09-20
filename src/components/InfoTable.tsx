import * as React from "react";
import * as ReactDOM from "react-dom";
import { IGetDataResult } from "../DataPrivider";
import { SortableTable, ISortableTableCell } from "./SratableTable";
import { Cache } from "../helpers/Cache";
import { DeltaView } from "./DeltaView";

export interface IPropsInfoTable {
    data: null|IGetDataResult;
}

/**
 * Main table with data.
 * Uses internal cache method.
 */
export class InfoTable extends React.Component<IPropsInfoTable> {
    /**
     * Cached table data.
     */
    private tableCache: Cache<{
        head: string[];
        body: ISortableTableCell[][];
    }>;

    constructor(props) {
        super(props);

        this.tableCache = Cache.it((data: IGetDataResult) => ({
            head: this.getTableHead(data),
            body: this.getTableBody(data),
        }));
    }

    public render() {
        const data = this.props.data;

        if (null === data) {
            return <div>Data is not ready.</div>;
        }

        const table = this.tableCache.get([data]);

        return <SortableTable head={table.head} body={table.body} />;
    }

    /**
     * Return head of table.
     *
     * @param data Data object.
     */
    private getTableHead(data: IGetDataResult): string[] {
        return [
            ...data.axis.map(
                (axis) => axis.name,
            ),
            "Deviation from plan",
        ];
    }

    /**
     * Return body of table.
     *
     * @param data Data object.
     */
    private getTableBody(data: IGetDataResult): ISortableTableCell[][] {
        /**
         * Max absolute delta's value.
         */
        const maxAbsDelta = data.data.reduce(
            (maxAbs, item) => Math.max(Math.abs(item.delta), maxAbs),
            0,
        );

        const rows = data.data.map(
            (item) => {
                const cells = item.vector.map(
                    (dimension) => ({
                        value: dimension,
                        view: <span>{dimension}</span>,
                    }),
                );

                return [
                    ...cells,
                    {
                        value: item.delta,
                        view: <DeltaView delta={item.delta}
                            measurement={item.deltaMeasurement.ru}
                            maxAbsDelta={maxAbsDelta} />,
                    },
                ];
            },
        );

        return rows;
    }
}
