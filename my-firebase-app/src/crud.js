import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const Crud = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  // Correct way to get a reference to the Firestore collection
  const dbRef = collection(db, 'my-firebase-app');

  // Function to add data to the Firestore collection
  const add = async () => {
    try {
      const docRef = await addDoc(dbRef, {
        Name: name,
        Address: address,
        Email: email,
      });
      alert('Data Added Successfully');
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error adding document: ' + error.message);
    }
  };

  return (
    <>
      <div className="form_container">
        <h2>Add / Update Form</h2>
        <div className="box">
          <input
            type="text"
            placeholder="Fullname"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={add}>Add</button>
          <button>Update</button>
        </div>
      </div>
      <div>
        <h2>CRUD Database</h2>
        <div className="container">
          <div className="box">
            {/* Add your display logic here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Crud;
