import {connect} from "react-redux"
import {getCars} from "../redux/carsReducer"
import {DifficultTable} from "./difficult-table"
import {useEffect} from "react"

const CarsContainer = ({cars, getCars}) => {
    useEffect(() => {
        getCars()
    }, [getCars])
    return (
        <div>
            <DifficultTable cars={cars}/>
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