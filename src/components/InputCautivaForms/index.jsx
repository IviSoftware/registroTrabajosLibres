import './InputCautivaForms.css';
import { useState, useEffect, useRef } from 'react';
import { ContainerElementForm } from '../ContainerElementForm';

function InputCautivaForms({ text, name, type, max, setDataModule, dataModule, valueUser, verifyMail, onChange }) {
  const [limit, setLimit] = useState(valueUser || '');
  const hasInitialized = useRef(false);

  const sendToStageApi = (value) => {
    if (setDataModule && dataModule) {
      const updatedData = { ...dataModule, [name]: value };
      setDataModule(updatedData);
      console.log('sendToStageApi:', updatedData);
    }
  };

  useEffect(() => {
    if (valueUser !== undefined && !hasInitialized.current) {
      setLimit(valueUser); // Aseguramos que el valor inicial se sincronice correctamente
      sendToStageApi(valueUser);
      hasInitialized.current = true;
    }
  }, [valueUser]);

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (type === 'number') {
      value = value.replace(/[^0-9]/g, '');
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
    </ContainerElementForm>
  );
}

export { InputCautivaForms };
