import { createSignal, onMount } from "solid-js";
import styles from "./forgotpasswordverify.module.css";

const ForgotPassword = () => {
  const [verificationCode, setVerificationCode] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [email, setEmail] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!verificationCode()) {
      setMessage("Please enter the verification code");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Langkah 1: Dapatkan email dari database berdasarkan kode
      const emailResponse = await fetch("http://127.0.0.1:8080/get-email-by-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: verificationCode() }),
      });

      if (!emailResponse.ok) {
        throw new Error("Invalid verification code");
      }

      const emailData = await emailResponse.json();
      setEmail(emailData.email);

      // Langkah 2: Verifikasi kode
      const verifyResponse = await fetch("http://127.0.0.1:8080/forgot-password/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: emailData.email,
          code: verificationCode() 
        }),
      });

      const verifyData = await verifyResponse.json();
      
      if (verifyData.success) {
        setMessage("Verification successful. You will be redirected shortly.");
        // Redirect ke halaman new password dengan membawa code dan email
        setTimeout(() => {
          window.location.href = `/newpassword?&email=${encodeURIComponent(emailData.email)}`;
        }, 2000);
      } else {
        setMessage(verifyData.message);
      }
    } catch (error) {
      setMessage("Invalid or expired verification code");
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
          <h1 class={styles.title}>Forgot Password</h1>
          <p class={styles.description}>
            We've sent 6 characters verification code to
            <br />
            <span class={styles.email}>{email()}</span>
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