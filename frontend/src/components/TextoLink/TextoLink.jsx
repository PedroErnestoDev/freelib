import { Navigate, useNavigate } from "react-router-dom"
import "./Textolink.sass"

export default function TextoLink({to, textoAntes, textoLink }){
    const navigate = useNavigate()

    function handleClick(){
        navigate(to)
    }

    return (
        <>
        <p>{textoAntes}<a href={to}>{textoLink}</a></p>
        </>
    )
}