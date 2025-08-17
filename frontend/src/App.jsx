import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ContainerApp = styled.div`
  
`;

export default function App() {
  return (
    <BrowserRouter>
      <ContainerApp>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ContainerApp>
    </BrowserRouter>
  );
}


