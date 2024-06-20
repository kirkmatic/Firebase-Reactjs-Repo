import React, { useState, useEffect } from 'react';
import { db } from '../authentications/Firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import AddUserPopUp from '../components/AddUserPopUp';

const AdminPage = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [fetchData, setFetchData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const dbref = collection(db, "users");

    const add = async () => {
        try {
            const addData = await addDoc(dbref, { Name: name, Address: address, Email: email, Password: password, Role: role });
            if (addData) {
                alert("Data Added Successfully");
                setName('');
                setAddress('');
                setPassword('');
                setEmail('');
                setRole('user');
                fetch();
                setIsPopupOpen(false);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

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

    const passData = async (id) => {
        const matchId = fetchData.find((data) => data.id === id);
        setName(matchId.Name);
        setPassword(matchId.Password);
        setAddress(matchId.Address);
        setEmail(matchId.Email);
        setId(matchId.id);
        setIsPopupOpen(true);
    };

    const update = async () => {
        try {
            const updateref = doc(db, "users", id);
            await updateDoc(updateref, { Name: name, Address: address, Email: email, Password: password, Role: role });
            alert("Updated Successfully");
            setName('');
            setAddress('');
            setEmail('');
            setRole('user');
            setPassword('');
            fetch();
            setIsPopupOpen(false);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const del = async (id) => {
        try {
            const delref = doc(db, "users", id);
            await deleteDoc(delref);
            alert("Deleted Successfully");
            fetch();
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className='text-3xl font-bold mb-6 text-center'>Admin Page</h2>
            <div className='flex justify-end mb-4'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setIsPopupOpen(true)}>Add User</button>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white shadow-md rounded'>
                    <thead>
                        <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                            <th className='py-3 px-6 text-left'>Id</th>
                            <th className='py-3 px-6 text-left'>Name</th>
                            <th className='py-3 px-6 text-left'>Address</th>
                            <th className='py-3 px-6 text-left'>Email</th>
                            <th className='py-3 px-6 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-600 text-sm font-light'>
                        {fetchData.map(data => (
                            <tr key={data.id} className='border-b border-gray-200 hover:bg-gray-100'>
                                <td className='py-3 px-6 text-left whitespace-nowrap'>{data.id}</td>
                                <td className='py-3 px-6 text-left'>{data.Name}</td>
                                <td className='py-3 px-6 text-left'>{data.Address}</td>
                                <td className='py-3 px-6 text-left'>{data.Email}</td>
                                <td className='py-3 px-6 text-left flex space-x-2'>
                                    <button className='px-4 py-2 bg-yellow-500 text-white rounded' onClick={() => passData(data.id)}>Update</button>
                                    <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => del(data.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddUserPopUp
                trigger={isPopupOpen}
                setTrigger={setIsPopupOpen}
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                role={role}
                setRole={setRole}
                add={add}
                update={update}
            />
        </div>
    );
};

export default AdminPage;
