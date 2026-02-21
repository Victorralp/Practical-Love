import React, { useEffect, useState } from 'react';
import { app } from '../services/firebaseService';

const FirebaseExample: React.FC = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase is initialized
    if (app) {
      setFirebaseInitialized(true);
      console.log('Firebase app initialized:', app.name);
    }
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Firebase Integration Status</h2>

      <div className="space-y-2">
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${firebaseInitialized ? 'bg-amber-500' : 'bg-red-500'}`}
          ></div>
          <span>Firebase App: {firebaseInitialized ? 'Initialized' : 'Not Initialized'}</span>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Project ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Not loaded'}</p>
          <p>API Key loaded: {import.meta.env.VITE_FIREBASE_API_KEY ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;

