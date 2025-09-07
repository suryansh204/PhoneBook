const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://PhoneBook:${password}@cluster0.8pzddme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', phoneSchema)

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
})


if(process.argv.length === 3){Contact.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})}

else{contact.save().then(result => {
  console.log(`added ${process.argv[3]} to phonebook!`)
  mongoose.connection.close()
})
}






