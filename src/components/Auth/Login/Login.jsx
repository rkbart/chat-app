import "./Login.css";
import google from "../../../assets/google.png";
import apple from "../../../assets/apple.png";
import { useState } from "react";

function Login() {
    
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); 
    // const [users, setUsers] = useState([
    //     {
    //         email: "admin@kamote.ph",
    //         password: "kamote"
    //     }
    // ]);
    const [isKamoteLogin, setIsKamoteLogin] = useState(false); 
    
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function handleLogin(event) {
        event.preventDefault();
        
        if (!isKamoteLogin && !emailRegEx.test(userEmail)) {
          alert("Please enter a valid email address (e.g., name@example.com)");
          return;
        }
    
        // const user = users.find((u) => u.email === userEmail && u.password === userPassword);
        // if (user || (isKamoteLogin && userPassword === 'kamote')) {
        //   alert("Login successful!");
        //   onLogin();
        // } else {
        //   alert("Invalid email or password.");
        // }
      };

      function handleSignUp(event) {
        event.preventDefault();

        if (!emailRegEx.test(userEmail)) {
            alert("Please enter a valid email address (e.g., name@example.com)");
            return;
          }
      
        //   const existingUser = users.find((u) => u.email === userEmail);
        //   if (existingUser) {
        //     alert("This email is already registered.");
        //     return;
        //   }
      
        //   setUsers([...users, { email: userEmail, password: userPassword }]);
        //   alert("User registered successfully!");
      
          setUserEmail('');
          setUserPassword('');
          setIsSignUp(false); 
      }

      function forgotPassword() {
        alert("Feature coming soon.");
      }

    
    return (
        <div className={`login_form ${isSignUp ? 'sign-up' : 'login'}`}>
            <form 
                action="#"
                onSubmit={isSignUp ? handleSignUp : handleLogin}>
                
                <div id="title">
                    <h3 className={isSignUp ? 'sign-up-title' : 'login-title'}>{isSignUp ? "Sign Up" : "Log in with"}</h3>
                </div>

                {!isSignUp && (
                    <div className="login_option">
        
                        <div className="option">
                            <a href="#">
                                <img src={google} alt="Google" />
                                <span>Google</span>
                            </a>
                        </div>

                        <div className="option">
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
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter email address"
                        autoComplete="off"
                        required={!isKamoteLogin} />
                </div>

                <div className="input_box">
                    <div className="password_title">
                        <label forHTML="password">Password</label>
                        {!isSignUp && <a href="#" onClick={forgotPassword}>Forgot Password?</a>}
                    </div>

                    <input 
                        type="password"
                        id="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                </div>
            
            <button type="submit" className={isSignUp ? 'sign-up-btn' : 'login-btn'}>{isSignUp ? "Sign Up" : "Log In"}</button>

            {isSignUp ? (
                <p className="sign_up">
                    Already have an account? 
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