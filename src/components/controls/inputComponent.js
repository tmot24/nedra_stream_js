import {InputAdornment, TextField} from "@material-ui/core"
import {Search} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles({
    searchInput: {
        margin: "10px 10px 10px 0px",
    },
})

export const InputComponent = (props) => {
    const classes = useStyles()
    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            className={classes.searchInput}
            InputProps={{
                startAdornment: (<InputAdornment position="start">
                    <Search/>
                </InputAdornment>),
            }}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}