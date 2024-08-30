import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './CorrectQuestSend.css';
import { resendEmail } from '../../services/userService';

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
                    <b>¡Fantástico 🎉,  ya eres parte de la Convención Batres 2024! </b>
                    <br/><br/>
                    <span style={{fontSize:"17px"}}>Recibirás un correo con toda la información de tu registro.</span><br/>
                    <span style={{fontSize:"13px"}}>*En caso de no recibir el correo, revisa tu bandeja de spam o correo no deseado.</span>
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
                    className="px-4 py-2  text-black rounded shadow-md  focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    style={{background:"#00A3D3",color:"white"}}
                    onClick={()=>{
                        const email = localStorage.getItem('emailQuests')
                        resendEmail(email)
                    }}
                >
                    Reenviar correo de confirmacíón
                </button>
            </div>
        </div>
    );
}

export { CorrectQuestSend };
