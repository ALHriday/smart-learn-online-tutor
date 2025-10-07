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
    const [tutorData, setTutorData] = useState([]);
    const [showData, setShowData] = useState([]);
    const [myBookedTutor, setMyBookedTutor] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    const [likesCount, setLikesCount] = useState([]);
    const [search, setSearch] = useState('');
    const [appliedUser, setAppliedUser] = useState([]);
    const [privateUser, setPrivateUser] = useState([]);
    const [skip, setSkip] = useState(0);
    const [stats, setStats] = useState([]);
    const [slide, setSlide] = useState(0);



    const savedTheme = localStorage.getItem('theme') || 'light';
    const [toggle, setToggle] = useState(savedTheme);

    const handleToggle = () => {
        const newTheme = toggle === 'dark' ? 'light' : 'dark';
        setToggle(newTheme);
        localStorage.setItem('theme', toggle);
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', toggle);
        const theme = localStorage.getItem('theme');
        setToggle(theme);
    }, [toggle]);

    useEffect(() => {
        const privateUserInfo = appliedUser.find(aUser => aUser?.userEmail.toLowerCase() === user?.email.toLowerCase());
        setPrivateUser(privateUserInfo);
    }, [appliedUser, user?.email])

    useEffect(() => {
        axios.get('https://online-tutor-server-web.vercel.app/stats').then(res => setStats(res.data)).catch(error => error)
    }, [])

    useEffect(() => {
        axios.get(`https://online-tutor-server-web.vercel.app/tutors?limit=10&skip=10`).then(res => {
            const d = res.data.slice(4, 7);
            setShowData(d);
        }).catch(error => error);
    }, [])

    useEffect(() => {
        axios.get(`https://online-tutor-server-web.vercel.app/tutors?search=${search}&limit=10&skip=${skip}`).then(res => setTutorData(res.data)).catch(error => error);
    }, [search, skip])

    useEffect(() => {
        axios.get('https://online-tutor-server-web.vercel.app/tutorApplication')
            .then(res => setAppliedUser(res.data));
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

    useEffect(() => {
        axios.get(`https://online-tutor-server-web.vercel.app/addedTutor/${user?.email}`)
            .then(res => setMyBookedTutor(res.data)).catch(error => error)
    }, [user?.email, setMyBookedTutor]);


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
        tutorData,
        setTutorData,
        showData,
        myBookedTutor,
        setMyBookedTutor,
        tutorials,
        setTutorials,
        likesCount,
        setLikesCount,
        search,
        setSearch,
        notify,
        toggle,
        handleToggle,
        appliedUser,
        privateUser,
        skip,
        setSkip,
        stats,
        slide,
        setSlide
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