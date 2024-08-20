import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './CorrectQuestSend.css'

function CorrectQuestSend() {
    const [inProp, setInProp] = useState(true);

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
        </div>
    );
}

export { CorrectQuestSend };
