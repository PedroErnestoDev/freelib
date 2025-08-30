import "./TextArea.sass";

export default function TextArea({label, name, value, onChange, placeholder, style}) {
    return (
        <div className="wrapper">
        {label && ( <label className="labelTextArea" htmlFor={name}>{label}</label>)}
            <textarea className="textarea"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={style}
            />
        </div>
    );
}
