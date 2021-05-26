import {Card, CardContent} from "@material-ui/core"

export const Cars = ({cars}) => {

    return (
        <div>
            {
                cars.map((elem, index) =>
                    <Card key={index}>
                        <CardContent>
                            <div>brand: {elem.brand}</div>
                            <div>model: {elem.model}</div>
                            <div>year: {elem.year}</div>
                            <div>fuel: {elem.fuel}</div>
                            <div>bodyType: {elem.bodyType}</div>
                            <div>price: {elem.price}</div>
                        </CardContent>
                    </Card>
                )
            }
        </div>
    )
}