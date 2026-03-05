import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAsPJyeC9tGh49j6AZP-X5wCsHfGjHjl-M",
  authDomain: "scholarassist-dd7e1.firebaseapp.com",
  projectId: "scholarassist-dd7e1",
  storageBucket: "scholarassist-dd7e1.firebasestorage.app",
  messagingSenderId: "980370039831",
  appId: "1:980370039831:web:6a21d5188be3499edca852"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAsPJyeC9tGh49j6AZP-X5wCsHfGjHjl-M",
//   authDomain: "scholarassist-dd7e1.firebaseapp.com",
//   projectId: "scholarassist-dd7e1",
//   storageBucket: "scholarassist-dd7e1.firebasestorage.app",
//   messagingSenderId: "980370039831",
//   appId: "1:980370039831:web:6a21d5188be3499edca852"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);