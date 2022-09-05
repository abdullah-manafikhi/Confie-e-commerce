// Import the functions you need from the SDKs you need
import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBQRHs-bGftWXgPA3mQBUze_2U8Fwk5e0",
  authDomain: "confie-ecommerce.firebaseapp.com",
  projectId: "confie-ecommerce",
  storageBucket: "confie-ecommerce.appspot.com",
  messagingSenderId: "264868062274",
  appId: "1:264868062274:web:da53d90ea113701d2979db"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

