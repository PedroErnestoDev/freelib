import { useState } from "react";
import { Upload } from "lucide-react";
import "./InputCover.sass";
import Input from "../Input/Input";

export default function InputCover({ label, name, onChange }) {
  const [fileName, setFileName] = useState();

  const handleFile = (file) => {
    if (file) {
      setFileName(file.name);
      if (onChange) {
        const event = { target: { name, files: [file] } };
        onChange(event);
      }
    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="wrapper">
      {label && (
        <label className="label" htmlFor={name}>
          {label}
        </label>
      )}

      <div
        className="inputWrapper"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          className="inputCoverContainerInput"  // Classe atualizada
          type="file"
          id={name}
          name={name}
          accept="image/*"
          onChange={handleChange}
        />
        <div className="customInput">
          <Upload size={48} />
          <p>Carregue a capa .png</p>
        </div>
      </div>

      <span className="fileName">{fileName}</span>
    </div>
  );
}