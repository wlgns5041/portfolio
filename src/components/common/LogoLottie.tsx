import Lottie from "lottie-react";
import logoAnimation from "../../assets/logos/logo.json";

const LogoLottie = () => {
  return (
    <Lottie
      animationData={logoAnimation}
      loop
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default LogoLottie;