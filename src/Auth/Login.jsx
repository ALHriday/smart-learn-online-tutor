import { useRef } from "react";
import { motion } from "motion/react";
import useAppStore from "../store/useAppStore";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
    const { signInWithGoogle, setUser, signInWithEmailAndPassWord, errorMessage, setErrorMessage, showPass, togglePassword, user } = useAppStore();
    const navigate = useNavigate();
    const showPassRef = useRef();

    if (user) {
        return <Navigate to={`/dashboard`}></Navigate>
    }

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

    const handleSignInUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassWord(email, password)
            .then(result => {
                if (result.user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "LogIn Successful",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setUser(result.user);
                    form.email.value = '';
                    form.password.value = '';
                    navigate('/');
                    setErrorMessage('');
                }

            }
            ).catch(() => setErrorMessage('Invalid Email or Password'))
    }

    return (
        <AuthLayout title="Welcome back" subtitle="Log in to continue your learning journey with expert tutors and a personalized dashboard." image="✦">
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-[1.5rem] border border-base-300/70 bg-base-100/90 p-6 shadow-xl"
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Sign in</h2>
                    <p className="mt-1 text-sm text-base-content/70">Access your account and pick up where you left off.</p>
                </div>

                <form onSubmit={handleSignInUser} className="space-y-4">
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
                        <input ref={showPassRef} type="password" name="password" placeholder="Enter your password" className="input input-bordered w-full pr-12" required />
                        <button type="button" onClick={() => togglePassword(showPassRef)} className="absolute right-3 top-[52px] text-base-content/70">
                            {showPass ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="label cursor-pointer gap-2 p-0">
                            <input type="checkbox" className="checkbox checkbox-sm" />
                            <span className="label-text">Remember me</span>
                        </label>
                        <a href="#" className="link link-hover text-primary">Forgot password?</a>
                    </div>

                    <button className="btn btn-primary w-full">Login</button>
                    <p className="text-center text-sm text-red-500">{errorMessage}</p>
                </form>

                <div className="divider my-5">or continue with</div>

                <button onClick={handleGoogleSignIn} className="btn btn-outline w-full gap-2">
                    <FcGoogle className="text-xl" />
                    Sign in with Google
                </button>

                <p className="mt-5 text-center text-sm text-base-content/70">
                    Don’t have an account? <Link className="font-semibold text-primary hover:underline" to="/register">Create one</Link>
                </p>
            </motion.div>
        </AuthLayout>
    );
};

export default Login;