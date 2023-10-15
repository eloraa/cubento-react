import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../utils/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName, photoURL
        })
    }

    const verifyEmail = () => sendEmailVerification(auth.currentUser)
    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe()
    }, [])



    return (
        <AuthContext.Provider value={{ user, createUser, signIn, updateUser, verifyEmail, resetPassword, googleSignin, signOutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;