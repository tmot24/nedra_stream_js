import axios from "axios";

export const getData = () => {
    return axios.get("/cars").then(res => res.data.cars)
}