import { useState,useEffect } from "react";
import Swal from 'sweetalert2'
import { validateObjectFields } from "../../utils";
import { ContainerQuest } from "../../components/ContainerQuest"
import { InputCautivaForms } from "../../components/InputCautivaForms"
import { OptionsCautivaForms } from "../../components/OptionsCautivaForms";
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { OptionsScale } from "../../components/atomos/OptionsScale";
import { GrFormNext } from "react-icons/gr";
import { TextAreaCautivaForms } from "../../components/atomos/TextAreaCautivaForms";
import { CorrectQuestSend } from "../CorrectQuestSend";
import Confetti from 'react-confetti';




function Quest1() {
    const [percentageState, setPercentageState] = useState(10);
    const [dataModule, setDataModule] = useState([]);
    const [stage, setStage] = useState(1)


    const keysToValidate1 = ["fullName", "age", "state", "extPerfil"];
    const keysTraduction1 = ["Nombre completo", "Edad", "Estado de procedencia", "Perfil"];
    
    const keysToValidate2 = ["extEspecialidad"];
    const keysTraduction2 = ["Especialidad"];
    
    const keysToValidate3 = ["extConsulta","extInstitucionTrabajo","extMedio","extKitAdecuado","extTransmicionAdecuada","extMediosAudioVisuales","extTemasAbordados"];
    const keysTraduction3 = ["Consulta","Institución de trabajo","Medio por el que se enteró del congreso","Kit adecuado","Transmición adecuada","Medios audiovisuales", "Temas abordados"];
    
    const keysToValidate4 = ["extNivelContenidos","extDistribucionActividades","extTiempoActividades","extSeleccionPonentes","extParticipacionPonentes","extPonentesComunicacion"];
    const keysTraduction4 = ["Nivel contenidos","Distribución actividades","Tiempo actividades","Seleccion de ponentes","Participación de ponentes","Ponentes comunicación"];
    
    const keysToValidate5 = ['extPonentesyActividades','plenariaInteresante1','plenariaInteresante2','extOrganizacionSatisfactoria','extSeleccionPonentes','extSatisfaccionAcademico','extRecomendariasCongreso'];
    const keysTraduction5 = ['Ponentes y actividades','Plenaria interesante 1','plenaria interteresante 2','organización satisfactoria','selección ponentes','satisfacción academico','recomendar congreso'];

    const keysToValidate6 = ['extObservaciones'];
    const keysTraduction6 = ['Observaciones'];

    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });


    useEffect(() => {
        const handleResize = () => {
          setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <ContainerQuest title="Encuesta de satisfacción Profesionales (Virtual)" percentageState={percentageState}>
            {stage === 1 && <div className="w-full flex flex-col gap-6">
                <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Nombre completo" name="fullName" />
                <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="number" text="Edad" name="age" max={3} />
                <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Estado de procedencia" name="state" />
                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} text="Perfil" options={['Profesional de la salud', 'Enfermera(o)', 'Estudiante']} name="extPerfil" />
                <CautivaBtnForm text="Continuar" onClick={() => {
                    const response = validateObjectFields(dataModule, keysToValidate1, keysTraduction1);
                    if (response.validate === 0) {
                        Swal.fire({
                            title: "Faltan por rellenar",
                            text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
                            icon: "info"
                        });
                    } else if (response.validate == 1) {
                        setStage(2)
                        setPercentageState(30)
                        console.log(dataModule)
                         // Hacer scroll hasta arriba de la pantalla
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        Swal.fire({
                            title: "Por favor rellene todos los campos",
                            icon: "info"
                        });
                    }

                }}>
                    <GrFormNext className="btnIcon" />
                </CautivaBtnForm>
            </div>}


            {stage === 2 && <div className="w-full flex flex-col gap-6">
               
                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                    text="Especialidad" 
                    options={['Nutrición','Medicina general','Odontología','Psicología','Optometría','Enfermería','Fisioterapeuta','Química/farmacobiología','Activador/Profesor de educación física','Podiatra/Podólogo','Medicina interna','Cardiología','Endocrinología','Ginecología','Nefrología','Oftalmología','Otro']} 
                    name="extEspecialidad" 
                />

                <CautivaBtnForm text="Continuar" onClick={() => {
                    const response = validateObjectFields(dataModule, keysToValidate2, keysTraduction2);
                    if (response.validate === 0) {
                        Swal.fire({
                            title: "Faltan por rellenar",
                            text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
                            icon: "info"
                        });
                    } else if (response.validate == 1) {
                        setStage(3)
                        setPercentageState(50)
                        console.log(dataModule)
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        Swal.fire({
                            title: "Por favor rellene todos los campos",
                            icon: "info"
                        });
                    }

                }}>
                    <GrFormNext className="btnIcon" />
                </CautivaBtnForm>
            </div>}

            {stage === 3 && <div className="w-full flex flex-col gap-6">
               
               <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="Consulta" 
                   options={['Pública','Privada','Ambas','No doy consulta']} 
                   name="extConsulta" 
               />


                <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Institución de trabajo" name="extInstitucionTrabajo" />


                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="Medio por el que se enteró del congreso" 
                   options={['Revista Diabetes Hoy','Redes sociales','Correo electrónico','Invitación directa']} 
                   name="extMedio" 
               />


                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="¿Consideras que el kit de congresista fue adecuado?" 
                   options={['Si','No']} 
                   name="extKitAdecuado" 
               />

                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="¿La transmisión de las ponencias fue adecuada?" 
                   options={['Si','No']} 
                   name="extTransmicionAdecuada" 
               />

                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="Los medios audiovisuales dentro de cada ponencia fueron adecuados y visibles en las transmisiones (pantallas, audios, presentaciones, etc.)" 
                   options={['Si','No']} 
                   name="extMediosAudioVisuales" 
               />
                
                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="¿Te parece que los temas abordados en el programa son de actualidad y necesarios para cumplir el objetivo del congreso?" 
                   options={['Si','No']} 
                   name="extTemasAbordados" 
               />

               <CautivaBtnForm text="Continuar" onClick={() => {
                   const response = validateObjectFields(dataModule, keysToValidate3, keysTraduction3);
                   if (response.validate === 0) {
                       Swal.fire({
                           title: "Faltan por rellenar",
                           text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
                           icon: "info"
                       });
                   } else if (response.validate == 1) {
                    setStage(4)
                    setPercentageState(70)
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                       console.log(dataModule)
                   } else {
                       Swal.fire({
                           title: "Por favor rellene todos los campos",
                           icon: "info"
                       });
                   }

               }}>
                   <GrFormNext className="btnIcon" />
               </CautivaBtnForm>
           </div>}

           {stage === 4 && <div className="w-full flex flex-col gap-6">
               
               <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="El nivel de los contenidos abordados ha sido" 
                   options={['Excelente','Muy bueno','Bueno','Regular','Malo']} 
                   name="extNivelContenidos" 
               />


                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="La distribución de actividades (ponencias y talleres) fue" 
                   options={['Adecuada','Saturada']} 
                   name="extDistribucionActividades" 
               />


                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="El tiempo asignado a cada una de las actividades (ponencias y talleres) fue" 
                   options={['Excelente','Bueno','Insuficiente']} 
                   name="extTiempoActividades" 
               />

                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="La selección de los ponentes fue" 
                   options={['Excelente','Muy buena','Buena','Mala','Indiferente']} 
                   name="extSeleccionPonentes" 
               />

                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="La participación de los ponentes fue" 
                   options={['Excelente','Muy buena','Buena','Mala','Muy mala']} 
                   name="extParticipacionPonentes" 
               />
                
                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="Crees que los ponentes proporcionaron una buena comunicación durante las actividades" 
                   options={['Si','No']} 
                   name="extPonentesComunicacion" 
               />

               <CautivaBtnForm text="Continuar" onClick={() => {
                   const response = validateObjectFields(dataModule, keysToValidate4, keysTraduction4);
                   if (response.validate === 0) {
                       Swal.fire({
                           title: "Faltan por rellenar",
                           text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
                           icon: "info"
                       });
                   } else if (response.validate == 1) {
                    setStage(5)
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setPercentageState(80)
                       console.log(dataModule)
                   } else {
                       Swal.fire({
                           title: "Por favor rellene todos los campos",
                           icon: "info"
                       });
                   }

               }}>
                   <GrFormNext className="btnIcon" />
               </CautivaBtnForm>
           </div>}

           {stage === 5 && <div className="w-full flex flex-col gap-6">
               
               <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="Consideras que los ponentes y actividades cumplieron los objetivos del programa" 
                   options={['Si','No']} 
                   name="extPonentesyActividades" 
               />

                <label className='TextTitleFormComponent'>Menciona al menos dos plenarias, simposios o talleres que te parecieron más interesantes del congreso</label>
                <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Plenaria 1" name="plenariaInteresante1" />
                <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Plenaria 2" name="plenariaInteresante2" />


                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="Consideras que la organización general del congreso ha sido satisfactoria" 
                   options={['Si','No']} 
                   name="extOrganizacionSatisfactoria" 
               />

                <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule} 
                   text="¿El congreso cumplió tus expectativas?" 
                   options={['Si','No','A medias']} 
                   name="extSeleccionPonentes" 
               />

                <OptionsScale
                 name="extSatisfaccionAcademico"
                 label="En una escala del 1 al 10 ¿Considera que el congreso cumplió con su objetivo académico?  ( donde, 1 no cumplió y 10 completamente )"
                 setDataModule={setDataModule}
                 dataModule={dataModule} 
                 />

                <OptionsScale
                 name="extRecomendariasCongreso"
                 label="Recomendarías a un familiar, amigo o colega asistir al Congreso Nacional de la Federación Mexicana de Diabetes, A.C. ( donde, 1 Definitivamente no y 10 Definitivamente si )"
                 setDataModule={setDataModule}
                 dataModule={dataModule} 
                 />

               <CautivaBtnForm text="Continuar" onClick={() => {
                   const response = validateObjectFields(dataModule, keysToValidate5, keysTraduction5);
                   if (response.validate === 0) {
                       Swal.fire({
                           title: "Faltan por rellenar",
                           text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
                           icon: "info"
                       });
                   } else if (response.validate == 1) {
                        setStage(6)
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setPercentageState(95)
                       console.log(dataModule)
                   } else {
                       Swal.fire({
                           title: "Por favor rellene todos los campos",
                           icon: "info"
                       });
                   }

               }}>
                   <GrFormNext className="btnIcon" />
               </CautivaBtnForm>
           </div>}


           {stage === 6 && <div className="w-full flex flex-col gap-6">
               
                <TextAreaCautivaForms 
                    text="Por favor, redacta tus observaciones y conclusiones del congreso" 
                    name="extObservaciones" 
                    max={500} 
                    setDataModule={setDataModule} 
                    dataModule={dataModule} 
                />


               <CautivaBtnForm text="Enviar encuesta" onClick={() => {
                   const response = validateObjectFields(dataModule, keysToValidate6, keysTraduction6);
                   if (response.validate === 0) {
                       Swal.fire({
                           title: "Faltan por rellenar",
                           text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
                           icon: "info"
                       });
                   } else if (response.validate == 1) {
                    setStage(7)
                    setPercentageState(100)
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                       console.log(dataModule)
                   } else {
                       Swal.fire({
                           title: "Por favor rellene todos los campos",
                           icon: "info"
                       });
                   }

               }}>
                   <GrFormNext className="btnIcon" />
               </CautivaBtnForm>
           </div>}


           {stage === 7 && <div className="w-full flex flex-col gap-6">
             <Confetti
                width={dimensions.width}
                height={dimensions.height}
                recycle={false}  // Confeti se lanza una sola vez
             />
             <CorrectQuestSend />
              
          </div>}

        </ContainerQuest>
    )
}


export { Quest1 }