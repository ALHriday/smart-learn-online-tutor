import { useContext, useRef } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "./firebase.init";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {

    const { createAccountWithEmailAndPass, setUser, passValidation, setPassValidation, showPass, togglePassword, signInWithGoogle } = useContext(AuthContext);
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
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Register now to join and unlock exclusive benefits!
                    </p>
                   
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleUserWithEmailAndPassword} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">PhotoURL</span>
                            </label>
                            <input type="text" name="photo" placeholder="photoURL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input ref={showPassRef} type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <p onClick={() => togglePassword(showPassRef)} className="absolute bottom-[20%] right-[5%]">
                                {showPass ? <FaEye /> : <FaEyeSlash />}

                            </p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                            <p className="mt-2 text-red-500 text-center">{passValidation}</p>
                            <p className="mt-2 text-slate-400 text-center">Already have an account <Link className="btn-link" to='/login'>LogIn</Link></p>
                        </div>
                    </form>
                    <div onClick={handleGoogleSignIn} className="mb-4 flex justify-center items-center btn btn-primary mx-8">
                        <button className="flex justify-center items-center gap-1 text-center text-sm"><div className="w-7">
                            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="" />
                        </div>SignInWithGoogle</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;