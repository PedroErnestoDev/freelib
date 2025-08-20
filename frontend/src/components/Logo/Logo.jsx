import { Link } from "react-router-dom";
import "./Logo.sass";

export default function Logo() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <Link 
      to={isAuthenticated ? "/dashboard" : "/"} 
      className="containerLogo"
    >
      Freelib
    </Link>
  );
}
