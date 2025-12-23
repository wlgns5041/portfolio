import Lottie from "lottie-react";
import logoAnimation from "../../assets/logos/logo.json";

export default function LogoLottie() {
  return (
    <div className="w-[320px] h-[320px]">
      <Lottie animationData={logoAnimation} loop autoplay />
    </div>
  );
}