import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCmXMnq8PCC_cPz8AEhlgnvR0Uoj3nYXWY",
  authDomain: "speed-reading-trainer.firebaseapp.com",
  projectId: "speed-reading-trainer",
  storageBucket: "speed-reading-trainer.firebasestorage.app",
  messagingSenderId: "571337463551",
  appId: "1:571337463551:web:9f012007af1dd0436d5eca",
  measurementId: "G-4FZKPFR33L",
  databaseURL: "https://speed-reading-trainer-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
