import { createSignal, createEffect } from "solid-js";
import styles from "./NewPassword.module.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [passwordMatch, setPasswordMatch] = createSignal(true);

  createEffect(() => {
    if (confirmPassword() && newPassword() !== confirmPassword()) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    if (!newPassword()) {
      setMessage("Please enter new password");
      return;
    }
    
    if (!confirmPassword()) {
      setMessage("Please confirm your password");
      return;
    }
    
    if (newPassword() !== confirmPassword()) {
      setMessage("Passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage("Your password has been successfully reset");
      setIsSubmitting(false);
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        // window.location.href = "/login";
        console.log("Redirecting to login page");
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
          <h1 class={styles.title}>Reset Password</h1>
          <p class={styles.description}>
            Create your new password
          </p>
          
          <form onSubmit={handleSubmit} class={styles.form}>
            <div class={styles.inputGroup}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword()}
                onInput={(e) => setNewPassword(e.currentTarget.value)}
                class={styles.input}
                required
              />
            </div>
            
            <div class={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword()}
                onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                class={`${styles.input} ${!passwordMatch() ? styles.inputError : ''}`}
                required
              />
              {!passwordMatch() && (
                <p class={styles.errorText}>Passwords do not match</p>
              )}
            </div>
            
            {message() && (
              <div class={styles.messageContainer}>
                <p class={styles.message}>{message()}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              class={styles.submitButton}
              disabled={isSubmitting() || !passwordMatch()}
            >
              {isSubmitting() ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;