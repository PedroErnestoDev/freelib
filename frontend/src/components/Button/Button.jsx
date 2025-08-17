import styled from "styled-components"

const ContainerButton = styled.button`
    display: flex;
    border: 2px solid black;
    height: ${props => props.hg || "78px"};
    width: ${props => props.wd || "268px"};
    background-color: ${props => props.bg || "#D5FFD3"};
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-size:  ${props => props.fs || "32px"};

    &:hover{
        background-color: #9cec98;
        cursor: pointer;
    }
`

export default function Button({ children, bg, onClick, hg, wd, fs}){
    return (
        <ContainerButton bg={bg} onClick={onClick} children={children} hg={hg} wd={wd} fs={fs}/>
    )
}