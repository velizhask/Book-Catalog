import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginRegister.css'

const LoginRegister = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsSignUp(!isSignUp)
  }

  const handleSignIn = () => {
    navigate('/books')
  }

  return (
    <div className="auth-page">
      <div className={`auth-cont ${isSignUp ? 's--signup' : ''}`}>
        <div className="form sign-in">
          <h2>Welcome back,</h2>
          <label>
            <span>Email</span>
            <input type="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="button" className="submit" onClick={handleSignIn}>Login</button>
        </div>
        
        <div className="sub-cont">
          <div className="gradient-panel">
            <div className="panel-text m--up">
              <h2>One of us?</h2>
              <p>If you already has an account, just sign in. We've missed you!</p>
            </div>
            <div className="panel-text m--in">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <div className="panel-btn" onClick={handleToggle}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Login</span>
            </div>
          </div>
          
          <div className="form sign-up">
            <h2>Join Us</h2>
            <label>
              <span>Name</span>
              <input type="text" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" />
            </label>
            <label>
              <span>Password</span>
              <input type="password" />
            </label>
            <button type="button" className="submit">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister