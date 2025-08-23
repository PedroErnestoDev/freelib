import "./Input.sass"

export default function Input({ label, name, type="text", value, onChange, placeholder }){
    return (
        <>  
            <div className="wrapper">
                {label && <label className="label" htmlFor={name}>{label}</label>}
                    <input className="containerInput"
                        id={name}
                        name={name}
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                    />
            </div>
        </>
    )
}