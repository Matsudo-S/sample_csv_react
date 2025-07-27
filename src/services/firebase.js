import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// インスタンス化（クラスを実体化させて使えるようにする）
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };