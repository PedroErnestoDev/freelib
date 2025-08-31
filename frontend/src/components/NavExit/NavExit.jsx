import "./NavExit.sass"
import Logo from "../Logo/Logo"
import { useNavigate } from "react-router-dom"
import ButtonExit from "../ButtonExit/ButtonExit";

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
        <nav className="containerNavExit">
            <Logo/>
            <ButtonExit onClick={handleEntrar}>Exit</ButtonExit>
        </nav>
    )
}