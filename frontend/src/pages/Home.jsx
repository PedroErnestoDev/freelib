import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import ImgHome from "../assets/pixeltrue-welcome.png"
import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";
import { useNavigate, Link } from "react-router-dom"
import "./Home.sass"

export default function Home(){
    const navigate = useNavigate();

    function handleEntrar(){
        navigate("/login");
    }
    return (
        <>  
            <Navbar/>
            <div className="page">
            <div className="containerHome">
                <img src={ImgHome} alt="Imagem welcome" />
                <div className="containerButtons">
                    <h1 className="titulo">Welcome to</h1><Logo/>
                </div>
                    <div className="containerButtons">
                        <Button><Link to="/login">Login</Link></Button>
                        <Button><Link to="/register">Register</Link></Button>
                    </div>
            </div>
            </div>
        </>
    )
}