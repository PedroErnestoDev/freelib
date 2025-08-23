import "./Button.sass"

export default function Button({ children, onClick, bgColor, hoverColor}){
    return (
        <button className="btn" style={{ "--bg-color": bgColor, "--bg-hover": hoverColor }} onClick={onClick}>
            {children}
        </button>
    )
}