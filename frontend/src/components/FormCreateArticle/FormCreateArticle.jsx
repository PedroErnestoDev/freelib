import "./FormCreateArticle.sass";
import InputCover from "../InputCover/InputCover";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import { Upload, CircleCheck } from "lucide-react";
import { useState, useRef } from "react";
import { createArticle } from "../../services/userServices";
import NavExit from "../NavExit/NavExit";
import TabBar from "../TabBar/TabBar";
import { useNavigate } from "react-router-dom";

export default function FormCreateArticle({ userId }) {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // State for all form data
  const [formData, setFormData] = useState({
    fileTitle: "",
    fileSummary: "",
    fileCover: null, // File or URL
    file: null,
  });

  // Abre seletor de arquivos
  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Define arquivo (drag/drop ou input)
  const handleFileSelect = (file) => {
    if (file) {
      setFileName(file.name);
      setFormData((prev) => ({ ...prev, file }));
    }
  };

  // Seleção pelo input
  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0];
    handleFileSelect(file);
  };

  // Drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.files = files; // sincroniza com input hidden
      }
    }
  };

  // Inputs de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // InputCover (ex.: upload de capa)
  const handleCoverChange = (coverFile) => {
    setFormData((prev) => ({ ...prev, fileCover: coverFile }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fileTitle", formData.fileTitle);
    data.append("fileSummary", formData.fileSummary);
    data.append("fileCover", formData.fileCover);
    data.append("file", formData.file);

    const userId = localStorage.getItem("userId");
    data.append("user_id", userId);

    const token = localStorage.getItem("token")
    data.append("token", token)

    try {
      const result = await createArticle(data);
      console.log("Resultado da API:", result);
      if (result.success) navigate("/dashboard");
      else console.error("Erro ao criar artigo:", result);
    } catch (err) {
      console.error("Erro inesperado:", err);
    }
  };

  return (
    <>
      <NavExit />
      <form className="FormCreateArticle" onSubmit={handleSubmit}>
        <InputCover
          value={formData.fileCover}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setFormData({ ...formData, fileCover: file });
          }}
        />

        <div className="containerInputTextArea">
          <Input
            label="File Title"
            name="fileTitle"
            className="inputFileName"
            style={{ width: "811px", fontSize: "32px" }}
            onChange={handleInputChange}
            labelStyle={{ fontSize: "32px" }}
            value={formData.fileTitle}
          />

          <TextArea
            label="File Summary"
            name="fileSummary"
            style={{ width: "811px" }}
            onChange={handleInputChange}
            value={formData.fileSummary}
          />

          <div className="containerButton">
            <div
              className="file-upload-wrapper"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="file-upload-button"
                onClick={handleUploadButtonClick} // corrigido
              >
                Upload File <Upload size={28} strokeWidth={2} />
              </button>
              <div className="file-info">{fileName}</div>
            </div>

            <Button type="submit">
              Publish File <CircleCheck size={28} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </form>
      <TabBar />
    </>
  );
}
