import styled from "styled-components"
import Logo from "../Logo/Logo"
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom"

const ContainerNavbar = styled.nav`
    display: flex;
    justify-content: space-between;
    margin: 10px 30px;
`

export default function Navbar({ register }){
    const navigate = useNavigate();

    function handleEntrar(){
        navigate("/login");
    }
    return (
        <ContainerNavbar>
            <Logo/>
            <Button onClick={handleEntrar}>{register ? "Register" : "Login"}</Button>
        </ContainerNavbar>
    )
}