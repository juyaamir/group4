import HeroImage from "../components/HeroImage.jsx";
import Main from "../components/Main.jsx";
import WelcomeMessage from "../components/WelcomeMessage.jsx";

const Home = () => {
  return (
    <div>
      <WelcomeMessage firstName={localStorage.getItem("userName")} />
      <HeroImage />

      {/*  <Main /> */}
    </div>
  );
};

export default Home;
