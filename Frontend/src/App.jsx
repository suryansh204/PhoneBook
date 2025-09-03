import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

import Personx from './components/Personx'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [error, setError] = useState('...')

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



const handleDelete = (id) => {
  console.log("starting del");
  
  // Update UI immediately (optimistic update)
  setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
  
  phonebookService
    .del(id)
    // .then(() => {
    //   console.log("then worked - server confirmed deletion");
    //   setError(`successfully deleted contact`);
    // })
    .then(() => {
      try {
        console.log("✅ Entered .then() block");
        
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        
        console.log("✅ State updated successfully");
        console.log("then worked");
      } catch (error) {
        console.error("❌ ERROR in .then() block:", error);
      }
    })
    .catch(error => {
      console.error("Delete failed:", error);
      setError(`Contact was already deleted`);
      // UI already updated above, so no need to do it again
    });
    
  setTimeout(() => {
    setError(null);
  }, 3000);
};

  
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
      <Personx filterPerson={filer} onDelete={handleDelete}/>
    </div>
  )
}

export default App

