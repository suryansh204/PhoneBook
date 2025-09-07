import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Personx from './components/Personx'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [error, setError] = useState('...')

  const handleDelete = (id) => {
    console.log("starting del");
    phonebookService
      .del(id)
      .then(() => {
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        console.log("then worked");
        setError(`successfully deleted contact`);
        setTimeout(() => setError(null), 3000);
      })
      .catch(error => {
        console.error("Delete failed:", error);
        alert('error occurred, already deleted');
      });
  };

  const hook = () => {
    console.log('effect')
    phonebookService.getAll().then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }
  useEffect(hook, [])

  const handleFilterChange = (e) => setFilteredName(e.target.value)
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const AddName = (event) => {
    event.preventDefault()
    const nameClean = newName.trim()
    const numberClean = newNumber.trim()
    if (!nameClean || !numberClean) return

    const existing = persons.find(p => p.name === nameClean)

    if (existing) {
      const ok = window.confirm(`${existing.name} is already added to phonebook. Replace the old number with a new one?`)
      if (ok) {
        const updated = { ...existing, number: numberClean }
        phonebookService.update(existing.id, updated)
          .then(res => {
            setPersons(prev => prev.map(p => (p.id !== existing.id ? p : res.data)))
            setNewName(''); setNewNumber('')
            setError(`updated contact info for ${existing.name}`)
          })
          .catch(err => {
            console.error('Update failed:', err)
            setError(`Information of ${existing.name} was already removed from server.`)
            setPersons(prev => prev.filter(p => p.id !== existing.id))
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebookService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName(''); setNewNumber('')
        })
      setError(`successfully added ${nameClean}`)
      setTimeout(() => setError(null), 3000)
    }
  }

  const filer = persons.filter(str =>
    str.name.toLowerCase().includes(filteredName.toLowerCase())
  )


return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: '#0f1115',
        color: '#e6e9ef',
        backgroundImage: `
          radial-gradient(1200px 600px at 20% -10%, rgba(124,77,255,.22), transparent),
          radial-gradient(1200px 600px at 120% 20%, rgba(0,229,255,.14), transparent)
        `,
      }}
    >
      {/* Top bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(10,12,16,0.55)',
          backdropFilter: 'saturate(140%) blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Toolbar>
          <Box
            sx={{
              width: 10, height: 10, borderRadius: '50%', mr: 1.25,
              background: 'linear-gradient(135deg, #7c4dff, #00e5ff)',
              boxShadow: '0 0 14px rgba(124,77,255,.8)'
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '.3px' }}>
            Contactly
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="caption" sx={{ color: 'rgba(230,233,239,.7)' }}>
            {filer.length} shown / {persons.length} total
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 5 }}>
        {/* Toast/notice */}
        <Notification message={error} />

        {/* Filter */}
        <Paper
          elevation={8}
          sx={{
            p: 3, mb: 3, borderRadius: 3,
            bgcolor: 'rgba(20,26,35,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 12px 34px rgba(0,0,0,.36)',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <Typography variant="body2" sx={{ minWidth: 150, color: 'rgba(230,233,239,.7)' }}>
              filter shown with:
            </Typography>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Filter value={filteredName} onChange={handleFilterChange}/>
            </Box>
          </Stack>
        </Paper>

        {/* Add / Update */}
        <Paper
          elevation={8}
          sx={{
            p: 3, mb: 3, borderRadius: 3,
            bgcolor: 'rgba(20,26,35,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 12px 34px rgba(0,0,0,.36)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1.5,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #7c4dff, #00e5ff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Add a New person
          </Typography>

          <PersonForm
            addname={AddName}
            newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
          />
        </Paper>

        {/* Numbers */}
        <Paper
          elevation={8}
          sx={{
            p: 3, borderRadius: 3,
            bgcolor: 'rgba(20,26,35,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 12px 34px rgba(0,0,0,.36)',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #7c4dff, #00e5ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Numbers
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.15)' }} />
          <Personx filterPerson={filer} onDelete={handleDelete}/>
        </Paper>
      </Container>
    </Box>
  )
}

export default App

