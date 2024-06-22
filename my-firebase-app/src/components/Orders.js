import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage, db, auth } from '../authentications/Firebase';
import firebase from 'firebase/compat/app';

const Orders = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imageURLs, setImageURLs] = useState([]);
    const [user, setUser] = useState(null);
  

    // Fetching images from the database
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
          ...doc.data()
        }));
        setImageURLs(images);
      };
      
    const uploadFile = async () => {
      if (!imageUpload || !user) return;
  
      const sessionId = uuidv4();
      const imageRef = storage.ref(`images/${sessionId}/${imageUpload.name}`);
  
      try {
        const snapshot = await imageRef.put(imageUpload);
        const url = await snapshot.ref.getDownloadURL();
  
        const docRef = await db.collection('images').add({
          uid: user.uid, // Associate image with user UID
          sessionId: sessionId,
          imageUrl: url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
  
        alert('File uploaded successfully:', url);
        setProgress(0);
        setImageUpload(null);
        setImageURLs(prevURLs => [{ id: docRef.id, imageUrl: url }, ...prevURLs]); // Add new URL to the list
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  
    const deleteImage = async (image) => {
      try {
        // Delete from storage
        const imageRef = storage.refFromURL(image.imageUrl);
        await imageRef.delete();
  
        // Delete from Firestore
        await db.collection('images').doc(image.id).delete();
  
        // Update state
        setImageURLs(prevURLs => prevURLs.filter(img => img.id !== image.id));
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    };
    
  return (
    <>
        <div>
            <h3>Uploaded Images:</h3>
            <form>
                <input 
                
                
                />
            </form>



            {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {imageURLs.map((image) => (
                <div key={image.id} style={{ position: 'relative' }}>
                <img
                    src={image.imageUrl}
                    alt="Uploaded"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <button
                    onClick={() => deleteImage(image)}
                    style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '25px',
                    height: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    X
                </button>
                </div>
            ))}
            </div> */}
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

                </table>
            </div>
      </div>
    </>
  )
}

export default Orders
