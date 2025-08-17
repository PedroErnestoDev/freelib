import Navbar from "../components/Navbar/Navbar";
import Form from "../components/Form/Form";
import { register } from "../services/userServices";
import { useState, useEffect } from "react";


export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  useEffect(()=> {
    console.log(formData)
  },[formData])

  function handleChange(event){
    const name = event.target.name
    const value = event.target.value
    setFormData((prevFormData)=>{
      return {
        ...prevFormData,
        [name]:value
      }
    })
    
  }

  async function submitForm(){
    // Chamada para o backend
    let response = await register(formData)
    if(response.success){
      alert("Usuario criado")
    } else {
      alert("erro")
    }
  }

  return (
    <>
      <Navbar login={true}/>
      <form>
        <label htmlFor="">Nome</label>
        <input type="text" onChange={(event)=>{handleChange(event)}} name="name" value={formData.name}/>
        <label htmlFor="">E-mail</label>
         <input type="email" onChange={(event)=>{handleChange(event)}} name="email" value={formData.email}/>
        <label htmlFor="">Senha</label>
         <input type="password" onChange={(event)=>{handleChange(event)}} name="password" value={formData.password}/>
        <label htmlFor="">Confirme a Senha</label>
        <input type="password" />
        <button type="button" onClick={submitForm}>Register</button>
      </form>
    </>
  );
}