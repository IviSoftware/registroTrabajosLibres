import React from 'react';

function SupportButton() {
    // Números de teléfono para WhatsApp
    const phoneNumbers = [
        '+5219531075704', // Reemplaza con el primer número
        '+522214064130'  // Reemplaza con el segundo número
    ];

    // Función para abrir WhatsApp con un número aleatorio
    const handleSupportClick = () => {
        const randomNumber = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
        window.open(`https://wa.me/${randomNumber}`, '_blank');
    };

    return (
        <button 
            onClick={handleSupportClick}
            className="fixed bottom-24 right-4  text-bl1ack font-bold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-50 transition-all duration-300 ease-in-out"
            style={{ zIndex: 1000,background:"#05EA78"}}  // Z-index alto para que se muestre encima de todo
        >
            Soporte
        </button>
    );
}

export { SupportButton };