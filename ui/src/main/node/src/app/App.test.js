import React from "react";
import App from "./App";
import store from "../store";
import {Provider} from "react-redux";
import api from "./Rest";
import * as sinon from "sinon";
import renderer from "react-test-renderer";
import {functions} from "./TodosDates";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {createMuiTheme} from "@material-ui/core";

let sandbox;

it("renders App without crashing", function () {
    const resolved = new Promise((r) => (r({data: []})));
    sandbox.stub(api, "get").returns(resolved);
    sandbox.stub(functions, "getNow").returns(new Date("1995-12-17T03:24:00"));
    renderer.create((
        <MuiThemeProvider theme={createMuiTheme({})}>
            <Provider store={store}><App/></Provider>
        </MuiThemeProvider>
    ));
});

beforeAll(() => sandbox = sinon.createSandbox());

afterAll(() => sandbox.restore());
