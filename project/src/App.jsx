import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactsList from './ContactsList'
import { useDispatch } from 'react-redux'
import { EnterDetails } from "./app/contactsSlice"
import Sidebar from './Sidebar'
import logo from './assets/logo.png'




function App() {
  const [open, setOpen] = useState(false);

  let dispatch = useDispatch();
  useEffect(() => {
    fetch("../public/contacts.json")
      .then(response => response.json())
      .then(data => {
        dispatch(EnterDetails(data))

      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  return (

    <div style={{ position: 'relative' }}> 
    <img 
      src={logo} 
      alt=" logo" 
      style={{ 
        top: 0, 
        left: 0,
        width: '220px',
        height: 'auto' 
      }} 
    />
    <ContactsList setOpen={setOpen} />
    <Sidebar open={open} setOpen={setOpen} />
  </div>
  )
}

export default App
