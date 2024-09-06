import { useEffect } from "react";

const CautivaSelect = ({ title, name, data, type, setDataModule, dataModule, setLadaUser }) => {
    useEffect(() => {
        if (data.length > 0 && type === 'country') {
            const defaultCountry = data.find(item => item.name === 'Mexico') || data[0];
            // Solo inicializa si no hay un país seleccionado ya en dataModule
            if (!dataModule.pais) {
                updateDataModule(defaultCountry.name, defaultCountry.lada);
            }
        }
    }, [data, type]);

    const updateDataModule = (nameValue, ladaValue = null) => {
        const updatedData = { ...dataModule, [name]: nameValue, pais: nameValue };

        // Actualizar la lada solo si es de tipo 'country'
        if (type === 'country' && ladaValue) {
            setLadaUser(ladaValue);
        }

        setDataModule(updatedData);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (!value || value === "Seleccione") return;

        const selectedItem = data.find(item => item.name === value || item === value);

        if (selectedItem) {
            updateDataModule(selectedItem.name, selectedItem.lada);
        }
    };

    return (
        <>
            <label className="TextTitleFormComponent">{title}</label>
            <select
                className="p-2 rounded-md"
                name={name}
                onChange={handleInputChange}
                value={dataModule.pais || 'Mexico'}
            >
                {type !== 'country' && <option value="Seleccione">Seleccione</option>}
                {data.map(item => (
                    <option
                        key={item.name || item}
                        value={item.name || item}
                    >
                        {item.name || item}
                    </option>
                ))}
            </select>
        </>
    );
};

export { CautivaSelect };
