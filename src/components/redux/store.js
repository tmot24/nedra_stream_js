import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import {CarsReducer} from "./carsReducer"

// расширение для chrome Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    carsPage: CarsReducer,
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))