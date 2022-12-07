import axios from "axios";

function Profile() {
  const isLoggedIn = Boolean(localStorage.getItem("session"));

  const handleLogout = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BASEURL}authentication/session?api_key=${process.env.REACT_APP_APIKEY}`,
        {
          data: {
            session_id: localStorage.getItem("session"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("session");
        window.location.reload();
      });
  };
  if (isLoggedIn) {
    return (
      <>
        <p>Profile Page</p>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }

  return "forbidden";
}

export default Profile;
