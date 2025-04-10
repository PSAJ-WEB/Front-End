import { Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import './authpopup.css';
import imgpopup from '../img/popup.jpg';
import CloseIcon from '../img/X.svg'; // Import your close icon

interface IntroPopupProps {
  show: boolean;
  onClose: () => void;
}

const IntroPopup = (props: IntroPopupProps) => {
  const navigate = useNavigate();

  return (
    <Show when={props.show}>
      <div class="intro-popup-overlay">
        <div class="intro-popup-container">
          {/* Close button */}
          <button class="intro-popup-close" onClick={props.onClose}>
            <img src={CloseIcon} alt="Close" />
          </button>
          
          <div class="intro-popup-image">
            <img src={imgpopup} alt="Conversion Color Station" />
          </div>
          
          <div class="intro-popup-content">
            <h1>Please Log In First</h1>
            <p>To save items, add them to your cart, or explore more features, please log in to your account. This ensures a seamless and personalized experience.</p>
            
            <div class="intro-popup-buttons">
              <button 
                class="intro-popup-button intro-popup-primary"
                onClick={() => navigate("/login")}
              >
                Login Now
              </button>
              <button 
                class="intro-popup-button intro-popup-secondary"
                onClick={props.onClose}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default IntroPopup;