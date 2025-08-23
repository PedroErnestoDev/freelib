import { register } from "../../services/userServices";
import { useState, useEffect } from "react";
import TextoLink from "../../components/TextoLink/TextoLink";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

export default function FormRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function submitForm(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("The passwords don't match");
      return;
    }
    // Chamada para o backend
    try {
      let response = await register(formData);

      if (response.success) {
        navigate("/dashboard");
      } else {
        alert("Error to the register");
      }
    } catch (error) {
      alert("Don't was possible make your register");
    }
  }

  return (
    <>
      <form>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Complete name here"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="E-mail"
          name="email"
          type="email"
          placeholder="E-mail here"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password here"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          label="Confirme your password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password here"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button onClick={submitForm} children="Register" />
        <TextoLink
          to="/login"
          textoAntes="New You already have an account?"
          textoLink="Log in here."
        />
      </form>
    </>
  );
}
