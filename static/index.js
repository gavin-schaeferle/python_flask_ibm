const express = require('express')
const app = express()

app.use(express.static('.'))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.listen(8000, () => console.log('Example app listening on port 8000!'))