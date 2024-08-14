import { useState } from "react";
import { InputCautivaForms } from "../../components/InputCautivaForms";
import { InputWithOutText } from "../../components/atomos/InputWithoutText";
import { RiSurveyFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import { Navbar } from '../../components/Navbar';
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";


function WelcomeQuests({ setQuestState,setQuestType }) {
    const [email, setEmail] = useState('');

    return (
        <>
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
                    <InputWithOutText text="Introduzca su correo" name="email" onChange={e => {
                        setEmail(e.target.value);
                    }} />

                    <CautivaBtnForm onClick={() => {
                        if (email === '') {
                            Swal.fire("¡Por favor, introduzca un correo!");
                        } else {
                            console.log(email)
                            localStorage.setItem('emailQuests', email)
                            setQuestState("questStarting")
                            //validariamos el tipo de encuesta a activarse
                            setQuestType('questOne')
                        }
                    }}
                    text="Comenzar"
                    >
                         <RiSurveyFill className="btnIcon" />
                    </CautivaBtnForm>
                </div>
            </div>
        </>
    )
}


export { WelcomeQuests }