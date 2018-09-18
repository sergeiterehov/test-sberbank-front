import * as React from "react";
import * as ReactDOM from "react-dom";
import { DataProvider } from "./DataPrivider";
import { App } from "./App";

const root = document.getElementById("test-sb-root");

const dataProvider = new DataProvider(root.dataset.baseUrl);
const app = <App dataProvider={dataProvider}/>;

ReactDOM.render(app, root);
