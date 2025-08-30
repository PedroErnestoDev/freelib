import Logo from "../Logo/Logo";
import InputSearch from "../InputSearch/InputSearch";
import Button from "../Button/Button";
import "./NavSearch.sass";

export default function NavSearch({ query, setQuery }) {
  return (
    <nav className="containerNav">
      <Logo />
      <InputSearch
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button bgColor="#fe7676" hoverColor="#f65d3e">
        Exit
      </Button>
    </nav>
  );
}