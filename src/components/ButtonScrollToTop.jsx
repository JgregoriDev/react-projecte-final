import React,{useState,useEffect} from 'react'
import "../assets/style/ButtonBackToTop.css";
const ButtonScrollToTop = ({showInSize=300}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > showInSize)  {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  return (
    <div> {showButton && (
      <button onClick={scrollToTop} title="Volver arriba" className="back-to-top btn-primary ">
        <i class="bi bi-arrow-up"></i>
      </button>
    )}</div>
  )
}

export default ButtonScrollToTop