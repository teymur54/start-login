import { useState, useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signIn } from '../api/axios';
import toast from 'react-hot-toast';
import '../styles/Loginpage.css';

const LoginPage = () => {
  const { auth, login, isVerifying } = useAuth();

  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastShown, setToastShown] = useState(false); // Track if toast is shown

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await signIn({
        username: loginRef.current.value,
        password: passwordRef.current.value,
      });

      login(result);
      navigate(from, { replace: true });
      toast.success('User is logged in');
    } catch (error) {
      if (!toastShown) {
        setToastShown(true);
        if (!error?.response) toast.error('Server not responding');
        else if (error?.response?.status === 400)
          toast.error('İstifadəçi adı və ya şifrə daxil olunmayıb');
        else if (error?.response?.status === 401)
          toast.error('Incorrect username or password');
        else toast.error('Please refresh the page');

        setTimeout(() => {
          setToastShown(false);
        }, 3000); // Delay before allowing next toast
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!isVerifying && auth?.isAuth && <Navigate to="/" />}
      {!isVerifying && !auth?.isAuth && (
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Sign in</h2>
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <input
              required
              autoComplete="off"
              ref={loginRef}
              id="username"
              type="text"
              placeholder="Enter your username"
              className="login-input"
            />

            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              required
              ref={passwordRef}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="login-input"
            />
            <button type="submit" className="login-btn">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;