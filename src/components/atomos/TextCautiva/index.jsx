import './TextCautiva.css';
import { useState, useEffect, useRef } from 'react';
import { ContainerElementForm } from '../../ContainerElementForm';

function TextCautiva({ text, name, setDataModule, dataModule, valueUser }) {
    const [inputValue, setInputValue] = useState(valueUser || '');
    const hasInitialized = useRef(false);

    const saveContent = (value) => {
        const updatedData = { ...dataModule, [name]: value };
        setDataModule(updatedData);
        console.log('Contenido guardado:', updatedData);
    };

    useEffect(() => {
        if (valueUser && !hasInitialized.current) {
            saveContent(valueUser);
            hasInitialized.current = true;
        }
    }, [valueUser]);

    const handleInputChange = (e) => {
        if (valueUser) return; // No permitir cambios si valueUser está presente
        setInputValue(e.target.value);
        saveContent(e.target.value);
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
        </ContainerElementForm>
    );
}

export { TextCautiva };
