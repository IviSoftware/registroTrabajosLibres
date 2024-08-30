import './InputPhoneNumber.css';
import { useState, useEffect } from 'react';
import { ContainerElementForm } from '../../ContainerElementForm';
import InputMask from 'react-input-mask';

function NumberCautivaInput({ text, name, setDataModule, dataModule, valueUser, data, ladaUser, setLadaUser }) {
    const [phoneNumber, setPhoneNumber] = useState(valueUser || '');
    const [lada, setLada] = useState(ladaUser || '');

    const sendToStageApi = () => {
        const updatedData = { ...dataModule };
        // Enviar lada y teléfono por separado
        updatedData[name] = phoneNumber;
        updatedData['lada'] = lada;
        setDataModule(updatedData);
    };

    useEffect(() => {
        if (valueUser) {
            setPhoneNumber(valueUser);
        }

        // Asignar la lada desde los datos si es necesario
        const index = data.findIndex(item => item.name === dataModule.pais);
        if (index !== -1) {
            setLadaUser(data[index].lada); // Ajusta según tu estructura de datos
        }
    }, [valueUser, data, dataModule.pais, setLadaUser]);

    const handleLadaChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
        setLada(value);
        setLadaUser(value); // Actualiza el estado de la lada
    };

    const handlePhoneChange = (e) => {
        if (valueUser) return; // No permitir cambios si valueUser está presente

        const value = e.target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
        setPhoneNumber(value);
    };

    // Llamar a sendToStageApi cada vez que lada o phoneNumber cambian
    useEffect(() => {
        sendToStageApi();
    }, [lada, phoneNumber]);

    return (
        <ContainerElementForm>
            <label className='TextTitleFormComponent'>{text}</label>
            <div className="input-container flex gap-2">
                <input
                    className="lada-input"
                    type="text"
                    value={lada}
                    onChange={handleLadaChange}
                    placeholder="Lada"
                    style={{ width: "50px" }}
                    disabled={!!valueUser} // Deshabilitar el input si valueUser está presente
                />
                <InputMask
                    mask="999 999 9999" // Máscara para el número de teléfono sin lada
                    maskChar={null} // No muestra ningún carácter por defecto, solo permite números
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Número de teléfono"
                    disabled={!!valueUser} // Deshabilitar el input si valueUser está presente
                >
                    {(inputProps) => <input {...inputProps} name={name} type="text" />}
                </InputMask>
            </div>
        </ContainerElementForm>
    );
}

export { NumberCautivaInput };
