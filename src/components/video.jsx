import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FaceOrientationChecker() {
    const [status, setStatus] = useState('Unknown');
    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      };
      
    useEffect(() => {
      const interval = setInterval(() => {
        axios.get('http://localhost:5000/face-orientation')
          .then(response => {
            setStatus(response.data.status);
          })
          .catch(error => {
            console.error('Error fetching face orientation:', error);
          });
      }, 1000); // Poll every second
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  
    return (
      <div>
        <h1>Face Orientation Status</h1>
        <p>{status}</p>
        {status === 'Face Turned Away' && <p style={{ color: 'red' }}>Please face the screen!</p>}
      </div>
    );
  }
  
  export default FaceOrientationChecker;