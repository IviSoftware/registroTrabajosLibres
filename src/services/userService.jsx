import Swal from "sweetalert2";
import { formatSurveyResponse1,formatSurveyResponse2,formatSurveyResponse3,formatSurveyResponse4 } from "../utils";
const API = "https://api.encuestas.integrameetings.com/cnd2024/"

const validateUser = async (userEmail) => {
    const jsonBody = {
        "evento": "5",
        "action": "getUserByEmail",
        "email": userEmail
    }         
    const response = await fetch('https://api.encuestas.integrameetings.com/cnd2024/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonBody)
    });
    if (!response.ok) {
        Swal.fire({
            title:"Ocurrio un error, contacte a soporte",
            icon:"error"
        })
        throw new Error('Failed to fetch user');
    }
    return await response.json();
};


const sendData = async (data,slug)=>{
    
    console.log("sendData");

    const metadataUser = JSON.parse(localStorage.getItem('metadataUser'))

    let dataFormatted = '';

    switch (slug) {
        case "sat_con_per_pro_vir":
            dataFormatted = formatSurveyResponse1(data)
        break;

        case "sat_con_per_pro_pre":
            dataFormatted = formatSurveyResponse2(data)
        break;

        case "sat_con_per_gen_vir":
            dataFormatted = formatSurveyResponse3(data)
        break;

        case "sat_con_per_gen_pre":
            dataFormatted = formatSurveyResponse4(data)
        break;
    
        default:
            break;
    }
   
    const email = localStorage.getItem('emailAsistente');
    const asistantId = localStorage.getItem('idAsistenteDiabetes');

    const responses = [];
    responses.push(dataFormatted)



    const bodyConstructor = {
        "action": "saveSatisfactionSurveyResponses",
        "email": email,
        "asistenteId":asistantId,
        "slug": slug,
        "respuestas":responses,
        "metadata":metadataUser
    }

    console.log(bodyConstructor)

    const apiRes = await fetch(API,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(bodyConstructor)
    }); 

    const json = await apiRes.json();
    console.log('jsooon',json)
    return json
}


export {validateUser,sendData}