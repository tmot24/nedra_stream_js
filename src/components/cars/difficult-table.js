import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from "@material-ui/core"
import {useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles({
    headCell: {
        backgroundColor: "#c0e4ff",
        borderBottom: "1px solid black",
    }
})

export const DifficultTable = ({cars}) => {
    const [records, setRecords] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    const classes = useStyles()

    useEffect(() => {
        setRecords(cars)
    }, [cars])

    const pages = [10, 15, 20, 25]
    const headerTitle = [
        {id: "brand", label: "Brand"},
        {id: "model", label: "Model"},
        {id: "year", label: "Year"},
        {id: "fuel", label: "Fuel"},
        {id: "bodyType", label: "BodyType"},
        {id: "price", label: "Price"}]

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const handleSortRequest = (cellId) => {
        const isAsc = orderBy === cellId && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(cellId)
    }

    return (
        <>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {
                            headerTitle.map((item, index) =>
                                <TableCell key={index} className={classes.headCell}>
                                    <TableSortLabel onClick={() => handleSortRequest(item.id)}>
                                        direction
                                        {item.label}
                                    </TableSortLabel>
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        records.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) =>
                            <TableRow key={index}>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.model}</TableCell>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{item.fuel}</TableCell>
                                <TableCell>{item.bodyType}</TableCell>
                                <TableCell>{item.price}</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <TablePagination component={"div"}
                             page={page}
                             rowsPerPageOptions={pages}
                             rowsPerPage={rowsPerPage}
                             count={records.length}
                             onChangePage={handleChangePage}
                             onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}