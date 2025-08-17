import Navbar from "../components/Navbar/Navbar";
import Form from "../components/Form/Form";

export default function Login() {
  return (
    <>
      <Navbar register={true}/>
      <Form />
    </>
  );
}