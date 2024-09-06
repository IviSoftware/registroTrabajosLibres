import './InputPhoneNumber.css';
import { useState, useEffect } from 'react';
import { ContainerElementForm } from '../../ContainerElementForm';
import InputMask from 'react-input-mask';

function NumberCautivaInput({ text, name, setDataModule, dataModule, valueUser, data, ladaUser, setLadaUser }) {
    const [phoneNumber, setPhoneNumber] = useState(valueUser || '');
    const [lada, setLada] = useState(ladaUser || '');

    const sendToStageApi = () => {
        const updatedData = { ...dataModule };
        updatedData[name] = phoneNumber;
        updatedData['lada'] = lada;
        setDataModule(updatedData);
    };

    useEffect(() => {
        if (valueUser) {
            setPhoneNumber(valueUser);
        }
    }, [valueUser]);

    useEffect(() => {
        // Actualiza la lada solo si cambia el país seleccionado
        if (dataModule.pais) {
            const selectedCountry = data.find(item => item.name === dataModule.pais);
            if (selectedCountry) {
                const newLada = selectedCountry.lada || '+52';
                setLada(newLada);
                setLadaUser(newLada);
            }
        }
    }, [dataModule.pais, data, setLadaUser]);

    const handleLadaChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setLada(value);
        setLadaUser(value);
    };

    const handlePhoneChange = (e) => {
        if (valueUser) return;
        const value = e.target.value.replace(/\D/g, '');
        setPhoneNumber(value);
    };

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
                    disabled={!!valueUser}
                />
                <InputMask
                    mask="999 999 9999"
                    maskChar={null}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Número de teléfono"
                    disabled={!!valueUser}
                >
                    {(inputProps) => <input {...inputProps} name={name} type="text" />}
                </InputMask>
            </div>
        </ContainerElementForm>
    );
}

export { NumberCautivaInput };