import {getData} from "../api/api"

const initialState = {
    cars: []
}

export const CarsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CARS_DATA":
            return {
                cars: action.payload
            }
        default:
            return state
    }
}

const actions = {
    setCarsData: (payload) => ({type: "SET_CARS_DATA", payload})
}

export const getCars = () => async (dispatch) => {
    const arrayCars = await getData()
    dispatch(actions.setCarsData(arrayCars))
}