import {connect} from "react-redux"
import {getCars} from "../redux/carsReducer"
import {BasicTable} from "./basic-table"
import {useEffect} from "react"

const CarsContainer = ({cars, getCars}) => {

    useEffect(() => {
        getCars()
    }, [getCars])

    return (
        <div>
            <BasicTable cars={cars}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cars: state.carsPage.cars
    }
}

const mapDispatchToProps = {
    getCars
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsContainer)