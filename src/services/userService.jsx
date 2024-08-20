import Swal from "sweetalert2";
import { formatSurveyResponse1 } from "../utils";
const API = "https://api.encuestas.integrameetings.com/cnd2024/"

const validateUser = async (userEmail) => {
    const jsonBody = {
        "evento": "13",
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

    let dataFormatted = '';

    switch (slug) {
        case "sat_con_per_pro_vir":
            dataFormatted = formatSurveyResponse1(data)
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
        "respuestas":responses
    }

    console.log(bodyConstructor)

    const apiRes = await fetch(API,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "action": "saveSatisfactionSurveyResponses",
            "email": email,
            "asistenteId":asistantId,
            "slug": slug,
            "respuestas":bodyConstructor
        })
    }); 

    const json = await apiRes.json();
    return json
}


export {validateUser,sendData}