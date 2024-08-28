import { useState } from "react";
import { InputCautivaForms } from "../../components/InputCautivaForms";
import { InputWithOutText } from "../../components/atomos/InputWithoutText";
import { RiSurveyFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import { Navbar } from '../../components/Navbar';
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { validateUser } from "../../services/userService";
import { json } from "react-router-dom";
import { CorrectQuestSend } from "../CorrectQuestSend";
import { CSSTransition, TransitionGroup } from 'react-transition-group';


function WelcomeQuests({ setQuestState, setQuestType }) {
    const [email, setEmail] = useState('');

    return (
        <div>
            <Navbar />

            <div className="flex items-center justify-center" style={{ maxWidth: "550px", margin: "0 auto" }} >
                <div className="text-center p-6">

                    <p className="text-lg mb-8 mt-4 apple-subtitle-animation">
                        <b>Ingrese su correo electronico para continuar</b>
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

                                /*  const response = await validateUser(email);
 
                                 console.log(response,'response');
                                 if(response.message === 'No se encontraron datos para el correo proporcionado.'){
                                 
                                     Swal.fire({
                                         title:"Parece que aún no estás registrado. Para poder hacer la encuesta, primero necesitas registrarte. ",
                                         text:"Si no es el caso, estamos en soporte para asistirte.",
                                         icon:"info"
                                     })
                                 
                                 }else if(response.message === 'Datos del usuario obtenidos exitosamente.'){
                                     //guardamos el meta data
                                     console.log('response.data',response.data)
                                     localStorage.setItem('metadataUser',JSON.stringify(response.data.metadaData));
 
                                     //Validariamos si ya contesto la encuesta
 
                                     if(response.data.slugEncuestaContestada){
                                         Swal.fire({
                                             title: "¡Parece que ya has enviado tus respuestas! 😊",
                                             icon: "info",
                                             html: `Puedes acceder a tu constancia <a href="https://constancias.integrameetings.com/cnd/2024/congreso/sesion.php?correo=${email}" target="_blank">aquí</a>.`,
                                             confirmButtonText: "Cerrar"
                                         });
                                     }else{
 
                                         localStorage.setItem('idAsistenteDiabetes',response.data.idAsistente)
                                         localStorage.setItem('emailAsistente',response.data.correo)
                                         localStorage.setItem('emailQuests', email)
                                         localStorage.setItem('nombreAsistente', `${response.data.nombre} ${response.data.nombre}`)
                                         localStorage.setItem('telefonoAsistente', response.data.metadaData.telefono);
                                         localStorage.setItem('estadoProcedenciaAsistente', response.data.metadaData.estado);
                                         
                                         setQuestType('questOne');
                                         setQuestState("questStarting")
                                        
                                     }
                                 }else{
                                     Swal.fire({
                                         title:"Parece que ocurrio un error",
                                         text:`mande captura a soporte para ayudarle, código de error: ${response.message}`,
                                         icon:"error"
                                     })
                                 } */


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
        </div>
    )
}


export { WelcomeQuests }