import { useState } from "react";
import { InputCautivaForms } from "../../components/InputCautivaForms";
import { InputWithOutText } from "../../components/atomos/InputWithoutText";
import { RiSurveyFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import { Navbar } from '../../components/Navbar';
import { Footer } from "../../components/Footer";
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { validateUser } from "../../services/userService";
import { json } from "react-router-dom";
import { CorrectQuestSend } from "../CorrectQuestSend";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { verifyEmail,resendEmail } from "../../services/userService";


function WelcomeQuests({ setQuestState, setQuestType }) {
    const [email, setEmail] = useState('');

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center" style={{ maxWidth: "550px", margin: "0 auto" }} >
                <div className="text-center p-6 w-full" style={{maxWidth:"600px"}}>

                    <p className="text-lg mb-8 mt-4 apple-subtitle-animation">
                        
                        <b>Registro Trabajos Libres</b>
                    </p>
                    <InputWithOutText text="Introduzca su correo" name="email" type="email" onChange={e => {
                        setEmail(e.target.value);
                    }} />

                    <CautivaBtnForm onClick={async () => {
                        if (email === '') {
                            Swal.fire("¡Por favor, introduzca un correo!");
                        } else {
                            console.log(email)

                            // Expresión regular para validar el formato del email
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                            if (!emailRegex.test(email)) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Correo inválido',
                                    text: 'Por favor, introduzca un correo válido.',
                                });
                            } else {
                                localStorage.setItem('emailQuests', email)
                                setQuestType('questOne');
                                setQuestState("questStarting")
                            }
                        }
                    }}
                        text="Continuar"
                    >
                        <RiSurveyFill className="btnIcon" />
                    </CautivaBtnForm>
                </div>
            </div>

       x
        </div>
    )
}


export { WelcomeQuests }