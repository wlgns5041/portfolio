import galaxyImg from "../../assets/images/galaxy.jpg";

const FixedGalaxyLayer = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img
        src={galaxyImg}
        alt="galaxy"
        className="w-full h-full object-cover"
      />

      {/* 상단 페이드 */}
      <div className="absolute top-0 w-full h-48 bg-gradient-to-b from-slate-950 to-transparent" />

      {/* 하단 페이드 */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
};

export default FixedGalaxyLayer;
