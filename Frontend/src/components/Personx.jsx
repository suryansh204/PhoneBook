import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'

export default function Personx({ filterPerson, onDelete }) {
  return (
    <List disablePadding>
      {filterPerson.map((person) => (
        <ListItem
          key={person.id}
          secondaryAction={
            <Tooltip title="Delete">
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(person.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          sx={{
            mb: 1,
            borderRadius: 2,
            bgcolor: '#121722',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <ListItemText
            primary={person.name}
            secondary={person.number}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItem>
      ))}
    </List>
  )
}

//Base version
// const Personx = ({ filterPerson, onDelete }) => {
//   console.log("Persons component rendered, onDelete is:", typeof onDelete); // Add this
  
//   return (
//     <ul>
//       {filterPerson.map((person) => (
//         <li key={person.id}>
//           {person.name}: {person.number}{' '}
//           <button
//             type="button"
//             onClick={() => {
//               console.log('clicked', person.id);     
//               console.log('onDelete function:', onDelete); // Add this
//               onDelete(person.id);
//             }}
//           >
//             delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Personx;
