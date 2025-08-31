import "./ButtonExit.sass"

export default function ButtonExit({ children, onClick, bgColor, hoverColor}){
    return (
        <button className="btnExit" style={{ "--bg-color": bgColor, "--bg-hover": hoverColor }} onClick={onClick}>
            {children}
        </button>
    )
}