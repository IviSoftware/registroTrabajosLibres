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


function Quest1() {
  const [percentageState, setPercentageState] = useState(10);
  const [dataModule, setDataModule] = useState([]);
  const [stage, setStage] = useState(1)
  const [sendingData, setSendingData] = useState(false)

  /*     const {  fullName,estadoProcedenciaAsistente } = getBasicData() */


  const keysToValidate1 = ["nombre", "apellido", "adicionalConfirmarCorreo", "pais", "estado"];
  const keysTraduction1 = ["Nombre(s)", "Apellidos", "País", "Estado"];

  const keysToValidate2 = ["telefono", "adicionalCargo", "adicionalRegion", "adicionalSucursal"];
  const keysTraduction2 = ["Telefono", "Cargo", "Región", "Sucursal"];


  const [errorApiGet, setErrorApiGet] = useState(false)
  const [typeError, setTypeError] = useState("");

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [countries, setCountries] = useState([])


  const email = localStorage.getItem('emailQuests')
  const [ladaUser, setLadaUser] = useState('+00')

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
   if(!response.status == '200'){
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
      {stage === 1 && <>
        <h1 className="mb-0">Bienvenido(a) <span className="wave-emoji">👋</span></h1>
        <p className="mt-0 mb-4">Llene el formulario que se muestra a continuación para registrarse y ser parte de la Convención Expo Batres 2024.</p>
      </>}

      {stage === 2 && <>
        <h1 className="mb-0">¡Ya casi estamos <span className="pop-emoji">👌</span>!</h1>
        <p className="mt-0 mb-4">Llene el formulario que se muestra a continuación para registrarse y ser parte de la Convención Expo Batres 2024.</p>
      </>}

{/*       {stage === 3 && <>
        <h1 className="mb-0">Verifiquemos 🧐</h1>
        <p className="mt-0 mb-4">Revise que sus datos sean correctos; en caso de que no, corríjalos.</p>
      </>} */}


      {stage === 1 && <div className="w-full flex flex-col gap-6">
        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Nombre(s)" name="nombre" />
        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Apellidos" name="apellido" />

        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Correo Electronico" name="correo" valueUser={email} />

        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Confirmar correo Electronico" name="adicionalConfirmarCorreo" verifyMail={verifyMail} />
        {mailError && <p className="text-red-800"><b>Los correos no son iguales</b></p>}

        <CautivaSelect title="País*" name="pais" data={countries} type="country" setDataModule={setDataModule} dataModule={dataModule} setLadaUser={setLadaUser} />

        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Estado" name="estado" />


        <CautivaBtnForm text="Siguiente" onClick={() => {

          console.log('dataModule', dataModule)

          const response = validateObjectFields(dataModule, keysToValidate1, keysTraduction1);

          if(mailError){
            Swal.fire({
              title: "Los correos no coinciden",
              icon: "info"
            });
          }else{
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
              setPercentageState(80)
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

        <NumberCautivaInput text="Telefono" name="telefono" setDataModule={setDataModule} dataModule={dataModule} data={countries} ladaUser={ladaUser} setLadaUser={setLadaUser} />

        <InputCautivaForms setDataModule={setDataModule} dataModule={dataModule} type="text" text="Cargo*" name="adicionalCargo" />

        <CautivaSelect
          title="¿Region a la que pertenece?*"
          name="adicionalRegion"
          data={departamentos}
          setDataModule={setDataModule}
          dataModule={dataModule}
        />

        <CautivaSelect
          title="Sucursal*"
          name="adicionalSucursal"
          data={sucursales}
          setDataModule={setDataModule}
          dataModule={dataModule}
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
            setPercentageState(100)
            sendDataToAPI()
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

   



       {sendingData  && <div className="w-full flex flex-col gap-6">
                <div className="w-full flex flex-col gap-6">
                    <CautivaLoader />
                </div>
          </div>} 

      {
        errorApiGet && <>
          <p>Ocurrio un error , contacte a soporte </p>
        </>
      }


      {(stage === 3 && !sendingData && !errorApiGet) && <div className="w-full flex flex-col gap-6">
        <Confetti

          recycle={false}  // Confeti se lanza una sola vez
        />
        <CorrectQuestSend />

      </div>}

    </ContainerQuest>
  )
}


export { Quest1 }