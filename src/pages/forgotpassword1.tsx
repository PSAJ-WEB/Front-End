import { createSignal } from "solid-js";
import styles from "./forgotpassword1.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = createSignal("");
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [verificationCode, setVerificationCode] = createSignal("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!email()) {
      setMessage("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:8080/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email() }),
      });

      const data = await response.json();

      if (data.success) {
        // Simpan kode verifikasi di state (tidak di session storage)
        setVerificationCode(data.verification_code);
        // Redirect dengan email dan code sebagai query parameters
        window.location.href = `/forgot-password/verify?email=${encodeURIComponent(email())}}`;
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