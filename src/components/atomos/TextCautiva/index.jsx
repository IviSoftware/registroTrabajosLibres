import './TextCautiva.css';
import { useState, useEffect, useRef } from 'react';
import { ContainerElementForm } from '../../ContainerElementForm';

function TextCautiva({ text, name, setDataModule, dataModule, valueUser }) {
  const [inputValue, setInputValue] = useState(valueUser || '');
  const [wordCount, setWordCount] = useState(0);
  const hasInitialized = useRef(false);

  const saveContent = (value) => {
    const updatedData = { ...dataModule, [name]: value };
    setDataModule(updatedData);
    console.log('Contenido guardado:', updatedData);
  };

  useEffect(() => {
    if (valueUser && !hasInitialized.current) {
      saveContent(valueUser);
      setWordCount(countWords(valueUser));
      hasInitialized.current = true;
    }
  }, [valueUser]);

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Contar palabras y limitar a 300
    const words = value.trim().split(/\s+/);
    if (words.length > 300) {
      value = words.slice(0, 300).join(' ');
    }

    setInputValue(value);
    setWordCount(words.length);
    saveContent(value);
  };

  // Función para contar palabras
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word).length;
  };

  return (
    <ContainerElementForm>
      {text && <label className='TextTitleFormComponent'>{text}</label>}
      <textarea
        className="custom-input-editor"
        name={name}
        value={inputValue}
        onChange={handleInputChange}
        disabled={!!valueUser}
        placeholder="Escribe tu texto aquí..."
      />
      {/* Contador de palabras estilo Twitter */}
      <div className={`word-counter ${wordCount > 280 ? 'warning' : ''}`}>
        {wordCount} / 300 palabras
      </div>
    </ContainerElementForm>
  );
}

export { TextCautiva };
