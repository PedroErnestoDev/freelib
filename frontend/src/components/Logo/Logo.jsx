import styled from "styled-components"

const ContainerLogo = styled.div`
    font-family: "Shrikhand", Arial, Helvetica, sans-serif;
    color: black;
    font-size: 54px;
`

export default function Logo(){
    return (
        <ContainerLogo>
            Freelib
        </ContainerLogo>
    )
}