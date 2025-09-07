import "./FormLogin.sass";
import Input from "../Input/Input";
import ImgLogin from "../../assets/pixeltrue-space-discovery.png";
import Button from "../Button/Button";
import TextoLink from "../TextoLink/TextoLink";
import { useState } from "react";
import { login } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);

    console.log("Resultado do login:", result);

    // Ajuste aqui: pegar corretamente o usuário
    const user = result?.data?.user;
    const token = result?.data?.token;

    if (result.success && user && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      navigate("/dashboard");
    } else {
      console.error("Erro no login:", result);
      alert(result.error || "Erro ao fazer login");
    }
  };

  return (
    <>
      <form>
        <Input
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
        />
        <img src={ImgLogin} alt="Img de login" />
        <Button hg="57px" wd="250px" fs="24px" onClick={formSubmit}>
          Login
        </Button>
        <TextoLink
          to="/register"
          textoAntes="New here?"
          textoLink="Register now and join us!"
        />
      </form>
    </>
  );
}
