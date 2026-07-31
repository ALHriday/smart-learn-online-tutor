import { useRef } from "react";
import { motion } from "motion/react";
import useAppStore from "../store/useAppStore";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "./firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import AuthLayout from "../components/AuthLayout";

const Register = () => {

    const { createAccountWithEmailAndPass, setUser, passValidation, setPassValidation, showPass, togglePassword, signInWithGoogle } = useAppStore();
    const navigate = useNavigate();
    const showPassRef = useRef();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "LogIn Successful",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setUser(result.user)
                    navigate('/')
                }
            }
            ).catch(error => error)
    }


    const handleUserWithEmailAndPassword = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;

        if (regex.test(password)) {
            setPassValidation(" ");

            createAccountWithEmailAndPass(email, password)
                .then(result => {
                    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

                    if (result.user) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Account Created Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setUser(null);
                        form.email.value = '';
                        form.password.value = '';
                        navigate('/login');
                    };
                }
                ).catch(error => error
                )

        } else {
            setPassValidation("Password Must Contain  1 UpperCase, 1 LowerCase, 1 Special Character and at least 8 digits.");
        }


    }

    return (
        <AuthLayout title="Create your account" subtitle="Join thousands of learners who are improving every day with Smart Learn." image="✦">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-[1.5rem] border border-base-300/70 bg-base-100/90 p-6 shadow-xl"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Register</h2>
                    <p className="mt-1 text-sm text-base-content/70">Create a profile and start your language-learning journey.</p>
                </div>

                <form onSubmit={handleUserWithEmailAndPassword} className="space-y-4">
                    <div className="form-control">
                        <label className="label px-0 pb-2">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Your full name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label px-0 pb-2">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name="photo" placeholder="Paste your photo URL" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label px-0 pb-2">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label px-0 pb-2">
                            <span className="label-text">Password</span>
                        </label>
                        <input ref={showPassRef} type="password" name="password" placeholder="Create a password" className="input input-bordered w-full pr-12" required />
                        <button type="button" onClick={() => togglePassword(showPassRef)} className="absolute right-3 top-[52px] text-base-content/70">
                            {showPass ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <button className="btn btn-primary w-full">Register</button>
                    <p className="text-center text-sm text-red-500">{passValidation}</p>
                </form>

                <div className="divider my-5">or continue with</div>

                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full gap-2">
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                <p className="mt-5 text-center text-sm text-base-content/70">
                    Already have an account? <Link className="font-semibold text-primary hover:underline" to="/login">Log in</Link>
                </p>
            </motion.div>
        </AuthLayout>
    );
};

export default Register;