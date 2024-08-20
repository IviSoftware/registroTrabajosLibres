import './InputPhoneNumber.css';
import { useState } from 'react';
import { ContainerElementForm } from '../../ContainerElementForm';
import InputMask from 'react-input-mask';

function NumberCautivaInput({ text, name, setDataModule, dataModule }) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const sendToStageApi = (value) => {
        const updatedData = { ...dataModule };
        updatedData[name] = value;
        setDataModule(updatedData);
    };

    const handlePhoneChange = (e) => {
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
            >
                {(inputProps) => <input {...inputProps} name={name} type="text" />}
            </InputMask>
        </ContainerElementForm>
    );
}

export { NumberCautivaInput };
