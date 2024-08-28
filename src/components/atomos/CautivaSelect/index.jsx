import { useEffect } from "react";

const CautivaSelect = ({ title, name, data, type, setDataModule, dataModule, setLadaUser }) => {
    useEffect(() => {
        if (data.length > 0) {
            // Manejo específico para tipo 'country'
            if (type === 'country') {
                const defaultCountry = data.find(item => item.name === 'Mexico') || data[0];
                updateDataModule(defaultCountry.name, defaultCountry.lada);
            } else {
                // Asignar por defecto el primer elemento para otros tipos si se requiere
                const defaultItem = data[0];
                updateDataModule(defaultItem);
            }
        }
    }, [data, type]);

    const updateDataModule = (nameValue, ladaValue = null) => {
        // Actualizar el estado del módulo de datos de forma dinámica según el tipo
        const updatedData = { ...dataModule, [name]: nameValue };

        // Manejar campos adicionales específicamente para 'country'
        if (type === 'country' && ladaValue) {
            updatedData.extraPais = nameValue;
            setLadaUser(ladaValue); // Actualizar lada solo si es de tipo 'country'
        }

        setDataModule(updatedData);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
    
        // Añadir esta línea para asegurar que "Seleccione" no actualice el estado
        if (value === "Seleccione" || !value) return;
    
        const selectedItem = data.find(item => item.name === value || item === value);
    
        if (selectedItem) {
            if (type === 'country') {
                updateDataModule(selectedItem.name, selectedItem.lada);
            } else {
                updateDataModule(selectedItem); // Asigna directamente el valor si no es 'country'
            }
        }
    };
    

    return (
        <>
            <label className="TextTitleFormComponent">{title}</label>
            <select className="p-2 rounded-md" name={name} onChange={handleInputChange}>
                {/* Opción "Seleccione" solo para selects que no son de tipo 'country' */}
                {type !== 'country' && <option value="Seleccione">Seleccione</option>}
                {data.map(item => (
                    <option 
                        key={item.name || item} 
                        value={item.name || item} 
                        selected={(type === 'country' && item.name === dataModule.extraPais) || item === dataModule[name]}>
                        {item.name || item}
                    </option>
                ))}
            </select>
        </>
    );
};

export { CautivaSelect };
