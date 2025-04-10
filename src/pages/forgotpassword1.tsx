import { createSignal } from "solid-js";
import styles from "./forgotpassword1.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [message, setMessage] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    
    if (!email()) {
      setMessage("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage("Password reset instructions have been sent to your email");
      setIsSubmitting(false);
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
            Enter your email here to reset password.
          </p>
          
          <form onSubmit={handleSubmit} class={styles.form}>
            <div class={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
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
              {isSubmitting() ? "Processing..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;