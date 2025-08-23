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

    if (result.success) {
      // Exemplo: salvar token no localStorage
      localStorage.setItem("token", result.data.token);
      navigate("/dashboard");
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      <form>
        <Input
          label="Email"
          name="email"
          type="e-mail"
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
