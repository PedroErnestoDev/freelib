import Logo from "../Logo/Logo";
import InputSearch from "../InputSearch/InputSearch";
import ButtonExit from "../ButtonExit/ButtonExit";
import "./NavSearch.sass";
import { useNavigate } from "react-router-dom";

export default function NavSearch({ query, setQuery, register }) {
      const navigate = useNavigate();

      function handleEntrar(){
        if(register == true){
            navigate("/register");
        } else {
            navigate("/login");
        }
    }

  return (
    <nav className="containerNav">
      <Logo />
      <InputSearch
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ButtonExit onClick={handleEntrar} bgColor="#fe7676" hoverColor="#f65d3e">
        Exit
      </ButtonExit>
    </nav>
  );
}