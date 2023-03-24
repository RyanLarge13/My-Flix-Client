import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import Navigation from "../navigation/Navigation";
import elements from "../../styles/elements";

const Header = ({ user, setUser }) => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <header className={`${elements.header}`}>
        <CgMenuRight onClick={() => setNav(true)} className="cursor-pointer" />
      </header>
      {nav && <Navigation user={user} setUser={setUser} setNav={setNav} />}
    </>
  );
};

export default Header;
