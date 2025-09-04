import TextField from '@mui/material/TextField'

export default function Filter({ value, onChange }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      size="small"
      placeholder="Search contacts…"
      inputProps={{ spellCheck: false }}
      sx={{
        '& .MuiInputBase-root': {
          bgcolor: '#0f141c',
          borderRadius: 2,
        }
      }}
    />
  )
}


// const Filter = (props) => {

//   return(
//    <input value={props.value} onChange={props.onChange} />
//   )

// }

// export default Filter;
