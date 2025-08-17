import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ContainerInput = styled.input`
  width: 454px;
  height: 30px;
  padding: 10px 12px;
  border: 3px solid black;
  border-radius: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: black;
    box-shadow: 0 0 4px black;
  }
`
const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
  font-family: "inter", Arial, Helvetica, sans-serif;
`;

export default function Input({ label, name, type = "text", value, onChange, placeholder }){
    return (
        <>  
            <Wrapper>
                {label && <Label htmlFor={name}>{label}</Label>}
                <ContainerInput
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </Wrapper>
        </>
    )
}