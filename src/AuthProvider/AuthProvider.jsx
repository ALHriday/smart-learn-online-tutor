import { createContext, useEffect, useState } from "react";
import { auth } from "../Auth/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";

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
    const [stats, setStats] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);


    const axiosPublic = useAxiosPublic();

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
        if (user?.email) {
            const privateUserInfo = appliedUser.find(aUser => aUser?.userEmail.toLowerCase() === user?.email.toLowerCase());
            setPrivateUser(privateUserInfo);
        }
    }, [appliedUser, user?.email])

    useEffect(() => {
        axiosPublic.get('/stats').then(res => {
            setStats(res.data);
            setLoading(false);
        }).catch(error => error)
    }, [axiosPublic])

    useEffect(() => {
        axiosPublic.get(`/tutors?limit=15&page=1`).then(res => {
            const d = res.data.slice(11, 14);
            setShowData(d);
        }).catch(error => error);
    }, [axiosPublic])

    useEffect(() => {
        axiosPublic.get(`/tutors?search=${search}&limit=${limit}&page=${page}`).then(res => setTutorData(res.data)).catch(error => error);
    }, [axiosPublic, limit, page, search])

    useEffect(() => {
        axiosPublic.get('/tutorApplication')
            .then(res => setAppliedUser(res.data));
    }, [axiosPublic]);


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
        if (user?.email)
            axiosPublic.get(`/addedTutor/${user?.email}`).then(res => setMyBookedTutor(res.data)).catch(error => error)
    }, [user?.email, setMyBookedTutor, axiosPublic]);


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
        page,
        setPage,
        stats,
        limit,
        setLimit
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