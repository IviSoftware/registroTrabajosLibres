import { useState, useRef } from 'react';
import './UploadFile.css';
import { FiUpload } from 'react-icons/fi'; // Importamos un icono de subida

function UploadFile({ uploadUrl }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const folderIconRef = useRef(null);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Validar tipo de archivo (solo Word y plantillas Word)
      const allowedExtensions = /(\.doc|\.docx|\.dotx)$/i;
      if (!allowedExtensions.exec(selectedFile.name)) {
        alert('Solo se permiten archivos en formato Word (.doc, .docx, .dotx).');
        inputRef.current.value = ''; // Limpiar el input
        setFile(null);
        setFileName('');
        return;
      }

      // Validar tamaño del archivo (máximo 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSizeInBytes) {
        alert('El archivo no debe exceder los 5MB.');
        inputRef.current.value = ''; // Limpiar el input
        setFile(null);
        setFileName('');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleIconClick = () => {
    if (folderIconRef.current) {
      folderIconRef.current.classList.add('animate-icon');
      setTimeout(() => {
        folderIconRef.current.classList.remove('animate-icon');
      }, 300);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo antes de subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Archivo subido exitosamente');
        setFile(null);
        setFileName('');
        inputRef.current.value = ''; // Limpiar el input
      } else {
        alert('Error al subir el archivo');
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Ocurrió un error al subir el archivo.');
    }
  };

  return (
    <div className="form-group mt-3" id="ext_uploadStudent">
      <div className="file-upload">
        <input
          type="file"
          ref={inputRef}
          accept=".doc,.docx,.dotx" // Permitir solo archivos Word
          name="ext_document"
          onChange={handleFileChange}
          className="file-input"
        />
        <label className="file-input-label" onClick={() => inputRef.current.click()} onMouseDown={handleIconClick}>
          <img
            src="/img/folder_icon.png"
            alt="Upload Icon"
            className="folder-icon"
            ref={folderIconRef}
          />
          <span>Seleccione documento</span>
        </label>
        {fileName && (
          <div className="file-name-container show">
            <img src="/img/document.png" alt="File Icon" className="file-icon iconUploads" />
            <span>{fileName}</span>
            <img src="/img/checked.png" alt="Check Icon" className="check-icon iconUploads" />
          </div>
        )}
        {file && (
          <button onClick={handleUpload} className="upload-btn animate-upload-btn">
            <FiUpload className="upload-icon" /> Subir Archivo
          </button>
        )}
      </div>
    </div>
  );
}

export { UploadFile };
