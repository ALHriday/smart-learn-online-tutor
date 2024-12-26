import { createContext, useEffect, useState } from "react";
import { auth } from "../Auth/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from "prop-types";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [passValidation, setPassValidation] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [tutorsData, setTutorData] = useState([]);
    const [tutorCount, setTutorCount] = useState(0);
    const [myBookedTutor, setMyBookedTutor] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    const [langCount, setLangCount] = useState(0);


    useEffect(() => {
        fetch(`https://online-tutor-server-web.vercel.app/tutors`)
            .then(res => res.json())
            .then(data => {
                setTutorData(data);
                setTutorCount(data.length);
            })
    }, []);
    useEffect(() => {
        fetch(`https://online-tutor-server-web.vercel.app/bookedTutor`)
            .then(res => res.json())
            .then(data => {
                setMyBookedTutor(data)
            })
    }, []);


    const signInWithGoogle = () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    const createAccountWithEmailAndPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInWithEmailAndPassWord = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const togglePassword = (status) => {
        if (status.current.type === 'password') {
            status.current.type = 'text';
            setShowPass(true);
        } else {
            status.current.type = 'password';
            setShowPass(false);
        }

    }
    const handleCategory = (language) => {
        if (language) {
            fetch(`https://online-tutor-server-web.vercel.app/tutors/category/${language}`)
                .then(res => res.json())
                .then(data => {
                    setTutorData(data)
                }
                )
        }
    }

    const languageCount = [...new Set(tutorsData.map(lang => lang.language))];

    useEffect(() => {
        setLangCount(languageCount.length)
    }, [languageCount.length])

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    }, [])

    const values = {
        user,
        setUser,
        loading,
        signInWithGoogle,
        signOutUser,
        createAccountWithEmailAndPass,
        signInWithEmailAndPassWord,
        errorMessage,
        setErrorMessage,
        passValidation,
        setPassValidation,
        showPass,
        setShowPass,
        togglePassword,
        tutorsData,
        setTutorData,
        handleCategory,
        tutorCount,
        myBookedTutor,
        setMyBookedTutor,
        tutorials,
        setTutorials,
        langCount,

    }


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
};

AuthProvider.propTypes = {
    children: PropTypes.object
}

export default AuthProvider;