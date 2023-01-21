import { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import Axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const username = localStorage.getItem("Username");
    Axios.get(`http://localhost:8080/users/${username}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <section>{user ? <h1>{user.Username}</h1> : <DotLoader />}</section>;
};

export default Profile;
