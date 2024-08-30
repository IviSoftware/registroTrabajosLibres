function validateObjectFields(obj, keys, translations,setDataModule) {

   


    const missingFields = [];

    console.log(obj,'objssss')

    // Verificar si el objeto está vacío
    if (Object.keys(obj).length === 0) {
        return { validate: 3, fields: [] };
    }

    // Verificar si el campo "extraEdad" es menor a 18
    if (obj.extraEdad && Number(obj.extraEdad) < 18) {
        return { validate: 4, fields: ["extraEdad"] };
    }

    // Verificar si todas las claves especificadas tienen valores
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];

        try {
            if (!value || (typeof value === 'string' && value.trim() === "")) {
                // Añadir la traducción correspondiente al campo faltante
                missingFields.push(translations[i] || key);
            }
        } catch (error) {
            console.error(`Error con la clave: "${key}", valor:`, value);
            console.error(error);
        }
    }

    // Si hay campos faltantes
    if (missingFields.length > 0) {
        return { validate: 0, fields: missingFields };
    }

    // Si todos los campos están llenos
    return { validate: 1, fields: [] };
}





const getBasicData = ()=>{
    const fullName = localStorage.getItem('nombreAsistente');
    const telefonoAsistente = localStorage.getItem('telefonoAsistente')
    const estadoProcedenciaAsistente = localStorage.getItem('estadoProcedenciaAsistente')

    return {
        fullName,
        telefonoAsistente,
        estadoProcedenciaAsistente
    }

}


export { validateObjectFields,getBasicData};
