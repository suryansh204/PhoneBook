import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function PersonForm({
  addname, newName, handleNameChange, newNumber, handleNumberChange
}) {
  return (
    <Box component="form" onSubmit={addname}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={newName}
          onChange={handleNameChange}
          required
          fullWidth
          size="small"
        />
        <TextField
          label="Number"
          value={newNumber}
          onChange={handleNumberChange}
          required
          fullWidth
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: 'flex-start',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #7c4dff, #00e5ff)',
            color: '#0a0c10'
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}



// const PersonForm = (props) => {

//   return (
//     <form onSubmit={props.addname}> 
//       <div>Name: <input value={props.newName} onChange={props.handleNameChange} /></div>
//       <div>Number: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
//         <button type="submit">Submit</button>
         
//     </form>
//   )
// }

// export default PersonForm;
