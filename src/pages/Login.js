
// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// import './Login.css';

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [busy, setBusy] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBusy(true);
//     try {
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       const msg = err?.response?.data?.message || 'Login failed';
//       alert(msg);
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="avatar"></div>
//         <h3 className="login-title">Login</h3>
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <input 
//               type="email" 
//               placeholder="Email ID" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               required 
//             />
//           </div>
//           <div className="input-group">
//             <input 
//               type="password" 
//               placeholder="Password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//             />
//           </div>
//           <div className="options">
//             <label>
//               <input type="checkbox" /> Remember me
//             </label>
//             <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
//           </div>
//           <button type="submit" className="login-btn" disabled={busy}>
//             {busy ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         {/* Register button */}
//         <div className="register-section">
//           <p className="register-text">Don’t have an account?</p>
//           <button 
//             className="register-btn" 
//             onClick={() => navigate('/Register')}
//           >
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }























import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // import eye icons
import './Login.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // new state
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Login failed';
      alert(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="avatar"></div>
        <h3 className="login-title">Login</h3>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email ID" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group password-group">
            <input 
              type={showPassword ? 'text' : 'password'} // toggle type
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <span 
              className="password-toggle" 
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn" disabled={busy}>
            {busy ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="register-section">
          <p className="register-text">Don’t have an account?</p>
          <button 
            className="register-btn" 
            onClick={() => navigate('/Register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
