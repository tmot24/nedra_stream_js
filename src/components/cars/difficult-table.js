import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel,} from "@material-ui/core"
import {useEffect, useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {InputComponent} from "../controls/inputComponent"
import {SelectPanelYear} from "./selectPanelYear"
import {SelectPanelFuel} from "./selectPanelFuel"
import {SelectPanelBodyType} from "./selectPanelBodyType"
import {SelectPanelPrice} from "./selectPanelPrice"

const pages = [10, 15, 20, 25]
const headerTitle = [
    {id: "brand", label: "Brand"},
    {id: "model", label: "Model"},
    {id: "year", label: "Year"},
    {id: "fuel", label: "Fuel"},
    {id: "bodyType", label: "BodyType"},
    {id: "price", label: "Price"}]

const useStyles = makeStyles({
    head: {
        backgroundColor: "#c0e4ff",
        borderBottom: "1px solid black",
        borderRight: "1px solid black",
        "&:last-child": {
            borderRight: 0
        },
        width: 600
    },
    headCell: {
        display: "flex"
    }
})

export const DifficultTable = ({cars}) => {
    const [records, setRecords] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    const [brandFilter, setBrandFilter] = useState("")
    const [modelFilter, setModelFilter] = useState("")
    const [yearFilter, setYearFilter] = useState("")
    const [fuelFilter, setFuelFilter] = useState("")
    const [bodyTypeFilter, setBodyTypeFilter] = useState("")
    const [priceFilter, setPriceFilter] = useState("")
    const [pagesLength, setPagesLength] = useState(0)

    const classes = useStyles()

    useEffect(() => {
        setRecords(cars)
        setPagesLength(cars.length)
    }, [cars])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
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
    const handleSortRequest = (cellId) => {
        const isAsc = orderBy === cellId && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(cellId)
    }

    const stableSort = (array, comparator) => {
        const filterArray = array
            .filter(x => x.brand.toLowerCase().includes(brandFilter.toLowerCase()))
            .filter(x => x.model.toLowerCase().includes(modelFilter.toLowerCase()))
            .filter(x => String(x.year).includes(String(yearFilter)))
            .filter(x => x.fuel.includes(fuelFilter))
            .filter(x => x.bodyType.includes(bodyTypeFilter))
            .filter(x => String(x.price).includes(priceFilter))

        // setPagesLength(filterArray.length)

        const stabilizedThis = filterArray.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        })
        return stabilizedThis.map(el => el[0])
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(records, getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return (
        <>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {
                            headerTitle.map((item, index) =>
                                <TableCell key={index} className={classes.head}>
                                    <div className={classes.headCell}>
                                        <TableSortLabel
                                            active={orderBy === item.id}
                                            direction={orderBy === item.id ? order : "asc"}
                                            onClick={() => handleSortRequest(item.id)}
                                        >
                                            {item.label}
                                        </TableSortLabel>
                                        {item.label === "Brand" && <InputComponent label={"Search brands"}
                                                                                   onChange={(e) => setBrandFilter(e.target.value)}/>
                                        }
                                        {item.label === "Model" && <InputComponent label={"Search Model"}
                                                                                   onChange={(e) => setModelFilter(e.target.value)}/>
                                        }
                                        {item.label === "Year" &&
                                        <SelectPanelYear cars={cars} setYearFilter={setYearFilter}/>}
                                        {item.label === "Fuel" &&
                                        <SelectPanelFuel cars={cars} setFuelFilter={setFuelFilter}/>}
                                        {item.label === "BodyType" &&
                                        <SelectPanelBodyType cars={cars} setBodyTypeFilter={setBodyTypeFilter}/>}
                                        {item.label === "Price" &&
                                        <SelectPanelPrice cars={cars} setPriceFilter={setPriceFilter}/>}
                                    </div>
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map((item, index) =>
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
                             count={pagesLength}
                             onChangePage={handleChangePage}
                             onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}