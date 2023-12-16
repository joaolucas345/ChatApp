const express = require('express')
const { createServer } = require('http')
const cors = require('cors')
require("./socket")
const connectCollection = require('../db/mongodb')

const PORT = process.env.PORT || 3001

const app = express()
const server = createServer(app)
app.use(cors())

let vals = []

const main = async () => {
    const {client, collection} = await connectCollection()
    vals = await collection.find().toArray()
}


main()

app.get('/users', (req,res) => {
    res.send(vals)
})


server.listen(PORT, () => console.log("server running"))