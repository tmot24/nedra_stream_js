import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {App} from "./components/app/app"
import {CssBaseline} from "@material-ui/core"
import {store} from "./components/redux/store"

ReactDOM.render(
    <Provider store={store}>
        <CssBaseline/>
        <App/>
    </Provider>,
    document.getElementById("root"),
)
