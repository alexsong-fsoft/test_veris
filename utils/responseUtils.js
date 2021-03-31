/**
 * Arma un response para validaciones - 400
 * @param {*} headers 
 * @param {*} mensaje 
 */
function responseValidacion(headers, mensaje) {
    return {
        statusCode: 400,
        body: JSON.stringify(
            {
                code: 400,
                success: false,
                message: mensaje
            }),
        headers: headers
    };
}

/**
 * Arma un response para 200 - OK
 * @param {*} headers 
 * @param {*} data 
 * @param {*} mensaje 
 */
function responseOK(headers, data, mensaje) {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                code: 200,
                success: true,
                message: mensaje,
                data: data
            }),
        headers: headers
    };
}


/**
 * Arma un response para 201 - OK
 * @param {*} headers 
 * @param {*} data 
 * @param {*} mensaje 
 */
function responsePOST(headers, data, mensaje, parametrosMensaje) {
    return {
        statusCode: 201,
        body: JSON.stringify(
            {
                code: 201,
                success: true,
                message: mensaje,
                data: data
            }),
        headers: headers
    };
}

/**
 * Arma un response para errores - 500
 * @param {*} headers 
 * @param {*} error 
 * @param {*} mensaje 
 */
function responseError(headers, error, mensaje) {
    return {
        statusCode: 500,
        body: JSON.stringify(
            {
                code: 500,
                success: false,
                message: mensaje,
                errorData: [error.message, error.stack]
            }),
        headers: headers
    };
}

module.exports = {
    responseValidacion,
    responseOK,
    responsePOST,
    responseError
};