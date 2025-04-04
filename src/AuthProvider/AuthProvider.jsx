import { createContext, useEffect, useState } from "react";
import { auth } from "../Auth/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";


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
    const [heartCount, setHeartCount] = useState(10);
    const [search, setSearch] = useState('');

    const savedTheme = localStorage.getItem('theme') || 'light';
    const [toggle, setToggle] = useState(savedTheme);

    const handleToggle = () => {
        const newTheme = toggle === 'light' ? 'dark' : 'light';
        setToggle(newTheme);
        localStorage.setItem('theme', toggle);
    }
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', toggle);
        const theme = localStorage.getItem('theme');
        setToggle(theme);
    }, [toggle]);

    // https://online-tutor-server-web.vercel.app/tutors
    // http://localhost:2100/tutors

    useEffect(() => {
        axios.get(`https://online-tutor-server-web.vercel.app/tutors`)
            .then(data => {
                setTutorData(data.data);
                setTutorCount(data.data.length);
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

    const notify = (status) => toast(status);

    // useEffect(() => {
    //     axios.get(`https://online-tutor-server-web.vercel.app/tutors?language=${search}`).then(res => {
    //                 setTutorData(res.data)
    //             })
    // }, [search])


    useEffect(() => {
        const languageCount = [...new Set(tutorsData && tutorsData.map(lang => lang.language))];
        setLangCount(languageCount.length);
    }, [tutorsData])

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
        tutorCount,
        myBookedTutor,
        setMyBookedTutor,
        tutorials,
        setTutorials,
        langCount,
        heartCount,
        setHeartCount,
        search,
        setSearch,
        notify,
        toggle,
        handleToggle
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