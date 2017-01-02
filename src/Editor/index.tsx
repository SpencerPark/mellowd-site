import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { createStore } from "redux";

import { EditorReducer } from "./reducers";
import { DEFAULT_EDITOR_STATE } from "./model";

import Editor from "./containers/Editor";

const store = createStore(EditorReducer, DEFAULT_EDITOR_STATE);

ReactDOM.render(
    <Provider store={store}>
        <Editor />
    </Provider>,
    document.getElementById("app-root"));