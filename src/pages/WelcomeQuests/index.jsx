import { useState } from "react";
import { InputCautivaForms } from "../../components/InputCautivaForms";
import { InputWithOutText } from "../../components/atomos/InputWithoutText";
import { RiSurveyFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import { Navbar } from '../../components/Navbar';
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { validateUser } from "../../services/userService";


function WelcomeQuests({ setQuestState,setQuestType }) {
    const [email, setEmail] = useState('');

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center" style={{ maxWidth: "550px", margin: "0 auto" }} >
                <div className="text-center p-6">
                    <h1 className="text-3xl font-bold mt-12 mb-8" >
                        ¡Bienvenido(a) a la Encuesta del
                        XXXIII Congreso Nacional de Diabetes!
                    </h1>
                    <p className="text-lg mb-8">
                        Estamos encantados de que participes en nuestra encuesta. Tus respuestas son muy valiosas para nosotros.
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
                                setQuestState("questStarting")
                                //Validariamos el tipo de encuesta a activarse
                                //Validariamos si ya contesto la encuesta
                                setQuestType('questOne')

                              /*   const response = await validateUser(email);
                                console.log(response);
                                if(response.user === 'Error obteniendo usuario'){
                                    Swal.fire({
                                        title:"Parece que aún no estás registrado. Para poder hacer la encuesta, primero necesitas registrarte. ",
                                        text:"Si no es el caso, estamos en soporte para asistirte.",
                                        icon:"info"
                                    })
                                }else{
                                    localStorage.setItem('emailQuests', email)
                                    setQuestState("questStarting")
                                    setQuestType('questOne')
                                } */
                            }
                        }
                    }}
                    text="Comenzar"
                    >
                         <RiSurveyFill className="btnIcon" />
                    </CautivaBtnForm>
                </div>
            </div>
        </div>
    )
}


export { WelcomeQuests }