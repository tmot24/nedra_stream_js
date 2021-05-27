import {memo, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@material-ui/core"

const columns = [
    {id: "brand", label: "Brand", minWidth: 170},
    {id: "model", label: "Model", minWidth: 170, align: "right"},
    {id: "year", label: "Year", minWidth: 170, align: "right"},
    {id: "fuel", label: "Fuel", minWidth: 170, align: "right"},
    {id: "bodyType", label: "BodyType", minWidth: 170, align: "right"},
    {id: "price", label: "Price", minWidth: 170, align: "right"},
]

const useStyles = makeStyles({
    main: {
        maxHeight: "100vh"
    },
    root: {
        width: "100%",
    },
    container: {
        maxHeight: `calc(100vh - 52px)`,
    },
})

export const BasicTable = memo(({cars}) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)


    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <div className={classes.main}>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) =>
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell key={index} align={column.align}>
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={cars.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
})