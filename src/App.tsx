import "./App.css";
import TopNav from "./components/common/TopNav";
import ScrollProgressBar from "./components/common/ScrollProgressBar";

import IntroSection from "./components/sections/IntroSection";
import SkillsSection from "./components/sections/SkillsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";


function App() {
  return (
    <div className="font-pretendard scroll-smooth bg-slate-950 text-slate-100">
      <ScrollProgressBar />
      <TopNav />

      <IntroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export default App;
