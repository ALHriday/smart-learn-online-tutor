import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAppStore from "../store/useAppStore";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const {
        user,
        loading,
        errorMessage,
        setErrorMessage,
        passValidation,
        setPassValidation,
        showPass,
        setShowPass,
        tutorData,
        setTutorData,
        showData,
        setShowData,
        myBookedTutor,
        setMyBookedTutor,
        tutorials,
        setTutorials,
        likesCount,
        setLikesCount,
        search,
        setSearch,
        appliedUser,
        privateUser,
        setPrivateUser,
        stats,
        setStats,
        page,
        setPage,
        limit,
        setLimit,
        toggle,
        handleToggle,
        notify,
        togglePassword,
        signInWithGoogle,
        signOutUser,
        createAccountWithEmailAndPass,
        signInWithEmailAndPassWord,
        setUser,
        setLoading,
    } = useAppStore();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentTheme = toggle === 'dark' ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            document.documentElement.setAttribute('data-theme', currentTheme);
            document.documentElement.style.colorScheme = currentTheme;
        }
    }, [toggle]);

    useEffect(() => {
        if (user?.email) {
            const privateUserInfo = appliedUser.find(aUser => aUser?.userEmail.toLowerCase() === user?.email.toLowerCase());
            setPrivateUser(privateUserInfo);
        }
    }, [appliedUser, user?.email, setPrivateUser]);

    useEffect(() => {
        axiosPublic.get('/stats')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [axiosPublic, setLoading, setStats]);

    useEffect(() => {
        axiosPublic.get(`/tutors?limit=15&page=1`)
            .then(res => {
                const d = res.data.slice(11, 14);
                setShowData(d);
            })
            .catch(error => error);
    }, [axiosPublic, setShowData]);

    useEffect(() => {
        axiosPublic.get(`/tutors?search=${search}&limit=${limit}&page=${page}`)
            .then(res => setTutorData(res.data))
            .catch(error => error);
    }, [axiosPublic, limit, page, search, setTutorData]);

    useEffect(() => {
        axiosPublic.get('/tutorApplication')
            .then(res => useAppStore.setState({ appliedUser: res.data }))
            .catch(error => error);
    }, [axiosPublic]);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/addedTutor/${user?.email}`)
                .then(res => setMyBookedTutor(res.data))
                .catch(error => error);
        }
    }, [user?.email, setMyBookedTutor, axiosPublic]);

    useEffect(() => {
        const unSubscribe = useAppStore.getState().initializeAuth();
        return () => unSubscribe();
    }, []);

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
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object
};

export default AuthProvider;