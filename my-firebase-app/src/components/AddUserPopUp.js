import React from 'react';

const AddUserPopUp = (props) => {
    return (
        (props.trigger) ? (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white p-8 rounded shadow-lg w-full max-w-md'>
                    <button className='mb-4 self-end text-red-500' onClick={() => props.setTrigger(false)}>Close</button>
                    <h2 className='text-2xl font-bold mb-4'>Add / Update Form</h2>
                    <div className='flex flex-col space-y-4'>
                        <input
                            className='w-full p-2 border rounded'
                            type='text'
                            placeholder='Fullname'
                            autoComplete='off'
                            value={props.name}
                            onChange={(e) => props.setName(e.target.value)}
                        />
                        <input
                            className='w-full p-2 border rounded'
                            type='text'
                            placeholder='Address'
                            autoComplete='off'
                            value={props.address}
                            onChange={(e) => props.setAddress(e.target.value)}
                        />
                        <input
                            className='w-full p-2 border rounded'
                            type='email'
                            placeholder='Email'
                            autoComplete='off'
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                        />
                        <input
                            className='w-full p-2 border rounded'
                            type='password'
                            placeholder='Password'
                            autoComplete='off'
                            value={props.password}
                            onChange={(e) => props.setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex space-x-2 mt-4'>
                        <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={props.add}>Add</button>
                        <button className='px-4 py-2 bg-green-500 text-white rounded' onClick={props.update}>Update</button>
                    </div>
                </div>
            </div>
        ) : ""
    );
};

export default AddUserPopUp;
