import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// cSpell:disable
const firebaseConfig = {
  apiKey: "AIzaSyBnBbtf7yREw_Tv5XLIJzhkesaqb2aCTLM",
  authDomain: "gf-episode-search.firebaseapp.com",
  projectId: "gf-episode-search",
  storageBucket: "gf-episode-search.firebasestorage.app",
  messagingSenderId: "530428712152",
  appId: "1:530428712152:web:edeec62eb264b3d983b3ad",
};
// cSpell:enable

/**
 * firebaseの初期化と匿名認証
 */
function initFirebase() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      // console.log("認証成功");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });

  return db;
}

/**
 * firestoreインスタンス
 */
export const database = initFirebase();
