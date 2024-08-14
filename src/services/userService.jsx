import Swal from "sweetalert2";

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


export {validateUser}