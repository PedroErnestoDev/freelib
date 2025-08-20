import Navbar from "../components/Navbar/Navbar";
import Form from "../components/FormLogin/FormLogin";
import FormLogin from "../components/FormLogin/FormLogin";

export default function Login() {
  return (
    <>
      <Navbar register={true}/>
      <FormLogin />
    </>
  );
}