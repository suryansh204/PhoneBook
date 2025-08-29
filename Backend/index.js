const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.static('dist'))

morgan.token('json-content', (req, res) => {
    return req.body ? JSON.stringify(req.body) : "-";
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['json-content'](req, res)
  ].join(' ')
}))



let names = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json'})
//   response.end(JSON.stringify(names))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
app.get('/api/persons', (request, response) => {
  response.json(names)
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {

    const num =  names.length;
    const date = new Date(); 
    response.send(`<h3>Phone Book has ${num} entries</h3>
    <p>${date}</p>`)

})

app.get('/api/persons/:i', (request, response) => {

    const i = Number(request.params.i)
    const name = names.find(n => Number(n.id) === i)

    if(name){

    response.json(name)}else{
        response.status(404).json({ error: 'Person not found' })
    }

})

app.post('/api/persons', (request,response) => {
    const person = request.body

      if (!person.name || !person.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

    const namee = {
        id:  Math.floor(Math.random() * 1000000),
        name: person.name,
        number: person.number,


    }

    names = names.concat(namee)
    response.json(namee)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})
