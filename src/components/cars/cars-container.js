import {connect} from "react-redux"
import {Cars} from "./cars"
import {getCars} from "../redux/carsReducer"

const CarsContainer = ({cars, getCars}) => {

    return (
        <div>
            <Cars cars={cars} getCars={getCars}/>
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