const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log("Method: ", req.method)
    console.log("Path: ", req.path)
    console.log("Body: ", req.body);
    console.log("----------");
    next()
})
app.use(cors())

let overlapResult = []

let watchResult = {
    "symbol": "Ticker#1",
    "realtime": {
      "price": 640.39,
      "change": 1.61,
      "volume": 39097419
    },
    "fundamental": {
      "cap": "607.03B",
      "eps": 0.52,
      "pe": 1224.46,
      "ps": 21.16,
      "pb": 34.64,
      "peg": 1.16
    },
    "technical": {
      "ma": {
        "10": 669.12,
        "50": 756.66,
        "200": 509.21
      },
      "macd": {
        "line": -24.7,
        "signal": -26.02,
        "histogram": 1.3235
      },
      "rs": {
        "r3": 667.43,
        "r2": 653.87,
        "r1": 645.5,
        "pp": 631.94,
        "s1": 618.38,
        "s2": 610.01,
        "s3": 596.45
      }
    },
    "pattern": {
      "Doji": 0
    }
}

app.get('/', (req, res) => {
    res.send('<h1>This is auto-money project root page</h1>')
})

app.get('/api/overlapResult', (req, res) => {
    res.json(overlapResult)
})

app.get('/api/overlapResult/:id', (req, res) => {
    const id = Number(req.params.id)
    const content = overlapResult.find(each => each.id === id)
    if (content) {
        res.json(content)
    } else {
        res.status(404).end()
    }
})

app.post('/api/overlapResult', (req, res) => {
    const id = overlapResult.length > 0
        ? Math.max(...overlapResult.map(each => each.id))+1
        : 1
    const content = req.body
    if (!content.fundOne || !content.fundTwo){
        return res.status(400).json({
            error: "missing fundOne or fundTwo"
        })
    }
    content.id = id
    overlapResult = overlapResult.concat(content)
    res.json(content)
})

app.delete('/api/overlapResult', (req, res) => {
    const id = Number(req.params.id)
    overlapResult = overlapResult.filter(each => each.id !== id)
    res.status(204).end()
})

app.get('/api/watchResult', (req, res) => {
    res.json(watchResult)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})