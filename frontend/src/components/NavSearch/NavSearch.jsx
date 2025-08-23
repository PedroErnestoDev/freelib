import Logo from "../Logo/Logo"
import "./NavSearch.sass"
import InputSearch from "../InputSearch/InputSearch"
import Button from "../Button/Button"

export default function NavSearch(){
    return (
        <nav className="containerNav">
            <Logo/>
            <InputSearch
                placeholder="Search"
            />
            <Button bgColor="#fe7676" hoverColor="#f65d3e">Exit</Button>
        </nav>
    )
}