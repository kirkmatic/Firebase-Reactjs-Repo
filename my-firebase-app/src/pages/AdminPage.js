import React, { useState, useEffect } from 'react';
import { storage, db, auth } from '../authentications/Firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import AddUserPopUp from '../components/AddUserPopUp';
import NavBarLogout from '../components/NavBarLogout';

const AdminPage = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [fetchData, setFetchData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const dbref = collection(db, "users");
    const ordersRef = collection(db, "images");

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
                fetchUsers();
                setIsPopupOpen(false);
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const snapshot = await getDocs(dbref);
            const fetchData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFetchData(fetchData);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const fetchOrders = async () => {
        try {
            const snapshot = await getDocs(ordersRef);
            const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp.toDate().toLocaleString() }));
            const usersSnapshot = await getDocs(dbref);
            const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const combinedData = orders.map(order => {
                const user = users.find(user => user.id === order.uid);
                return {
                    ...order,
                    userName: user ? user.Name : 'Unknown',
                    userAddress: user ? user.Address : 'Unknown'
                };
            });
            setOrderData(combinedData);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchOrders();
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
            fetchUsers();
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
            fetchUsers();
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const updateOrder = async (order) => {
        // Implement the logic for updating an order
        alert(`Update order with ID: ${order.id}`);
        // Example:
        // const orderRef = doc(db, "images", order.id);
        // await updateDoc(orderRef, { orderType: "newOrderType" });
        fetchOrders();
    };

    const deleteOrder = async (order) => {
        try {
            const orderRef = doc(db, "images", order.id);
            await deleteDoc(orderRef);
            const imageRef = storage.refFromURL(order.imageUrl);
            await imageRef.delete();
            alert("Order deleted successfully");
            fetchOrders();
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <>
            <NavBarLogout />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h2 className='text-3xl font-bold mb-6 text-center'>Admin Page</h2>
                <div className='flex justify-end mb-4'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setIsPopupOpen(true)}>Add User</button>
                </div>

                <div className='overflow-x-auto mb-8'>
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

                <div className='overflow-x-auto'>
                    <h3 className='text-2xl font-bold mb-4'>Orders</h3>
                    <table className='min-w-full bg-white shadow-md rounded'>
                        <thead>
                            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                                <th className='py-3 px-6 text-left'>Order ID</th>
                                <th className='py-3 px-6 text-left'>User ID</th>
                                <th className='py-3 px-6 text-left'>User Name</th>
                                <th className='py-3 px-6 text-left'>User Address</th>
                                <th className='py-3 px-6 text-left'>Order Type</th>
                                <th className='py-3 px-6 text-left'>Timestamp</th>
                                <th className='py-3 px-6 text-left'>Image URL</th>
                                <th className='py-3 px-6 text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 text-sm font-light'>
                            {orderData.map(order => (
                                <tr key={order.id} className='border-b border-gray-200 hover:bg-gray-100'>
                                    <td className='py-3 px-6 text-left whitespace-nowrap'>{order.id}</td>
                                    <td className='py-3 px-6 text-left'>{order.uid}</td>
                                    <td className='py-3 px-6 text-left'>{order.userName}</td>
                                    <td className='py-3 px-6 text-left'>{order.userAddress}</td>
                                    <td className='py-3 px-6 text-left'>{order.orderType}</td>
                                    <td className='py-3 px-6 text-left'>{order.timestamp}</td>
                                    <td className='py-3 px-6 text-left'>
                                        <a href={order.imageUrl} target="_blank" rel="noopener noreferrer" className='text-blue-500'>
                                            View Image
                                        </a>
                                    </td>
                                    <td className='py-3 px-6 text-left flex space-x-2'>
                                        <button className='px-4 py-2 bg-yellow-500 text-white rounded' onClick={() => updateOrder(order)}>Update</button>
                                        <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => deleteOrder(order)}>Delete</button>
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
        </>
    );
};

export default AdminPage;
