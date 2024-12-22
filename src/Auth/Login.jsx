import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const { signInWithGoogle, setUser, signInWithEmailAndPassWord } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                navigate('/')
            }
            ).catch(error => error)
    }

    const handleSignInUser = (e) => {
        e.preventDefault();
        console.log('OK');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassWord(email, password)
            .then(result => {
                setUser(result.user);
                form.email.value = '';
                form.password.value = '';
                navigate('/');
                alert('LogIn Successful');
            }
        ).catch(error => error) 
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSignInUser} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email"
                                 placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                                <p className="mt-2 text-slate-400 text-center">{`Don't have an account`} <Link className="btn-link" to='/register'>Register</Link></p>
                            </div>
                        </form>
                        <div className="mb-3 flex justify-center items-center"> 
                            <button className="flex justify-center items-center gap-1 btn-link text-center text-sm" onClick={handleGoogleSignIn}><div className="w-7">
                                <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="" />
                            </div>SignInWithGoogle</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Login;