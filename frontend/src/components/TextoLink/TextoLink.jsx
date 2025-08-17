import { Navigate, useNavigate } from "react-router-dom"
import styled from "styled-components";

// const Texto = styled.p`
//   font-size: ${(props) => props.fontSize || "16px"};
//   color: ${(props) => props.color || "black"};
// `;

// const LinkTexto = styled.span`
//   color: ${(props) => props.linkColor || "blue"};
//   text-decoration: underline;
//   cursor: pointer;
// `;

export default function TextoLink({to, textoAntes, textoLink }){
    const navigate = useNavigate()

    function handleClick(){
        navigate(to)
    }

    return (
        <>
        <p>{textoAntes}<a href={to}>{textoLink}</a></p>
            {/* <Texto fontSize={fontSize} color={color}>
            {textoAntes}{" "}
            <LinkTexto linkColor={linkColor} onClick={handleClick}>
            {textoLink}
            </LinkTexto>
            </Texto> */}
        </>
    )
}