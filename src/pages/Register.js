
// // src/pages/Register.js
// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // reuse same styles

// export default function Register() {
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [busy, setBusy] = useState(false);
//   const [passwordError, setPasswordError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   // Password Validation Regex
//   const validatePassword = (pwd) => {
//     const regex =
//       /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
//     return regex.test(pwd);
//   };

//   const handlePasswordChange = (e) => {
//     const value = e.target.value;
//     setPassword(value);

//     if (!validatePassword(value)) {
//       setPasswordError(
//         'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character.'
//       );
//     } else {
//       setPasswordError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validatePassword(password)) {
//       setPasswordError(
//         'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character.'
//       );
//       return;
//     }

//     setBusy(true);
//     try {
//       await register(name, email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       const msg = err?.response?.data?.message || 'Registration failed';
//       alert(msg);
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="avatar"></div>
//         <h3 className="login-title">Register</h3>
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group">
//             <input
//               type="email"
//               placeholder="Email ID"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-group password-group">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               value={password}
//               onChange={handlePasswordChange}
//               required
//             />
//             <span
//               className="toggle-password"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? '👁️' : '🙈'}
//             </span>
//             {passwordError && <p className="error-text">{passwordError}</p>}
//           </div>
//           <button
//             type="submit"
//             className="login-btn"
//             disabled={busy || !!passwordError}
//           >
//             {busy ? 'Signing up...' : 'Register'}
//           </button>
//         </form>

//         {/* Link back to login */}
//         <div className="register-section">
//           <p className="register-text">Already have an account?</p>
//           <button
//             className="register-btn"
//             onClick={() => navigate('/login')}
//           >
//             Login
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
import './Login.css'; // reuse same styles

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Password Validation Regex
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return regex.test(pwd);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError(
        'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character.'
      );
      return;
    }

    setBusy(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Registration failed';
      alert(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="avatar"></div>
        <h3 className="login-title">Register</h3>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="login-btn"
            disabled={busy || !!passwordError}
          >
            {busy ? 'Signing up...' : 'Register'}
          </button>
        </form>

        {/* Link back to login */}
        <div className="register-section">
          <p className="register-text">Already have an account?</p>
          <button
            className="register-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
