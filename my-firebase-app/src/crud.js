import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import { doc, addDoc, collection, getDocs, updateDoc } from 'firebase/firestore'

const Crud = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [fetchData, setFetchData] = useState([])
  const [id, setId] = useState('')

  // Creating a Database Ref
  const dbref = collection(db, "my-firebase-app")

  // Add data to database
  const add = async () => {
    try {
      const addData = await addDoc(dbref, { Name: name, Address: address, Email: email })
      if (addData) {
        alert("Data Added Successfully")
        // Clear input fields after adding data
        setName('')
        setAddress('')
        setEmail('')
        // Fetch data again to include the newly added item
        fetch()
      }
    } catch (error) {
      alert("Error: " + error.message)
    }
  }

  // Fetch data from database
  const fetch = async () => {
    try {
      const snapshot = await getDocs(dbref)
      const fetchData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setFetchData(fetchData)
    } catch (error) {
      alert("Error: " + error.message)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  // Pass data to form for updating
  const passData = async (id) => {
    const matchId = fetchData.find((data) => data.id === id)
    setName(matchId.Name)
    setAddress(matchId.Address)
    setEmail(matchId.Email)
    setId(matchId.id)
  }

  // Update the data
  const update = async () => {
    try {
      const updateref = doc(db, "my-firebase-app", id)
      await updateDoc(updateref, { Name: name, Address: address, Email: email })
      alert("Updated Successfully")
      // Clear input fields after updating data
      setName('')
      setAddress('')
      setEmail('')
      // Fetch data again to include the updated item
      fetch()
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
          <button onClick={update}>Update</button>
        </div>
      </div>
      <div>
        <h2>CRUD Database</h2>
        <div className='container'>
          {fetchData.map(data => (
            <div key={data.id} className='box'>
              <h3>Name: {data.Name}</h3>
              <h3>Address: {data.Address}</h3>
              <h3>Email: {data.Email}</h3>
              <button onClick={() => passData(data.id)}>Update</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Crud
