import styled from "styled-components";
import Navbar from "../components/Navbar/Navbar";
import ImgHome from "../assets/pixeltrue-welcome.png"
import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";
import { useNavigate, Link } from "react-router-dom"
import Input from "../components/Input/Input";

const ContainerHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontal */
  justify-content: center; /* Centraliza vertical */
  flex: 1; /* Faz ocupar o espaço do Page */
  text-align: center;
  margin-top: -180px;

  img {
    width: 460px;
    height: 375px;
  }
`
const ContainerButtons = styled.div`
    display: flex;
    column-gap: 20px;
`

const Titulo = styled.h1`
    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
`

const Page = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

const ContainerTituloLogo = styled.div`
    display: flex;
    column-gap: 10px;
`

export default function Home(){
    const navigate = useNavigate();

    function handleEntrar(){
        navigate("/login");
    }
    return (
        <>  
            <Navbar/>
            <Page>
            <ContainerHome>
                <img src={ImgHome} alt="Imagem welcome" />
                <ContainerTituloLogo>
                    <Titulo>Welcome to</Titulo><Logo/>
                </ContainerTituloLogo>
                    <ContainerButtons>
                        <Button><Link to="/login">Login</Link></Button>
                        <Button>Register</Button>
                    </ContainerButtons>
            </ContainerHome>
            </Page>
        </>
    )
}