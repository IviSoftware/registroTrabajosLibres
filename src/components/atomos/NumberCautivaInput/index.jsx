import './InputPhoneNumber.css';
import { useState, useEffect } from 'react';
import { ContainerElementForm } from '../../ContainerElementForm';
import InputMask from 'react-input-mask';

function NumberCautivaInput({ text, name, setDataModule, dataModule, valueUser }) {
    const [phoneNumber, setPhoneNumber] = useState(valueUser || '');

    const sendToStageApi = (value) => {
        const updatedData = { ...dataModule };
        updatedData[name] = value;
        setDataModule(updatedData);
    };

    useEffect(() => {
        if (valueUser) {
            sendToStageApi(valueUser);
        }
    }, [valueUser]);

    const handlePhoneChange = (e) => {
        if (valueUser) return; // No permitir cambios si valueUser está presente

        const value = e.target.value;
        const cleanValue = value.replace(/\D/g, ''); // Elimina cualquier cosa que no sea un número
        setPhoneNumber(cleanValue);
        sendToStageApi(cleanValue);
    };

    return (
        <ContainerElementForm>
            <label className='TextTitleFormComponent'>{text}</label>
            <InputMask
                mask="+999 999 999 9999"  // Máscara con suficiente flexibilidad para lada y número
                maskChar={null} // No muestra ningún carácter por defecto, solo permite números
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="+Lada Número" // Indicador de que después del + va la lada
                disabled={!!valueUser} // Deshabilitar el input si valueUser está presente
            >
                {(inputProps) => <input {...inputProps} name={name} type="text" />}
            </InputMask>
        </ContainerElementForm>
    );
}

export { NumberCautivaInput };
