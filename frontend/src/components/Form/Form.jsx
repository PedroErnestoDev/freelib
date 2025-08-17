import styled from "styled-components";
import Input from "../Input/Input";
import ImgLogin from "../../assets/pixeltrue-space-discovery.png"
import Button from "../Button/Button";
import TextoLink from "../TextoLink/TextoLink";

const ContainerForm = styled.form`
  width: 517px;
  border: 2px solid black;
  border-radius: 20px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  margin: 100px auto;

  img {
    width: 371px;
    height: 278px;
  }
`;

export default function Form(){
    return (
        <> 
                <ContainerForm>
                    <Input
                        label="Email"
                        name="email"
                        type="e-mail"
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <img src={ImgLogin} alt="Img de login" />
                    <Button hg="57px" wd="250px" fs="24px">Login</Button>
                    <TextoLink to="/register" textoAntes="New here?" textoLink="Register now and join us!"/>
                </ContainerForm>
        </>
    )
}