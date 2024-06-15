import React, { useEffect, useState } from 'react';
import { auth, db } from './authentications/Firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Crud = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [fetchData, setFetchData] = useState([]);
  const [id, setId] = useState('');

  // Creating a Database Ref
  const dbref = collection(db, "my-firebase-app");

  // Add data to database
  const add = async () => {
    try {
      const addData = await addDoc(dbref, { Name: name, Address: address, Email: email });
      if (addData) {
        alert("Data Added Successfully");
        // Clear input fields after adding data
        setName('');
        setAddress('');
        setEmail('');
        // Fetch data again to include the newly added item
        fetch();
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Fetch data from database
  const fetch = async () => {
    try {
      const snapshot = await getDocs(dbref);
      const fetchData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFetchData(fetchData);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  // Pass data to form for updating
  const passData = async (id) => {
    const matchId = fetchData.find((data) => data.id === id);
    setName(matchId.Name);
    setAddress(matchId.Address);
    setEmail(matchId.Email);
    setId(matchId.id);
  };

  // Update the data
  const update = async () => {
    try {
      const updateref = doc(db, "my-firebase-app", id);
      await updateDoc(updateref, { Name: name, Address: address, Email: email });
      alert("Updated Successfully");
      // Clear input fields after updating data
      setName('');
      setAddress('');
      setEmail('');
      // Fetch data again to include the updated item
      fetch();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Delete the data
  const del = async (id) => {
    try {
      const delref = doc(db, "my-firebase-app", id);
      await deleteDoc(delref);
      alert("Deleted Successfully");
      // Fetch data again to remove the deleted item from the display
      fetch();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
 <div className='flex flex-col items-center p-4 bg-gray-100'>
        <h2 className='text-2xl font-bold mb-4'>Add / Update Form</h2>
        <div className='flex flex-col items-center w-full max-w-md p-4 bg-white shadow-md rounded'>
          <div className='w-full mb-4'>
            <input 
              className='w-full p-2 mb-2 border rounded' 
              type='text' 
              placeholder='Fullname' 
              autoComplete='off'  
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              className='w-full p-2 mb-2 border rounded' 
              type='text' 
              placeholder='Address' 
              autoComplete='off' 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
            <input 
              className='w-full p-2 mb-4 border rounded' 
              type='email' 
              placeholder='Email' 
              autoComplete='off' 
              value={email}  
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className='flex space-x-2'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={add}>Add</button>
            <button className='px-4 py-2 bg-green-500 text-white rounded' onClick={update}>Update</button>
          </div>
        </div>
      </div>
      <div className='p-4 bg-gray-100'>
        <h2 className='text-2xl font-bold mb-4'>CRUD Database</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {fetchData.map(data => (
            <div key={data.id} className='p-4 bg-white shadow-md rounded'>
              <h3 className='text-xl font-bold'>Name: {data.Name}</h3>
              <p>Address: {data.Address}</p>
              <p>Email: {data.Email}</p>
              <div className='flex space-x-2 mt-2'>
                <button className='px-4 py-2 bg-yellow-500 text-white rounded' onClick={() => passData(data.id)}>Update</button>
                <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => del(data.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Crud;
