import { useState } from "react";

function OptionsScale({ name, label, setDataModule, dataModule }){
    const [selectedValue, setSelectedValue] = useState(null);

    const handleClick = (value) => {
        setSelectedValue(value);

        // Actualizar el estado de dataModule con el valor seleccionado
        const updatedData = { ...dataModule };
        updatedData[name] = value;
        setDataModule(updatedData);
    };

    return (
        <div className="flex flex-col items-start space-y-2">
            <span className="text-[#333333] font-medium mb-4 TextTitleFormComponent">{label}</span>
            <div className="flex space-x-2 flex-wrap gap-6 justify-center">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => handleClick(value)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                            selectedValue === value
                                ? 'bg-[#0E4D90] text-white'
                                : 'bg-[#F5F4F7] text-[#333333]'
                        }`}
                    >
                        {value}
                    </button>
                ))}
            </div>
        </div>
    );
}

export {OptionsScale}