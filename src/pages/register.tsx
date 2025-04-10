import { createSignal } from 'solid-js';
import styles from './register.module.css';
import { useNavigate } from '@solidjs/router';
import eye from '../img/Eye.svg';
import eyeslash from '../img/EyeSlash.svg';
import sideImage from '../img/image.png';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [fullname, setFullName] = createSignal('');
    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [confirmPassword, setConfirmPassword] = createSignal('');
    const [showPassword, setShowPassword] = createSignal(false);
    const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
    const [formData, setFormData] = createSignal({
        fullname: '',
        email: '',
        password: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword());
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword());
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        // Update formData with current values
        setFormData({
            fullname: fullname(),
            email: email(),
            password: password(),
        });

        // Check if all fields are filled correctly
        if (fullname() && email() && password() && password() === confirmPassword()) {
            try {
                const response = await fetch('http://127.0.0.1:8080/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData().email,
                        password: formData().password,
                        fullname: formData().fullname,
                    }),
                });

                console.log('Response:', response);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Registration successful:', data);
                    alert('Registration successful! Please check your email for verification code.');
                    navigate('/verifyotp');
                } else {
                    const errorDetails = await response.json();
                    console.error('Error response:', errorDetails);
                    alert('Error registering user');
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Error during registration');
            }
        } else {
            alert('Please ensure all fields are filled correctly');
        }
    };

    return (
        <div class={styles.pageContainer}>
            <div class={styles.imageSection}>
                <img src={sideImage} alt="Side Decoration" class={styles.sideImage} />
            </div>

            <div class={styles.formSection}>
                <div class={styles.formContainer}>
                    <h1 class={styles.title}>Register</h1>
                    <p class={styles.welcome}>Welcome to Theyy Wearr</p>
                    <p class={styles.subtitle}>Local brands with the best product quality</p>

                    <form onSubmit={handleSubmit} class={styles.form}>
                        <div class={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullname()}
                                onInput={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>

                        <div class={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email()}
                                onInput={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div class={styles.inputGroup}>
                            <input
                                type={showPassword() ? "text" : "password"}
                                placeholder="Password"
                                value={password()}
                                onInput={(e) => setPassword(e.target.value)}
                                required
                            />
                            <img
                                src={showPassword() ? eye : eyeslash}
                                alt="Toggle Password"
                                class={styles.eyeIcon}
                                onClick={togglePasswordVisibility}
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div class={styles.inputGroup}>
                            <input
                                type={showConfirmPassword() ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword()}
                                onInput={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <img
                                src={showConfirmPassword() ? eye : eyeslash}
                                alt="Toggle Confirm Password"
                                class={styles.eyeIcon}
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </div>

                        <button type="submit" class={styles.registerButton}>
                            Register
                        </button>
                    </form>

                    <p class={styles.loginText}>
                        Already have an account? <a href="/login" class={styles.loginLink}>Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
