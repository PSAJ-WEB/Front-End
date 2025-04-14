import { createSignal } from 'solid-js';
import styles from './login.module.css';
import { useNavigate } from '@solidjs/router';
import eye from '../img/Eye.svg';
import eyeslash from '../img/EyeSlash.svg';
import sideImage from '../img/image.png';
import googleIcon from '../img/google.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = createSignal({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  // Di LoginPage.tsx
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch('http://127.0.0.1:8080/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              email: formData().email,
              password: formData().password,
          }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
          // Navigasi ke dashboard dengan ID user sebagai parameter
          navigate(`/dashboard?user_id=${data.id}`);
      } else {
          setErrorMessage(data.message || "Login gagal!");
      }
  } catch (error) {
      console.error('Error saat login:', error);
      setErrorMessage("Terjadi kesalahan saat menghubungi server.");
  }
};
  return (
    <div class={styles.loginPageContainer}>
      <div class={styles.loginImageSection}>
        <img src={sideImage} alt="Side Decoration" class={styles.loginSideImage} />
      </div>

      <div class={styles.loginFormSection}>
        <div class={styles.loginFormContainer}>
          <h1 class={styles.loginTitle}>Log In</h1>
          <p class={styles.loginWelcome}>Welcome to Theyy Wearr</p>
          <p class={styles.loginSubtitle}>Local brands with the best product quality</p>

          {errorMessage() && <p class={styles.loginError}>{errorMessage()}</p>}

          <form onSubmit={handleSubmit} class={styles.loginForm}>
            <div class={styles.loginInputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={formData().email}
                onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
                required
              />
            </div>

            <div class={styles.loginInputGroup}>
              <input
                type={showPassword() ? "text" : "password"}
                placeholder="Password"
                value={formData().password}
                onInput={(e) => setFormData({ ...formData(), password: e.target.value })}
                required
              />
              <img
                src={showPassword() ? eye : eyeslash}
                alt="Toggle Password"
                class={styles.loginEyeIcon}
                onClick={togglePasswordVisibility}
              />
            </div>

            <div class={styles.loginForgotPassword}>
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" class={styles.loginButton}>
              Log In
            </button>
          </form>

          </div>
      </div>
    </div>
  );
};

export default LoginPage;
