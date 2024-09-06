import Swal from "sweetalert2";

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





// emailService.js
const verifyEmail = async (correo) => {
    try {
      // Usar URLSearchParams para crear los datos en formato 'x-www-form-urlencoded'
      const formData = new URLSearchParams();
      formData.append('email', correo);
      formData.append('action', 'verifyEmail');
      formData.append('evento', '14');
  
      const response = await fetch('https://api.integrameetings.com/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(), // Convertir a string para la solicitud
      });
  
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la respuesta del servidor:", error);
      throw error;
    }
  };
  

  // registroService.js
const verificarCupon = async (cupon) => {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    const body = new URLSearchParams({
      evento: '14',
      action: 'verificarCupon',
      cupon,
    });
  
    const requestOptions = {
      method: 'POST',
      headers,
      body,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch('https://api.integrameetings.com/v1/cupones/', requestOptions);
      const result = await response.text();
      return JSON.parse(result);
    } catch (error) {
      console.error('Error al verificar el cupón:', error);
      throw error;
    }
  };
  

  const sendRegister = async (jsonReactState) => {
    const formData = new FormData();
  
    // Obtener el correo electrónico del usuario desde el localStorage
    const emailUsuario = localStorage.getItem('emailQuests');
    if (emailUsuario) {
      formData.append('correo', emailUsuario); // Añadir el email del usuario al FormData
    } else {
      console.warn('No se encontró el correo del usuario en el localStorage.');
    }
  
    // Iterar sobre las entradas del jsonReactState
    Object.entries(jsonReactState).forEach(([key, value]) => {
      // Manejar el caso de los coautores
      if (key === 'coautores' && Array.isArray(value)) {
        value.forEach((coautor, index) => {
          // Añadir cada campo del coautor al FormData con el formato correcto
          Object.entries(coautor).forEach(([coautorKey, coautorValue]) => {
            formData.append(`coautor[${index}][${coautorKey}]`, coautorValue);
          });
        });
      } else {
        // Agregar otros campos normalmente
        formData.append(key, value);
      }
    });
  
    // Imprimir el contenido del formData
    console.log('Contenido de formData:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
   try {
      const response = await fetch('https://api.integrameetings.com/v1/trabajos-libres/?action=saveRecord&evento=16', {
        method: 'POST',
        body: formData,
      });
      const rta = await response.json()
  
      console.log(rta, 'response');
  
      if (!response.ok) {
        throw new Error(`Error al enviar el registro: ${response.statusText}`);
      }
  
      return rta;
    } catch (error) {
      console.error('Error al enviar el registro:', error);
      throw error;
    } 
  };
  



  const resendEmail = (email) => {
    let sendingModal = Swal.fire({
        title: 'Enviando...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Muestra un ícono de carga mientras se envía el correo
        }
      });
    fetch(`https://script.google.com/macros/s/AKfycbyMrUCG0cHGAzAGaIYnGPFy8u_sQ8LZNDcHQd5Ao6W2iiCF-uZR6Ml0FGcwW7RJZ_88kw/exec?email=${email}&evento=14`, {
        method: 'GET' // O 'POST', dependiendo de cómo esté configurado tu endpoint
        // Si necesitas enviar datos, como un ID de usuario o un token, puedes incluirlos aquí
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Respuesta de red no fue ok');
        }
        return response.text();
      })
      .then(data => {
        Swal.close();
        console.log('Correo reenviado con éxito:', data);
        Swal.fire({
          title: 'Correo envíado con exito',
          icon: 'success',
        });

        // Aquí puedes hacer algo más después de que se haya reenviado el correo
      })
      .catch(error => {
        Swal.fire({
          title: 'Correo envíado con exito',
          icon: 'success',
        });
        Swal.fire({
          title: 'Correo envíado con exito',
          icon: 'success',
          confirmButtonText: '¡Excelente!'
        }).then(result => {
          location.reload();
        })
        console.error('Hubo un problema con la solicitud de reenvío de correo:', error);
      });
    
  };
  
  


export {validateUser,sendRegister,verifyEmail,resendEmail}