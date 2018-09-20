import * as React from "react";
import * as ReactDOM from "react-dom";
import { InfoTable } from "./components/InfoTable";
import { IGetDataResult, DataProvider } from "./DataPrivider";

export interface IPropsApp {
    dataProvider: DataProvider;
}

interface IStateApp {
    data: null|IGetDataResult;
    x: number;
}

/**
 * Main application.
 */
export class App extends React.Component<IPropsApp, IStateApp> {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            x: 1,
        };

        setInterval(() => this.setState({x: this.state.x}), 1000);
    }

    public render() {
        return <InfoTable data={this.state.data} />;
    }

    public componentDidMount() {
        this.updateData();
    }

    /**
     * Update data from provider.
     */
    private async updateData() {
        const data = await this.props.dataProvider.getData();

        this.setState({data});
    }
}
