import HeroImage from "../components/HeroImage.jsx";
import { useState, useEffect } from "react";
import Main from "../components/Main.jsx";
import WelcomeMessage from "../components/WelcomeMessage.jsx";
import Part2hero from "../components/Part2hero.jsx";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [islogged, setIslogged] = useState(false);
  const [user, setUser] = useState(null);

  const getuserlogged = () => {
    if (token) {
      setIslogged(true);
    } else {
      setIslogged(false);
    }
  };
  useEffect(() => {
    // console.log("from App useEffect", token);

    getuserlogged();
  }, [token]);

  return (
    <div>
      {islogged && user && <WelcomeMessage firstName={user.firstname} />}
      <HeroImage />
      <Part2hero />

      {/*  <Main /> */}
    </div>
  );
};

export default Home;
