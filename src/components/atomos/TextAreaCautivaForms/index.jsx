
import { useState } from 'react';
import { ContainerElementForm } from '../../ContainerElementForm';

function TextAreaCautivaForms({ text, name, max, setDataModule, dataModule }) {

    const [limit, setLimit] = useState('');

    const sendToStageApi = (value) => {
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
            <textarea 
                name={name} 
                value={limit} 
                
                style={{height:'300px',backgroundColor:'#F5F4F7',padding:"16px",borderRadius:'10px'}}
                onChange={e => {
                    const value = e.target.value;
                    if (max) {
                        // Limitar la entrada a la cantidad de caracteres especificada en `max`
                        if (value.length <= Number(max)) {
                            setLimit(value);
                            sendToStageApi(value);
                        }
                    } else {
                        setLimit(value);
                        sendToStageApi(value);
                    }
                }} 
                className="TextAreaFormComponent" // Puedes definir esta clase en tu CSS para ajustar el estilo del textarea
            />
        </ContainerElementForm>
    )
}

export { TextAreaCautivaForms };
