import './InputCautivaForms.css';
import { useState } from 'react';
import { ContainerElementForm } from '../ContainerElementForm';

function InputCautivaForms ({text,name,type,max,setDataModule,dataModule,valueUser}) {

    const [limit, setLimit] = useState('');

    const sendToStageApi = (value) =>{
        // Crear una copia del objeto dataModule
        const updatedData = { ...dataModule };
        // Actualizar el valor del campo correspondiente
        updatedData[name] = value;
        // Actualizar el estado con el nuevo objeto
        setDataModule(updatedData);
    }



    return (
        <ContainerElementForm>
          <label className='TextTitleFormComponent'>{text}</label>
<input
  name={name}
  type={type}
  value={valueUser 
    ? valueUser : limit}
  onChange={e => {
    const value = e.target.value;

    if (max) {
      // Limitar la entrada
      if (value.length <= Number(max) && Number(value) <= 100) {
        setLimit(value);
        sendToStageApi(value);
      }
    } else {
      if (type === 'text') {
        const valueTexting = value
          .toUpperCase()
          .replace(/[^A-Z\s]/g, '');
        setLimit(valueTexting);
        sendToStageApi(valueTexting);
      } else if (type === 'number') {
        const numericValue = Number(value);
        if (numericValue >= 18) {
          setLimit(numericValue);
          sendToStageApi(numericValue);
        }
      } else {
        setLimit(value);
        sendToStageApi(value);
      }
    }
  }}
/>

        </ContainerElementForm>
    )
}

export {InputCautivaForms}