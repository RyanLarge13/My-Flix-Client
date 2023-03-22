import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import Navigation from "../navigation/Navigation";
import elements from "../../styles/elements";

const Header = ({ user }) => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <header className={`${elements.header}`}>
        <CgMenuRight onClick={() => setNav(true)} />
      </header>
      {nav && <Navigation user={user} setNav={setNav} />}
    </>
  );
};

export default Header;
