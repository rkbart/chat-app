import "./Login.css";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


function Login({onLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); 
    const { handleHeaders } = useData();
    
    const navigate = useNavigate();
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const handleLogin = async (email, password) => {
        
        try {
            const loginCredentials = {
              email,
              password
            }
      
            const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
            const { data, headers } = response;
        
            if(data && headers) {
                handleHeaders(headers);
                onLogin();
                navigate('/main');
            }

          } catch(error) {
            if(error.response.data.errors) {
            //   return alert("Invalid credentials");
            return toast.error("Invalid credentials");
            }
           }
        };

      const handleSignUp = async (event) => {
        event.preventDefault();

        if (!emailRegEx.test(email)) {
            toast.error("Please enter a valid email address (e.g., name@example.com)", {position: "top-center"});
            // alert("Please enter a valid email address (e.g., name@example.com)");
            return;
          }
        
          if (password !== confirmPassword) {
            // alert("Passwords do not match. Please try again.");
            toast.error("Passwords do not match. Please try again.");
            return;
        } 
        
        try {
            const signUpCredentials = {
              email,
              password,
              confirmPassword
            }
      
            const response = await axios.post(`${API_URL}/auth/`, signUpCredentials);
            const { data, headers } = response;
        
            if(data && headers) {
                handleHeaders(headers);
                onLogin();
                navigate('/main');
            }

          } catch(error) {
            if(error.response.data.errors) {
                return toast.error(error);
            }
           }
        toast.success("Sign-up successful! You can now log in.");
        setEmail('');
        setPassword('');
        setConfirmPassword(''); 
        setIsSignUp(false); 
      }

      function forgotPassword() {
        toast.info("Feature coming soon.");
      }

      const handleGoogleLogin = () => {
        const gmail = "ryan.kristopher.bartolome@gmail.com";
        const gmailPassword = "password";
        toast.success("Logging in using Google account.");
        handleLogin(gmail,gmailPassword);
    };
    
   
    return (
        <div className={`login_form ${isSignUp ? 'sign-up' : 'login'}`}>
            <ToastContainer position="top-center" toastStyle={{color: "black"}}/>
            <form 
                action="#"
                onSubmit={(event) => event.preventDefault()}>
                                
                <div id="title">
                    <h3 className={isSignUp ? 'sign-up-title' : 'login-title'}>{isSignUp ? "Sign Up" : "Log in with"}</h3>
                </div>

                {!isSignUp && (
                    <div className="login_option">
        
                        <div className="option" onClick={handleGoogleLogin}>
                            <a href="#">
                                <img src={google} alt="Google"/>
                                <span>Google</span>
                            </a>
                        </div>

                        <div className="option" 
                             onClick={() => toast.info("Feature not yet available")}>
                            <a href="#">
                                <img src={apple} alt="Apple" />
                                <span>Apple</span>
                            </a>
                        </div>
                    </div>
                )}

                {!isSignUp && 
                    <p className="separator">
                        <span>or</span>
                    </p>
                }

                <div className="input_box">
                    <label for="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        autoComplete="off"
                        required
                        />
                </div>

                <div className="input_box">
                    <div className="password_title">
                        <label forHTML="password">Password</label>
                        {!isSignUp && <a href="#" 
                                         onClick={forgotPassword}
                                         >Forgot Password?</a>}
                    </div>

                    <input 
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                </div>

                {isSignUp && (
                    <div className="input_box">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input 
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>
                )}
            
            {isSignUp ? (
                    <button 
                        type="submit" 
                        className="sign-up-btn"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                ) : (
                    <button 
                        type="submit" 
                        className="login-btn"
                        onClick={() => handleLogin(email, password)}
                    >
                        Log In
                    </button>
                )}

            {isSignUp ? (
                <p className="sign_up"> Already have an account? 
                    <a href="#" 
                       onClick={() => setIsSignUp(false)}>
                    Log In
                    </a>
                </p>
            ) : (
                <p className="sign_up">
                    Don't have an account? 
                    <a href="#" 
                        onClick={() => setIsSignUp(true)}>
                    Sign up
                    </a>
                </p>
            )}
        </form>
    </div>
)};

export default Login;