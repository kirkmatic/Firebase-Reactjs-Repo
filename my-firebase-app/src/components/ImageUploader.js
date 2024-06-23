import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage, db, auth } from '../authentications/Firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const ImageUploader = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const [user, setUser] = useState(null);
  const [orderType, setOrderType] = useState('traditional');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchImages(user.uid);
      } else {
        setUser(null);
        setImageURLs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchImages = async (uid) => {
    const imagesCollection = await db.collection('images')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .get();
    const images = imagesCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate().toLocaleString() // Convert Firestore timestamp to a readable string
    }));
    setImageURLs(images);
  };

  const uploadFile = async (event) => {
    event.preventDefault();
    if (!imageUpload || !user) return;

    const sessionId = uuidv4();
    const imageRef = storage.ref(`images/${sessionId}/${imageUpload.name}`);

    try {
      const snapshot = await imageRef.put(imageUpload);
      const url = await snapshot.ref.getDownloadURL();

      const docRef = await db.collection('images').add({
        uid: user.uid,
        sessionId: sessionId,
        imageUrl: url,
        orderType: orderType,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert('File uploaded successfully:', url);
      setImageUpload(null);
      setImageURLs(prevURLs => [{ id: docRef.id, imageUrl: url, orderType, timestamp: new Date().toLocaleString() }, ...prevURLs]);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const deleteImage = async (image) => {
    try {
      const imageRef = storage.refFromURL(image.imageUrl);
      await imageRef.delete();
      await db.collection('images').doc(image.id).delete();
      setImageURLs(prevURLs => prevURLs.filter(img => img.id !== image.id));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className='bg-cover bg-center w-full min-h-screen px-8 py-8 flex flex-col items-center'>
      <div className="max-w-full m-auto p-7 flex flex-wrap justify-center">
        <div className='m-2 p-2 max-w-full cursor-pointer box-border align-middle bg-white shadow-lg rounded-lg'>
          <form onSubmit={uploadFile} className="space-y-4">
            <div>
              <h1 className='text-center font-bold text-3xl'>Orders</h1>
            </div>
            <input
              type="file"
              onChange={(event) => setImageUpload(event.target.files[0])}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            >
              <option value="traditional">Traditional</option>
              <option value="digital">Digital</option>
            </select>
            <button type="submit" className="block w-full py-2 bg-blue-500 text-white rounded-lg">
              Place Order
            </button>
          </form>
        </div>

        <div className="m-2 p-2 max-w-full cursor-pointer box-border align-middle bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Uploaded Images:</h3>
          <div className="flex flex-wrap gap-4 mt-4">
            {imageURLs.map((image) => (
              <div key={image.id} className="relative w-60 h-40">
                <img
                  src={image.imageUrl}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 p-1 rounded text-xs">
                  <p>Type: {image.orderType}</p>
                  <p>Time: {image.timestamp}</p>
                </div>
                <button
                  onClick={() => deleteImage(image)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
