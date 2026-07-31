import { create } from 'zustand';
import { auth } from '../Auth/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const applyTheme = (theme) => {
    if (typeof window === 'undefined') return;
    const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem('theme', normalizedTheme);
    document.documentElement.setAttribute('data-theme', normalizedTheme);
    document.documentElement.style.colorScheme = normalizedTheme;
};

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const useAppStore = create((set, get) => ({
    user: null,
    loading: true,
    errorMessage: '',
    passValidation: '',
    showPass: false,
    tutorData: [],
    showData: [],
    myBookedTutor: [],
    tutorials: [],
    likesCount: [],
    search: '',
    appliedUser: [],
    privateUser: [],
    stats: [],
    page: 1,
    limit: 12,
    toggle: getInitialTheme(),

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setErrorMessage: (errorMessage) => set({ errorMessage }),
    setPassValidation: (passValidation) => set({ passValidation }),
    setShowPass: (showPass) => set({ showPass }),
    setTutorData: (tutorData) => set({ tutorData }),
    setShowData: (showData) => set({ showData }),
    setMyBookedTutor: (myBookedTutor) => set({ myBookedTutor }),
    setTutorials: (tutorials) => set({ tutorials }),
    setLikesCount: (likesCount) => set({ likesCount }),
    setSearch: (search) => set({ search }),
    setAppliedUser: (appliedUser) => set({ appliedUser }),
    setPrivateUser: (privateUser) => set({ privateUser }),
    setStats: (stats) => set({ stats }),
    setPage: (page) => set({ page }),
    setLimit: (limit) => set({ limit }),

    handleToggle: () => {
        const nextTheme = get().toggle === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        set({ toggle: nextTheme });
    },

    togglePassword: (status) => {
        if (status.current.type === 'password') {
            status.current.type = 'text';
            set({ showPass: true });
        } else {
            status.current.type = 'password';
            set({ showPass: false });
        }
    },

    notify: (status) => toast(status),

    signInWithGoogle: async () => {
        set({ loading: true });
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    },

    signOutUser: async () => {
        set({ loading: true });
        return signOut(auth);
    },

    createAccountWithEmailAndPass: async (email, password) => {
        set({ loading: true });
        return createUserWithEmailAndPassword(auth, email, password);
    },

    signInWithEmailAndPassWord: async (email, password) => {
        set({ loading: true });
        return signInWithEmailAndPassword(auth, email, password);
    },

    initializeAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            set({ user: currentUser, loading: false });
        });

        return unsubscribe;
    }
}));

export default useAppStore;
