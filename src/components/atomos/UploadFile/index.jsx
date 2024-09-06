import { useState, useRef } from 'react';
import './UploadFile.css';

function UploadFile() {
  const [fileName, setFileName] = useState('');
  const folderIconRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleIconClick = () => {
    // Añadir animación al hacer click
    if (folderIconRef.current) {
      folderIconRef.current.classList.add('animate-icon');
      // Remover la clase después de la animación
      setTimeout(() => {
        folderIconRef.current.classList.remove('animate-icon');
      }, 300); // Tiempo que dura la animación en milisegundos
    }
  };

  return (
    <div className="form-group mt-3" id="ext_uploadStudent">
      <div className="file-upload">
        <input
          type="file"
          id="file-input"
          accept=".pdf,.jpg,.png,.jpeg"
          name="ext_document"
          onChange={handleFileChange}
          className="file-input"
        />
        <label htmlFor="file-input" className="file-input-label" onClick={handleIconClick}>
          <img
            src="/img/folder_icon.png"
            alt="Upload Icon"
            className="folder-icon"
            ref={folderIconRef}
          />
          <span>Seleccione documento que certifique tu condición de estudiante</span>
        </label>
        {fileName && (
          <div id="file-name" className="file-name-container">
            <img src="/img/document.png" alt="File Icon" className="file-icon" />
            <span id="file-name-text">{fileName}</span>
            <img src="/img/checked.png" alt="Check Icon" className="check-icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export {UploadFile};
