import express from "express"
import {createServer} from "http"
import {db} from "./db.mjs"

// создаю express приложение
const app = express()
// создаю http сервер через express приложение
const server = createServer(app)
// express приложение может принимать json
app.use(express.json())


app.get("/cars", (request, response) => {
    response.send(db)
})

// в package.json необходимо указать proxy для корректной работы
server.listen(9999, (error) => {
    if (error) throw Error(error)
    console.log("server started...")
})