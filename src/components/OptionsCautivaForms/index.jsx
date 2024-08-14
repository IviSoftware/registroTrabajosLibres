import { useState } from 'react';
import { ContainerElementForm } from '../ContainerElementForm';
import { OptionCautivaCheck } from '../atomos/OptionCautivaCheck';

function OptionsCautivaForms({ text, options, setDataModule, dataModule, name }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);

        // Actualizar el estado de dataModule con la opción seleccionada
        const updatedData = { ...dataModule };
        updatedData[name] = value; // Usa el nombre pasado por props para actualizar el valor
        setDataModule(updatedData);
    };

    return (
        <ContainerElementForm>
            <label className="TextTitleFormComponent">{text}</label>

            {options.map((opt, index) => (
                <OptionCautivaCheck 
                    key={index} // Asegúrate de agregar una clave única para cada elemento en el map
                    name={name} // Asegúrate de que todos los radios tengan el mismo nombre
                    type="radio"
                    value={opt}
                    label={opt}
                    checked={selectedOption === opt} 
                    onChange={handleOptionChange}
                />
            ))}
        </ContainerElementForm>
    );
}

export { OptionsCautivaForms };
