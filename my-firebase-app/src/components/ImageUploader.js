import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for unique session IDs
import { storage, db } from '../authentications/Firebase';
import firebase from 'firebase/compat/app';

const ImageUploader = () => {
    const [imageUpload, setImageUpload] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState('');

  const uploadFile = async () => {
    if (!imageUpload) return;

    const sessionId = uuidv4(); // Generate a unique session ID
    const imageRef = storage.ref(`images/${sessionId}/${imageUpload.name}`);

    try {
      const snapshot = await imageRef.put(imageUpload);
      const url = await snapshot.ref.getDownloadURL();

      // Save the URL and session ID to Firestore
      await db.collection('images').add({
        sessionId: sessionId,
        imageUrl: url,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("Image Uploaded")
      console.log('File uploaded successfully:', url);
      setProgress(0);
      setImageUpload(null);
      setImageURL(url); // Set the image URL state
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        type='file'
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button className='w-[440px] h-[71px] bg-rose-500 rounded text-white text-xl font-extrabold ' onClick={uploadFile}>
        Upload file
      </button>
      {progress > 0 && <progress value={progress} max="100" />}
      {imageURL && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageURL} alt="Uploaded" style={{ width: '300px', marginTop: '20px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
