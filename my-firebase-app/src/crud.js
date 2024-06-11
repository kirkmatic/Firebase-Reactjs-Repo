import React, { useState } from 'react'
import { db } from './firebase'
import { addDoc, collection } from 'firebase/firestore'

const Crud = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  
  // Creating a Database Ref
  const dbref = collection(db, "my-firebase-app")

  // Add data to database
  const add = async () => {
    try {
      const addData = await addDoc(dbref, { Name: name, Address: address, Email: email })
      if (addData) {
        alert("Data Added Successfully")
        setName('')
        setAddress('')
        setEmail('')
      }
    } catch (error) {
      alert("Error: " + error.message)
    }
  }

  return (
    <>
      <div className='form_container'>
        <h2>Add / Update Form</h2>
        <div className='box'>
          <input 
            type='text' 
            placeholder='Fullname' 
            autoComplete='off'  
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type='text' 
            placeholder='Address' 
            autoComplete='off' 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
          <input 
            type='email' 
            placeholder='Email' 
            autoComplete='off' 
            value={email}  
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button onClick={add}>Add</button>
          <button>Update</button>
        </div>
      </div>
      <div>
        <h2>CRUD Database</h2>
        <div className='container'>
          <div className='box'>
            {/* Additional CRUD functionality can be added here */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Crud
