// Simple script to check if environment variables are loaded
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(process.cwd(), '.env') });

console.log('Checking Firebase environment variables...\n');

const requiredVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID',
];

let allPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value && value !== 'your_api_key_here' && !value.includes('your_')) {
    console.log(`✓ ${varName}: Loaded (${value.substring(0, 10)}...)`);
  } else if (value && (value === 'your_api_key_here' || value.includes('your_'))) {
    console.log(`✗ ${varName}: Using placeholder value - needs to be updated`);
    allPresent = false;
  } else {
    console.log(`✗ ${varName}: Not found`);
    allPresent = false;
  }
});

console.log(
  '\n' +
    (allPresent
      ? '✅ All environment variables are properly configured!'
      : '❌ Some environment variables need to be updated in .env file')
);
