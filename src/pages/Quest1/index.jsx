import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { validateObjectFields, getBasicData } from "../../utils";
import { ContainerQuest } from "../../components/ContainerQuest"
import { InputCautivaForms } from "../../components/InputCautivaForms"
import { CautivaBtnForm } from "../../components/atomos/CautivaBtnForm";
import { GrFormNext } from "react-icons/gr";
import { CorrectQuestSend } from "../CorrectQuestSend";

import { getCountries } from "../../services/countriesService";
import { CautivaSelect } from "../../components/atomos/CautivaSelect";
import Confetti from 'react-confetti';
import CautivaLoader from "../../components/atomos/CautivaLoader";
import { NumberCautivaInput } from "../../components/atomos/NumberCautivaInput";
import { getSucursales, getDepartamentos } from "../../services/storesService";
import { sendRegister } from "../../services/userService";
import { Footer } from "../../components/Footer";
import { OptionsCautivaForms } from '../../components/OptionsCautivaForms'
import { TextCautiva } from "../../components/atomos/TextCautiva";
import { UploadFile } from "../../components/atomos/UploadFile";
import { CoauthorStage } from "../../components/organismos/CoauthorStage";


function Quest1() {
  const [percentageState, setPercentageState] = useState(10);
  const [dataModule, setDataModule] = useState([]);
  const [stage, setStage] = useState(1)
  const [sendingData, setSendingData] = useState(false)

  /*     const {  fullName,estadoProcedenciaAsistente } = getBasicData() */


  const keysToValidate1 = ["participacion"];
  const keysTraduction1 = ["participacion"];

  const keysToValidate2 = ["modulo"];
  const keysTraduction2 = ["Categoria"];

  const keysToValidate3 = ["nombre", "apellidos", "hospital","telefono"];
  const keysTraduction3 = ["nombre", "apellidos", "institución","telefono"];

  const keysToValidate4 = ["titulo"];
  const keysTraduction4 = ["titulo del trabajo libre"];
  
  const keysToValidate5 = ["resumenTrabajo"];
  const keysTraduction5 = ["resumen Trabajo"]; 


  const [errorApiGet, setErrorApiGet] = useState(false)
  const [typeError, setTypeError] = useState("");

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [countries, setCountries] = useState([])


  const email = localStorage.getItem('emailQuests')
  const [ladaUser, setLadaUser] = useState('+52')

  const [sucursales, setSucursales] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);


  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const contriesApi = async () => {
    const json = await getCountries();
    const data = json.map(item => {
      return {
        name: item.name.common,
        lada: item.idd.suffixes ? item.idd.root + item.idd.suffixes[0] : item.idd.root
      }
    })

    setCountries(data)
  }

  useEffect(() => {
    contriesApi()

    // Cargar las sucursales
    getSucursales().then((data) => {
      setSucursales(data);
    });

    // Cargar los departamentos
    getDepartamentos().then((data) => {
      setDepartamentos(data);
    });
  }, [])

  const sendDataToAPI = async () => {
    setSendingData(true)
    const response = await sendRegister(dataModule);
    setSendingData(false)
    if (!response.status == '200') {
      setErrorApiGet(true)
    }

  }

  const [mailError, setMailError] = useState(false)

  const verifyMail = (data) => {

    if (email !== data.adicionalConfirmarCorreo) {
      setMailError(true)
    } else {
      setMailError(false)
    }
  }



  return (
    <ContainerQuest percentageState={percentageState}>
      {(stage === 1 || stage === 2 || stage === 3) && <>
        <h1 className="mb-0">Bienvenido(a) <span className="wave-emoji">👋</span></h1>
        <p className="mt-0 mb-4">Llene el formulario que se muestra a continuación para subír su trabajo.</p>
      </>}


      {(stage === 5 || stage === 6 || stage === 7) && <>
        <h1 className="mb-0">¡Ya casi estamos <span className="pop-emoji">👌</span>!</h1>
        <p className="mt-0 mb-4">Llene el formulario que se muestra a continuación para subír su trabajo.</p>
      </>}

      {/*       {stage === 3 && <>
        <h1 className="mb-0">Verifiquemos 🧐</h1>
        <p className="mt-0 mb-4">Revise que sus datos sean correctos; en caso de que no, corríjalos.</p>
      </>} */}


      {stage === 1 && <div className="w-full flex flex-col gap-6">

        <p>La modalidad de la presentación de los trabajos libres será definida
          por la Comisión de Trabajos libres.</p>

        <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule}
          text="Modalidad de presentación"
          options={['Presentación oral', 'Poster tradicional', 'Rapid-Fire', 'Caso clínico (reporte de caso)', 'Sin preferencia']}
          name="participacion"
        />

        {dataModule.participacion === 'Presentación oral' && <p>
          Los trabajos aceptados también tendrán la opción de ser presentados como pósteres en la zona principal de exhibiciones. <br /><br />

          Aquí, los autores podrán mostrar una versión digital de su trabajo, lo que permitirá una interacción cercana con los asistentes interesados en su investigación. <br /><br />

          Tendrán la oportunidad de estar presentes junto a sus pósteres para responder preguntas y debatir con los asistentes. <br /><br />

          Los trabajos que obtengan una calificación destacada por parte del comité de revisores tendrán la oportunidad de realizar una presentación oral durante sesiones específicas del congreso. <br /><br />

          Cada presentación tendrá una duración adecuada para profundizar en los detalles del estudio y sus resultados. <br /><br />

          Esta modalidad permitirá una mayor interacción con la audiencia y facilitará el intercambio de ideas entre los autores y los asistentes al congreso. <br /><br />

          El autor contará con un tiempo total de 10 minutos, de los cuáles, 8 minutos estarán destinados a la presentación de su trabajo y 2 minutos destinados a las preguntas de la audiencia. El formato de presentación será libre. <br /><br />

          Además, para los trabajos seleccionados en esta modalidad, nuestro equipo de visuales y redes sociales creará un visual abstract atractivo para resaltar la relevancia y los hallazgos más significativos de su investigación, para su divulgación en nuestras redes sociales y plataformas virtuales. <br /><br />

          Esta divulgación adicional en redes sociales permitirá alcanzar una mayor audiencia y promoverá la difusión de su trabajo en la comunidad nefrológica. <br /><br />

          NOTA: Presentación Oral de Trabajos de Nefrología Intervencionista (Videos): Los trabajos seleccionados para presentación oral de la categoría de Nefrología Intervencionista deberán de incluir un video didáctico de presentación del caso de una duración no mayor a 3 minutos. <br /><br />
          <hr className="mb-4"></hr>
          <b>Agradecemos su dedicación y compromiso con la investigación en nefrología y esperamos contar con su valiosa contribución en el Congreso Internacional en Nefrología IMIN 2023, en Acapulco.</b> <br /><br />

          <span className="text-center block">
            Atentamente, <br /><br />

            Comité Organizador del Congreso Internacional en Nefrología IMIN 2024.
          </span>
        </p>}
        {dataModule.participacion === 'Poster tradicional' && <p>
          Los trabajos aceptados también tendrán la opción de ser presentados como pósteres en la zona principal de exhibiciones. <br /><br />

          Aquí, los autores podrán mostrar una versión digital de su trabajo, lo que permitirá una interacción cercana con los asistentes interesados en su investigación. <br /><br />

          Tendrán la oportunidad de estar presentes junto a sus pósteres para responder preguntas y debatir con los asistentes. <br /><br />
          <hr className="mb-4"></hr>
          <b>Agradecemos su dedicación y compromiso con la investigación en nefrología y esperamos contar con su valiosa contribución en el Congreso Internacional en Nefrología IMIN 2023, en Acapulco.</b> <br /><br />

          <span className="text-center block">
            Atentamente, <br /><br />

            Comité Organizador del Congreso Internacional en Nefrología IMIN 2024.
          </span>
        </p>}
        {dataModule.participacion === 'Rapid-Fire' && <p>
          Los trabajos seleccionados para esta modalidad tendrán la oportunidad de realizar una presentación "Rapid Fire" durante los horarios designados en la zona de pósters. Cada presentación será breve, de 4 a 5 minutos, y se realizará en una pantalla digital. Esta opción permitirá una vista previa dinámica de los resultados y fomentará el interés de los asistentes. <br /><br />
          <hr className="mb-4"></hr>
          <b>Agradecemos su dedicación y compromiso con la investigación en nefrología y esperamos contar con su valiosa contribución en el Congreso Internacional en Nefrología IMIN 2023, en Acapulco.</b> <br /><br />

          <span className="text-center block">
            Atentamente, <br /><br />

            Comité Organizador del Congreso Internacional en Nefrología IMIN 2024.
          </span>
        </p>}
        {dataModule.participacion === 'Caso clínico (reporte de caso)' && <p>
          Los trabajos aceptados también tendrán la opción de ser presentados como pósteres en la zona principal de exhibiciones. <br /><br />

          Aquí, los autores podrán mostrar una versión digital de su trabajo, lo que permitirá una interacción cercana con los asistentes interesados en su investigación. <br /><br />

          Tendrán la oportunidad de estar presentes junto a sus pósteres para responder preguntas y debatir con los asistentes. <br /><br />
          <hr className="mb-4"></hr>
          <b>Agradecemos su dedicación y compromiso con la investigación en nefrología y esperamos contar con su valiosa contribución en el Congreso Internacional en Nefrología IMIN 2023, en Acapulco.</b> <br /><br />

          <span className="text-center block">
            Atentamente, <br /><br />

            Comité Organizador del Congreso Internacional en Nefrología IMIN 2024.
          </span>
        </p>}
        {dataModule.participacion === 'Sin preferencia' && <p>
          Los trabajos aceptados también tendrán la opción de ser presentados como pósteres en la zona principal de exhibiciones. <br /><br />

          Aquí, los autores podrán mostrar una versión digital de su trabajo, lo que permitirá una interacción cercana con los asistentes interesados en su investigación. <br /><br />

          Tendrán la oportunidad de estar presentes junto a sus pósteres para responder preguntas y debatir con los asistentes. <br /><br />

          <hr className="mb-4"></hr>

          <b>Agradecemos su dedicación y compromiso con la investigación en nefrología y esperamos contar con su valiosa contribución en el Congreso Internacional en Nefrología IMIN 2023, en Acapulco.</b> <br /><br />

          <span className="text-center block">
            Atentamente, <br /><br />

            Comité Organizador del Congreso Internacional en Nefrología IMIN 2024.
          </span>
        </p>}




        <CautivaBtnForm text="Siguiente" onClick={() => {

          console.log('dataModule', dataModule)

          const response = validateObjectFields(dataModule, keysToValidate1, keysTraduction1);

          if (mailError) {
            Swal.fire({
              title: "Los correos no coinciden",
              icon: "info"
            });
          } else {
            if (response.validate === 0) {
              Swal.fire({
                title: "Faltan por rellenar",
                text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
                icon: "info"
              });
            } else if (response.validate === 4) {
              Swal.fire({
                title: "Por favor coloque una edad valida",
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

          }
        }}>
          <GrFormNext className="btnIcon" />
        </CautivaBtnForm>
      </div>}


      {stage === 2 && <div className="w-full flex flex-col gap-6">

        <OptionsCautivaForms setDataModule={setDataModule} dataModule={dataModule}
          text="Categoría*"
          options={['Nefropediatría', 'Nefropatología', 'Líquidos y electrolitos', 'Ciencias básicas', 'Enfermedad renal diabética', 'Hipertension', 'Metabolismo mineral', 'Enfermedad renal crónica', 'Diálisis peritoneal', 'Hemodiálisis', 'Transplante renal', 'Lesión renal aguda', 'Enfermedades glomerulares', 'Nefrología intervencionista']}
          name="modulo"
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
            setPercentageState(30)

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

        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Nombre(s)" name="nombre" />
        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Apellidos" name="apellidos" />
        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Institución y servicio a la que pertenece*" name="hospital" />


        <CautivaSelect title="País*" name="pais" data={countries} type="country" setDataModule={setDataModule} dataModule={dataModule} setLadaUser={setLadaUser} />


        <NumberCautivaInput text="Telefono" name="telefono" setDataModule={setDataModule} dataModule={dataModule} data={countries} ladaUser={ladaUser} setLadaUser={setLadaUser} />


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
            setPercentageState(50)

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


      {stage === 4 && <div className="w-full flex flex-col gap-6">


        <p>Información Adicional <br /><br />
          <hr className="mb-4"></hr>
          Los resúmenes deberán ser escritos en español y contener los resultados de trabajos originales. Deberá ser enviado en formato de archivo Word con Tipo de letra Times New Roman tamaño 12 pt. Le recordamos que la plataforma de envío de trabajos SOLO ACEPTA el formato de archivo Word.<br /><br />

          Es muy importante definir correctamente al PRIMER AUTOR del trabajo durante el proceso de registro en la plataforma. En caso de que el trabajo sea seleccionado para su presentación en el congreso, esta persona (primer autor) será la única que recibirá el apoyo de beca por parte del IMIN.<br /><br />

          La estructura del trabajo deberá ser la siguiente:<br /><br />

          Título breve en MAYÚSCULAS, negritas y sin subrayar. Deberá tener un máximo de 180 palabras. No deberá incluir abreviaturas ni símbolos.<br /><br />
          Nombre y apellidos completos del primer autor y los coautores. Primera letra del nombre(s) y apellidos deberán ser en mayúscula y el resto en minúsculas.<br /><br />
          Institución y servicio a la que pertenece cada uno de los autores, referenciados con números subíndices consecutivos en el nombre de los autores.<br /><br />

          <hr className="mb-4"></hr>
          <b>Agradecemos su dedicación y compromiso con la investigación en nefrología y esperamos contar con su valiosa contribución en el Congreso Internacional en Nefrología IMIN 2023, en Acapulco.</b> <br /><br />

          <span className="text-center block">
            Atentamente, <br /><br />

            Comité Organizador del Congreso Internacional en Nefrología IMIN 2024.
          </span>
        </p>


        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="textRestrict" text="Título del trabajo libre*" name="titulo" />
        <p className="text-red-400">Título breve en MAYÚSCULAS. <br />
          Deberá tener un máximo de 180 palabras. <br />
          No deberá incluir abreviaturas ni símbolos. <br />
        </p>


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
            setPercentageState(60)

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



      {stage === 5 && <div className="w-full flex flex-col gap-6">



        <TextCautiva setDataModule={setDataModule} dataModule={dataModule} type="text" text="Resumen del Trabajo*" name="resumenTrabajo" />
        <p className="text-red-400">El resumen deberá ser escrito en español y contener los resultados de trabajos originales.
        </p>



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
            setPercentageState(70)

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


      {stage === 6 && <div className="w-full flex flex-col gap-6">

        <CautivaBtnForm text="Ver intrucciones para autores" onClick={() => null} />

        <p><b>Archivo de trabajo libre</b></p>
        <UploadFile />
        <p className="text-red-400">
          Solamente se permiten archivos en formato de Word para subir tu trabajo.
          Deberá ser enviado en formato de archivo Word con Tipo de letra Times New Roman tamaño 12 pt. Le recordamos que la plataforma de envío de trabajos SOLO ACEPTA el formato de archivo Word.
        </p>


        <p><b>Archivo de no autor</b></p>
        <UploadFile />
        <p className="text-red-400">
          Subir el archivo sin los nombres de los autores  en formato Word.
        </p>





        <CautivaBtnForm text="Continuar" onClick={() => {
           setStage(7)
           setPercentageState(95)
          //const response = validateObjectFields(dataModule, keysToValidate1, keysTraduction1);
        /*   if (response.validate === 0) {
            Swal.fire({
              title: "Faltan por rellenar",
              text: `Los siguientes campos están vacíos: ${response.fields.join(', ')}`,
              icon: "info"
            });
          } else if (response.validate == 1) {
            setStage(7)
            setPercentageState(95)

            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            Swal.fire({
              title: "Por favor rellene todos los campos",
              icon: "info"
            });
          } */

        }}>
          <GrFormNext className="btnIcon" />
        </CautivaBtnForm>
      </div>}



      {stage === 7 && <div className="w-full flex flex-col gap-6">
        <CoauthorStage setDataModule={setDataModule} dataModule={dataModule} setStage={setStage} setPercentageState={setPercentageState} />      
      </div>}



   {/*    {sendingData && <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-6">
          <CautivaLoader />
        </div>
      </div>}
 */}
      {
        errorApiGet && <>
          <p>Ocurrio un error , contacte a soporte </p>
        </>
      }


      {(stage === 8 && !sendingData && !errorApiGet) && <div className="w-full flex flex-col gap-6">
        <Confetti

          recycle={false}  // Confeti se lanza una sola vez
        />
        <CorrectQuestSend />

      </div>}



    </ContainerQuest>
  )
}


export { Quest1 }