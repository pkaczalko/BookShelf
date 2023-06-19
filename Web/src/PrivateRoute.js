import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    let x = document.cookie;
    // Counter to see if login cookie is present
    let counter = 0;
    console.log(`All cookies: ${x}`);

    // Split all cookies by ";"
    x.split(";").forEach((cookie) => {
      console.log(`Cookies: ${cookie}`);

      // Splitting each cookie by "=" and checking if left side is equal to "login"
      if (cookie.split("=")[0] === "login") {
        counter++;
      }
    });

    // If cookie login isn't present redirect to login page
    if (!counter) navigate("/", { replace: true });
    // Otherwise continue to body of this component which is returning children
  }, []);

  // Returning children if login cookie was present
  return props.children;
}

export default PrivateRoute;
