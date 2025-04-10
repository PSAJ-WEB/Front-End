import { createSignal } from 'solid-js';
import styles from './verify.module.css';
import Image from '../img/image.png';

const VerificationPage = () => {
    const [code, setCode] = createSignal(['', '', '', '']);
    const inputRefs: HTMLInputElement[] = [];

    const handleInput = (index: number, value: string) => {
        const newCode = [...code()];
        newCode[index] = value.slice(0, 1);
        setCode(newCode);
        if (value && index < 3) {
            inputRefs[index + 1].focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent) => {
        if (e.key === 'Backspace' && !code()[index] && index > 0) {
            inputRefs[index - 1].focus();
        }
    };

    const handleVerify = async () => {
        const verificationCode = code().join('');

        try {
            const response = await fetch('http://127.0.0.1:8080/verifyotp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp: verificationCode }),
            });

            if (response.ok) {
                alert('OTP verification successful!');
                window.location.href = '/dashboard';
            } else {
                const errorDetails = await response.json();
                alert(errorDetails.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error during OTP verification:', error);
            alert('Error during OTP verification');
        }
    };

    return (
        <div class={styles.pageContainer}>
            <div class={styles.imageSection}>
                <img src={Image} alt="Verification" class={styles.imageside} />
            </div>
            <div class={styles.formSection}>
                <div class={styles.formContent}>
                    <h1 class={styles.title}>Verification Code</h1>
                    <p class={styles.subtitle}>
                        We've sent a 4-digit code to your email.
                    </p>

                    {/* Input untuk OTP */}
                    <div class={styles.inputContainer}>
                        {[0, 1, 2, 3].map((index) => (
                            <input
                                type="text"
                                inputmode="numeric"
                                maxLength={1}
                                value={code()[index]}
                                onInput={(e) => handleInput(index, (e.target as HTMLInputElement).value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => (inputRefs[index] = el as HTMLInputElement)}
                                class={styles.input}
                            />
                        ))}
                    </div>

                    {/* Tombol Verifikasi */}
                    <button class={styles.verifyButton} onClick={handleVerify}>
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;