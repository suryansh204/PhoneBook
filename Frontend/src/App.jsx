import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

const Persons = (props) => {
  return (
    <ul>
      {props.filterPerson.map((person) => {
        console.log(person); 

 
        return (
          <div key={person.id}>
          <li >
            {person.name}: {person.number + "   "}
              <button onClick={() => props.ondelete(person.id)}>delete</button>
          </li>
           </div>
        );
      })}
    </ul>
  );
};

const PersonForm = (props) => {

  return (
    <form onSubmit={props.addname}> 
      <div>Name: <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div>Number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        <button type="submit">Submit</button>
         
    </form>
  )
}


const Filter = (props) => {

  return(
   <input value={props.value} onChange={props.onChange} />
  )

}

const Notification = (props) => {
  if(props.message === null){
    return null

  }

  return(
    <div className='error'>
      {props.message}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [error, setError] = useState('...')

  const handleDelete = (id) => {
  phonebookService
    .del(id)
    .then(() => {
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
    })
    .catch(error => {
      console.error("Delete failed:", error);
      alert('error occured, already deleted')
      
    });
    setError(`successfully deleted contact`);
        setTimeout(() => {
          setError(null)
        }, 3000)
     
};

  const hook = () => {
  console.log('effect')
  phonebookService
    .getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
}

  useEffect(hook, [])

  const handleFilterChange = (event) => {setFilteredName(event.target.value)}
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}

  
  const AddName = (event) => {
    event.preventDefault()

    const nameClean = newName.trim();
    const numberClean = newNumber.trim();

    if (!nameClean || !numberClean) return;


    const existing = persons.find(
    p => p.name.toLowerCase() === nameClean.toLowerCase()
  );

  if(existing){
    const ok = window.confirm(`${existing.name} is already added to phonebook. Replace the old number with a new one?`);
    if(ok){
      const updated = { ...existing, number: numberClean };
        phonebookService
      .update(existing.id, updated)
      .then(res => {
        // Replace the person in state with server’s updated record (has the real id, etc.)
        setPersons(prev =>
          prev.map(p => (p.id !== existing.id ? p : res.data))
        );
        setNewName('');
        setNewNumber('');
        setError(`updated contact info for ${existing.name}`)
       
      })
      .catch(err => {
        console.error('Update failed:', err);
        // If the record was removed on the server, tell the user and clean up local state
        setError(
          `Information of ${existing.name} was already removed from server.`
        )
        setPersons(prev => prev.filter(p => p.id !== existing.id));
      });
    }
  }
else{
    const newPerson = {name: newName, number: newNumber }
     // add to array
    
    phonebookService
    .create(newPerson) 
    .then(response => {setPersons(persons.concat(response.data)) 
      setNewName('')
      setNewNumber('')})
      
      setError(`successfully added ${newName}`);
        setTimeout(() => {
          setError(null)
        }, 3000)
    
  }}

  const filer =  persons.filter(str => str.name.toLowerCase().includes(filteredName.toLowerCase()))

 
  return (
    
    <div>
      <h2>PhoneBook</h2>
      <Notification message= {error} />
      <div>
        filter shown with: <Filter value={filteredName} onChange={handleFilterChange}/>
      </div>
        <div>
          <h2>Add a New person</h2>
          <PersonForm addname={AddName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>          
        </div>
    
      <h2>Numbers</h2>
      <Persons filterPerson={filer} ondelete={handleDelete}/>
    </div>
  )
}

export default App

