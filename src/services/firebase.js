import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdkxxwzuZ_ysxbCS9Aor8s2tZC6D129EE",
  authDomain: "blog-20540.firebaseapp.com",
  projectId: "blog-20540",
  storageBucket: "blog-20540.firebasestorage.app",
  messagingSenderId: "362469567037",
  appId: "1:362469567037:web:4ac277f540cd4f25991854"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// インスタンス化（クラスを実体化させて使えるようにする）
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };