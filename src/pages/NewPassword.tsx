import { createSignal, createEffect, onMount } from "solid-js";
import styles from "./NewPassword.module.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [passwordMatch, setPasswordMatch] = createSignal(true);
  const [email, setEmail] = createSignal("");
  const [code, setCode] = createSignal("");
  const [isValid, setIsValid] = createSignal(false);

  // Get code from URL and verify with backend
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    
    if (!codeParam) {
      window.location.href = "/forgot-password";
      return;
    }
    
    setCode(codeParam);
    
    try {
      const response = await fetch("http://127.0.0.1:8080/verify-and-get-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: codeParam }),
      });

      const data = await response.json();
      
      if (data.valid) {
        setEmail(data.email);
        setIsValid(true);
      } else {
        window.location.href = "/forgot-password";
      }
    } catch (error) {
      window.location.href = "/forgot-password";
    }
  });

  createEffect(() => {
    if (confirmPassword() && newPassword() !== confirmPassword()) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!isValid()) {
      setMessage("Session expired. Please try again.");
      return;
    }
    
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
    
    try {
      const response = await fetch("http://127.0.0.1:8080/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email(),
          code: code(),
          new_password: newPassword(),
          confirm_password: confirmPassword()
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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