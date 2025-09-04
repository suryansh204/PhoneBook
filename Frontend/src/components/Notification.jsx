import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function Notification({ message }) {
  const open = Boolean(message)
  return (
    <Snackbar open={open} autoHideDuration={2600} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity={message?.toLowerCase().includes('fail') ? 'error' : 'success'} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

// const Notification = (props) => {
//   if(props.message === null){
//     return null

//   }

//   return(
//     <div className='error'>
//       {props.message}
//     </div>
//   )
// }

// export default Notification;