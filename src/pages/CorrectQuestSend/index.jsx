import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './CorrectQuestSend.css';

function CorrectQuestSend() {
    const [inProp, setInProp] = useState(true);

    const handleReload = () => {
        window.location.reload(); // Recarga la página
    };

    const handleConstancia = () => {
        // Aquí puedes agregar la lógica para lo que debería hacer el botón de "Constancia"
        const emailUser = localStorage.getItem('emailAsistente')
        location.href=`https://constancias.integrameetings.com/cnd/2024/congreso/sesion.php?correo=${emailUser}`
        // Ejemplo: abrir un enlace o descargar un archivo
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <CSSTransition
                in={inProp}
                timeout={500}
                classNames="scale-fade"
                appear
            >
                <img
                    alt="Ilustración de éxito"
                    src="/img/illustrationsQuestReady.png"
                    className="illustration"
                />
            </CSSTransition>
            <CSSTransition
                in={inProp}
                timeout={700}
                classNames="fade-up"
                appear
            >
                <p className="mt-6 text-center text-content">
                    <b>¡Perfecto! Hemos recibido tus respuestas, gracias por tomarte el tiempo de contestar.</b>
                </p>
            </CSSTransition>
            <div className="mt-8 flex space-x-4">
                <button 
                    className="px-4 py-2 bg-gray-100 text-black rounded shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    onClick={handleReload}
                >
                    Cerrar
                </button>
                <button 
                    className="px-4 py-2 bg-gray-100 text-black rounded shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    onClick={handleConstancia}
                >
                    Constancia
                </button>
            </div>
        </div>
    );
}

export { CorrectQuestSend };
