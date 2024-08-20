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
        console.log('Constancia button clicked');
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
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleReload}
                >
                    Cerrar
                </button>
                <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleConstancia}
                >
                    Constancia
                </button>
            </div>
        </div>
    );
}

export { CorrectQuestSend };
