import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Login = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    
    const handleGoogleSignIn = () => {
        signInWithGoogle()
        .then(result => console.log(result.user)
        ).catch(error => console.log(error)
        )
    }

    return (
        <div>
            <button className="btn" onClick={handleGoogleSignIn}>Google SignIn</button>
        </div>
    );
};

export default Login;