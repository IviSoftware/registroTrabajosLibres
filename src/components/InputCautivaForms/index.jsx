import './InputCautivaForms.css';
import { useState, useEffect, useRef } from 'react';
import { ContainerElementForm } from '../ContainerElementForm';

function InputCautivaForms({ text, name, type, max, setDataModule, dataModule, valueUser, verifyMail, onChange }) {
  const [limit, setLimit] = useState(valueUser || '');
  const [wordCount, setWordCount] = useState(0);
  const hasInitialized = useRef(false);

  const sendToStageApi = (value) => {
    if (setDataModule && dataModule) {
      const updatedData = { ...dataModule };
      updatedData[name] = value;
      setDataModule(updatedData);
      console.log('sendToStageApi:', updatedData);
    }
  };

  useEffect(() => {
    if (valueUser !== undefined && !hasInitialized.current) {
      setLimit(valueUser);
      sendToStageApi(valueUser);
      setWordCount(countWords(valueUser));
      hasInitialized.current = true;
    }
  }, [valueUser]);

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Reglas para tipo "textRestrict"
    if (type === 'textRestrict') {
      // Convertir a mayúsculas
      value = value.toUpperCase();

      // Eliminar símbolos y caracteres especiales (permitir solo letras y espacios)
      value = value.replace(/[^A-Z\s]/g, '');

      // Contar palabras y restringir a 180
      const words = value.trim().split(/\s+/);
      if (words.length > 180) {
        value = words.slice(0, 180).join(' ');
      }
      
      // Actualizar contador de palabras
      setWordCount(words.length);
    }

    if (max) {
      if (value.length <= Number(max) && Number(value) <= 100) {
        setLimit(value);
        onChange ? onChange(e) : sendToStageApi(value);
      }
    } else {
      setLimit(value);
      onChange ? onChange(e) : sendToStageApi(value);
    }
  };

  // Función para contar palabras
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word).length;
  };

  return (
    <ContainerElementForm>
      {text && <label className='TextTitleFormComponent'>{text}</label>}
      <input
        name={name}
        type="text"
        value={limit}
        onChange={handleInputChange}
        onBlur={() => {
          if (name === 'adicionalConfirmarCorreo') {
            verifyMail(dataModule);
          }
        }}
        inputMode={type === 'number' ? 'numeric' : 'text'}
      />
      {/* Mostrar contador de palabras solo si el tipo es "textRestrict" */}
      {type === 'textRestrict' && (
        <div className="word-counter">
          {wordCount} / 180 palabras
        </div>
      )}
    </ContainerElementForm>
  );
}

export { InputCautivaForms };
