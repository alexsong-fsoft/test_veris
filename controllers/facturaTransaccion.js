const facTranRepo = require('../repository/facturaTransaccion');



post = async (req, res, next) => {
    try {

        const { headers, method, query, params, body } = req;
        // console.log('heades:', headers);
        // console.log('method', method);
        // console.log('query:', query);
        // console.log('params:', params);
        // console.log('body:', body);
     
        const Application = !headers.Application ? headers.application : headers.Application;
        const IdOrganizacion = !headers.IdOrganizacion ? headers.idorganizacion : headers.IdOrganizacion;
        const Authorization = !headers.Authorization ? headers.authorization : headers.Authorization;
        const AcceptLanguage = !headers.accept['Accept-Language'] ? headers.accept['accept-language'] : headers.accept['Accept-Language'];

        if (method !== 'POST') {
            res.contentType('application/json').status(500);
            res.send(JSON.stringify({
                code: '500',
                success: 'false',
                message: `Método no soportado: ${method}`,
                errorData: []
            }));
            return;
        }

        //VALIDA CAMPOS DE HEADERS
        if (!Application || !IdOrganizacion ) {
            res.contentType('application/json').status(400);
            res.send(JSON.stringify({
                code: '400',
                success: 'false',
                message: `Campo(s) de cabezeras requerido(s): [${Application ? '': 'Application,'} ${IdOrganizacion ? '': 'IdOrganizacion'}]`,
                errorData: []
            }));
            return;
        }

        //VALIDA CAMPOS DE QUERYS 
        if (!query.codigoEmpresa || !query.tipoPreTransaccion ) {
            res.contentType('application/json').status(400);
            res.send(JSON.stringify({
                code: '400',
                success: 'false',
                message: `Campo(s) de requerido(s): [${query.codigoEmpresa ? '': 'codigoEmpresa,'} ${query.tipoPreTransaccion ? '': 'tipoPreTransaccion'}]`,
                errorData: []
            }));
            return;
        }

        //VALIDA CAMPOS DE BODY 
        if (!body.secuenciaUsuario || !body.nemonicoCanalFacturacion ) {
            res.contentType('application/json').status(400);
            res.send(JSON.stringify({
                code: '400',
                success: 'false',
                message: `Campo(s) de requerido(s): [${body.secuenciaUsuario ? '': 'secuenciaUsuario,'} ${body.nemonicoCanalFacturacion ? '': 'nemonicoCanalFacturacion'}]`,
                errorData: []
            }));
            return;
        }

        //validacion nemonicoCanalFacturacion
        if (body.nemonicoCanalFacturacion != 'CAJA' && body.nemonicoCanalFacturacion != 'KIOSKO' ) {
            res.contentType('application/json').status(400);
            res.send(JSON.stringify({
                code: '400',
                success: 'false',
                message: `Campo nemonicoCanalFacturacion solo acepta los siguientes valores: ['CAJA','KIOSKO']`,
                errorData: []
            }));
            return;
        } else {
            body.nemonicoCanalValor = body.nemonicoCanalFacturacion == 'CAJA' ? 1 : 2;
        }

        //validacion de codigoEmpresa
        let empresaFind = await facTranRepo.findEmpresaByCodigo(parseInt(query.codigoEmpresa));
        if (empresaFind == null || empresaFind.length < 1) {
            res.contentType('application/json').status(400);
            res.send(JSON.stringify({
                code: '400',
                success: 'false',
                message: `Empresa con codigo: ${query.codigoEmpresa} no encontrada`,
                errorData: []
            }));
            return;
        } 
        empresaFind = empresaFind[0];
        //console.log('empresa', empresaFind);

        //validacion de secuenciaUsuario
        let usuarioFind = await facTranRepo.findUsuarioBySecuencia(body.secuenciaUsuario);
        if (usuarioFind == null || usuarioFind.length < 1) {
            res.contentType('application/json').status(400);
            res.send(JSON.stringify({
                code: '400',
                success: 'false',
                message: `Usuario con secuenciaUsuario: ${body.secuenciaUsuario} no encontrado`,
                errorData: []
            }));
            return;
        } 
        usuarioFind = usuarioFind[0];
        //console.log('usuario', usuarioFind);

        
        const facTran = {
            CODIGO_EMPRESA: empresaFind.CODIGO_EMPRESA,
            CODIGO_SUCURSAL: body.caja && body.caja.codigoSucursal ? body.caja.codigoSucursal : null, 
            CODIGO_CAJA: body.caja && body.caja.codigoCaja ? body.caja.codigoCaja : null, 
            NUMERO_PUNTO_EMISION: body.caja && body.caja.numeroPuntoEmision ? body.caja.numeroPuntoEmision : null,
            SECUENCIA_USUARIO: usuarioFind.SECUENCIA_USUARIO,
            CODIGO_USUARIO: usuarioFind.CODIGO_USUARIO,
            TIPO_PRE_TRANSACCION: query.tipoPreTransaccion,
            CODIGO_CANAL_FACTURACION: body.nemonicoCanalValor,
            ES_ACTIVO: 'S',
            SECUENCIA_USUARIO_INGRESO: 968,
            USUARIO_INGRESO: 'ENEVAREZ'
        };
        console.log('factran1', facTran);

        //CREAR FACTURA TRANSACCION
        let facTranCreada = await facTranRepo.createFacturaTransaccion(facTran);
        if(!facTranCreada.CODIGO_PRE_TRANSACCION){
            res.contentType('application/json').status(500);
            res.send(JSON.stringify({
                code: '500',
                success: 'false',
                message: `Error al crear la transaccion`,
                errorData: []
            }));
            return;
        }

        res.contentType('application/json').status(200);
        res.send(JSON.stringify({
            code: '200',
            success: 'true',
            message: `Transaccion Creada`,
            data: {
                idPreTransaccion: facTranCreada.CODIGO_PRE_TRANSACCION
            }
        }));
        return;

    } catch (err) {
        next(err);
    }
}

module.exports.post = post;