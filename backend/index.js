require('dotenv').config()
const express = require('express')
const cors = require('cors')
const overlapResults = require('./models/overlapResults')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use((req, res, next) => {
    console.log("Method: ", req.method)
    console.log("Path: ", req.path)
    console.log("Body: ", req.body);
    console.log("----------");
    next()
})
app.use(cors())

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
    res.send('<h1>This is auto-monkey project root page</h1>')
})

app.get('/api/overlapResult', (req, res) => {
    overlapResults.find({})
      .then(response => {
        res.json(response)
      })
})

app.get('/api/overlapResult/:id', (req, res, next) => {
    const id = req.params.id
    overlapResults.findById(id)
      .then(response => {
        if (response) {
          res.json(response)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.post('/api/overlapResult', (req, res) => {
    const body = req.body
    const newOverlapResult = new overlapResults({
      fundName: body.fundName,
      overlap: body.overlap,
      expand: body.expand,
      queryMode: body.queryMode
    })
    newOverlapResult.save()
      .then(response => {
        res.json(response)
      })
})

const errorHandler = (error, req, res, next) => {
  console.log(error)
  if (error.name === 'CastError' || error.kind === 'ObjectId') {
    return res.status(400).send({error: 'invalid Id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({error: error.message})
  }
  next(error)
}

app.use(errorHandler)

app.delete('/api/overlapResult/:id', (req, res, next) => {
    overlapResults.findByIdAndRemove(req.params.id)
      .then(response => {
        res.status(204).end()
      })
      .catch(error => next(error))
})

app.get('/api/watchResult', (req, res) => {
    res.json(watchResult)
})

app.put('/api/overlapResult/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body
    overlapResults.findByIdAndUpdate(id, body, {new: true})
      .then(response => {
        res.json(response)
      })
      .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})