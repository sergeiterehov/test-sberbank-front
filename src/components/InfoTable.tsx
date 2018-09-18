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

export class InfoTable extends React.Component<IPropsInfoTable, IStateInfoTable> {
    constructor(props) {
        super(props);

        this.state = {
            orderBy: null,
        };
    }

    public render() {
        if (null === this.props.data) {
            return <div>Table is empty.</div>;
        }

        const rows = this.renderRows();

        return <table>{rows}</table>;
    }

    /**
     * Renders all rows of table.
     */
    private renderRows() {
        const rows = [];
        return rows;
    }
}
