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

export const SelectPanelYear = ({cars, setYearFilter}) => {
    const classes = useStyles()
    const [state, setState] = React.useState("")

    const handleChange = (event) => {
        setState(event.target.value)
        setYearFilter(event.target.value)
    }

    const unique = [...new Set(cars.map(item => item.year))].sort()

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
                <Select
                    value={state}
                    onChange={handleChange}
                    label={"Year"}
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
