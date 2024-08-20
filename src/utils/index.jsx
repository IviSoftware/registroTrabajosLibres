function validateObjectFields(obj, keys, translations) {
    const missingFields = [];

    // Verificar si el objeto está vacío
    if (Object.keys(obj).length === 0) {
        return { validate: 3, fields: [] };
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

function formatSurveyResponse1(inputObject) {
    // Crear el objeto de salida con los valores fijos
    let responses = {};

    // Mapeo de las respuestas
    const responseKeys = [
        "extraEdad",
        "extraEstadoProcedencia",
        "extraPerfil",
        "extraEspecialidad",
        "extraConsulta",
        "extraInstitucionTrabajo",
        "extraMedioEnteroCongreso",
        "extraKitCongresistaAdecuado",
        "extraTransmisionPonenciasAdecuada",
        "extraMediosAudiovisualesAdecuados",
        "extraTemasActuales",
        "extraNivelContenidos",
        "extraDistribucionActividades",
        "extraTiempoActividades",
        "extraSeleccionPonentes",
        "extraParticipacionPonentes",
        "extraComunicacionPonentes",
        "extraCumplieronObjetivos",
        "extraOrganizacionCongreso",
        "extraCongresoCumplioExpectativas",
        "extraEscalaObjetivoAcademico",
        "extraRecomendariaCongreso",
        "extraAcudiria34Congreso",
        "extraObservacionesConclusiones"
    ];

    // Rellenar las respuestas con los valores del objeto de entrada
    responseKeys.forEach(key => {
        if (inputObject[key]) {
            responses[key] = inputObject[key];
        } else {
            console.log("Falta:", key);
        }
    });

    // Combinar extraPlenariasInteresantes1 y extraPlenariasInteresantes2 en un array y luego en un string
    const extraPlenariasInteresantes1 = inputObject.extraPlenariasInteresantes1 || '';
    const extraPlenariasInteresantes2 = inputObject.extraPlenariasInteresantes2 || '';
    const extraPlenariasInteresantesArray = [extraPlenariasInteresantes1, extraPlenariasInteresantes2].filter(item => item !== '');
    responses.extraPlenariasInteresantes = extraPlenariasInteresantesArray.join(', ');

    // Devolver el objeto formateado
    return responses;
}


export { validateObjectFields, formatSurveyResponse1 };
