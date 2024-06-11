import React from 'react'
import { db } from './firebase'


const Crud = () => {
  return (
    <>
      <div className='form_container'>
        <h2> Add / Update Form</h2>
          <div className='box'>
              <input type='text' placeholder='Fullname' autoComplete='off'></input>
          </div>
      </div>
    </>
  )
}

export default Crud
