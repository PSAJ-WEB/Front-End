import { createSignal } from "solid-js";
import styles from "./forgotpasswordverify.module.css";

const ForgotPassword = () => {
  const [verificationCode, setVerificationCode] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const email = "xxxxx@gmail.com"; // Email yang ditampilkan di halaman

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    if (!verificationCode()) {
      setMessage("Please enter the verification code");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for verification
    setTimeout(() => {
      setMessage("Verification successful. You will be redirected shortly.");
      setIsSubmitting(false);
      
      // Redirect to reset password page after successful verification
      setTimeout(() => {
        // window.location.href = "/reset-password";
        console.log("Redirecting to reset password page");
      }, 2000);
    }, 1500);
  };

  return (
    <div class={styles.container}>
      <div class={styles.imageSection}>
        {/* Image is set as background in CSS */}
      </div>
      
      <div class={styles.formSection}>
        <div class={styles.formContainer}>
          <h1 class={styles.title}>Forgot Password</h1>
          <p class={styles.description}>
            We've sent 6 characters verification code to
            <br />
            <span class={styles.email}>{email}</span>
          </p>
          
          <form onSubmit={handleSubmit} class={styles.form}>
            <div class={styles.inputGroup}>
              <input
                type="text"
                placeholder="Verification code"
                value={verificationCode()}
                onInput={(e) => setVerificationCode(e.currentTarget.value)}
                class={styles.input}
                required
              />
            </div>
            
            {message() && (
              <div class={styles.messageContainer}>
                <p class={styles.message}>{message()}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              class={styles.submitButton}
              disabled={isSubmitting()}
            >
              {isSubmitting() ? "Processing..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;