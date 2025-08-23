import "./Navbar.sass"
import Logo from "../Logo/Logo"
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom"

export default function Navbar({ register }){
    const navigate = useNavigate();

    function handleEntrar(){
        if(register == true){
            navigate("/register");
        } else {
            navigate("/login");
        }
    }
    return (
        <nav className="containerNavbar">
            <Logo/>
            <Button onClick={handleEntrar}>{register ? "Register" : "Login"}</Button>
        </nav>
    )
}