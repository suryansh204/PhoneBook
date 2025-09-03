const PersonForm = (props) => {

  return (
    <form onSubmit={props.addname}> 
      <div>Name: <input value={props.newName} onChange={props.handleNameChange} /></div>
      <div>Number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
        <button type="submit">Submit</button>
         
    </form>
  )
}

export default PersonForm;