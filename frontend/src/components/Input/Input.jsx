import "./Input.sass"

export default function Input({ label, name, type="text", value, onChange, placeholder, style, labelStyle }){
    return (
        <>  
            <div className="wrapper">
                {label && <label className="label" htmlFor={name} style={labelStyle}>{label}</label>}
                    <input className="containerInput"
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        style={style}
                    />
            </div>
        </>
    )
}