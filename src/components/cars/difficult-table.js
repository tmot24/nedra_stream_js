import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar
} from "@material-ui/core"
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

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilizedThis.map(el => el[0])
    }

    const getComparator = (order, orderBy) => {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) return -1
        if (b[orderBy] > a[orderBy]) return 1
        return 0
    }

    return (
        <>
            <Toolbar>

            </Toolbar>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {
                            headerTitle.map((item, index) =>
                                <TableCell key={index} className={classes.headCell}>
                                    <TableSortLabel
                                        active={orderBy === item.id}
                                        direction={orderBy === item.id ? order : "asc"}
                                        onClick={() => handleSortRequest(item.id)}
                                    >
                                        {item.label}
                                    </TableSortLabel>
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        stableSort(records, getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item, index) =>
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