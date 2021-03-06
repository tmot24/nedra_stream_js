import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

export const SelectPanelFuel = ({cars, setFuelFilter}) => {
    const classes = useStyles()
    const [state, setState] = React.useState("")

    const handleChange = (event) => {
        setState(event.target.value)
        setFuelFilter(event.target.value)
    }

    const unique = [...new Set(cars.map(item => item.fuel))].sort()

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Fuel</InputLabel>
                <Select
                    value={state}
                    onChange={handleChange}
                    label={"Fuel"}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        unique.map((item, index) =>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    )
}
