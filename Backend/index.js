const Contact = require('./contact.js')
const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('json-content', (req) => {
  return req.body ? JSON.stringify(req.body) : '-'
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




app.get('/api/persons', (request, response) => {

  Contact.find({}).then(names => {
    response.json(names)
  }) .catch(error => {
    console.log(error)
    response.status(500).end()
  })})

app.get('/info', (request, response) => {
  const num =  Contact.collection.countDocuments()
  const date = new Date()
  response.send(`<h3>Phone Book has ${num} entries</h3>
    <p>${date}</p>`)})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id).then(contact => {
    if (contact) {
      response.json(contact)
    }else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})


app.post('/api/persons', (request,response) => {
  const { name, number } = request.body
  const newContact = new Contact({
    name: name,
    number: number,
  })

  newContact.save().then(savedContact => {response.json(savedContact)
  }) .catch(error => {
    console.log(error)
    response.status(500).end()
  })
})


app.delete('/api/persons/:i', (request, response) => {


  Contact.findByIdAndDelete(request.params.i)
    .then(result => {
      if(result){
        response.status(204).end()
      }
      else{
        response.status(404).end()
      }
    }
   ) .catch(error => {
      console.log(error)
      response.status(500).end()
    })


})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Contact.findById(request.params.id ).then(result => {
    if(!result){
      response.status(404).end()
    }
    result.name = name
    result.number = number

    return result.save().then((updatedContact) => {
      response.json(updatedContact)
    })

  }).catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
  return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})
