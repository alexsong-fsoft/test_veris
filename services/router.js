const express = require('express');
const facTran = require('../controllers/facturaTransaccion');


const router = new express.Router();


/**
 * @swagger
 * /pre_transacciones/inicializar:
 *   post:
 *     tags: [Transacciones]
 *     summary: Inicializa una transaccion de Facturación.
 *     description: Inicializa una transacción de Facturación y retorna id de transacción.
 *     parameters:
 *     - name: Application
 *       in: header
 *       description: Identificador de la aplicación en la que se quiere autorizar
 *       required: true
 *       schema:
 *         type: string
 *     - name: IdOrganizacion
 *       in: header
 *       description: Identificador de la Organización en la que se quiere autorizar
 *       required: true
 *       schema:
 *         type: string
 *     - name: Accept-Language
 *       in: header
 *       description: Identificador del idioma el cual se desea responda la api
 *       required: false
 *       schema:
 *         type: string
 *     - name: codigoEmpresa
 *       in: query
 *       description: Id de empresa
 *       required: true
 *       schema:
 *         type: number
 *     - name: tipoPreTransaccion
 *       in: query
 *       description: Indica el Tipo de pre transacción
 *       required: true
 *       schema:
 *         type: string
 *         enum: ['COTIZACION','FACTURA']
 *     requestBody:
 *       description: Datos de inicializacion de Transacción.<br/>
 *                     'canalOrigenFacturacion' Indica el canal donde se realiza la transacción.<br/>
 *                     Los campos 'codigoEmpresa', 'codigoSucursal', 'codigoCaja', 'numeroPuntoEmision' son obligatorios según el canalOrigenFacturacion.
 *       required: true
 *       content:
 *         'application/json':
 *           schema:
 *             type: object
 *             properties:
 *               secuenciaUsuario:
 *                 type: number
 *               idTurno:
 *                 type: number
 *               caja:
 *                 type: object
 *                 properties:
 *                   codigoSucursal:
 *                     type: number
 *                   codigoCaja:
 *                     type: number
 *                   numeroPuntoEmision:
 *                     type: number
 *               nemonicoCanalFacturacion:
 *                 type: string
 *             required:
 *               - secuenciaUsuario
 *               - fecha
 *               - nemonicoCanalFacturacion
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     idPreTransaccion:
 *                       type: number
 *       401:
 *         $ref: '#/components/responses/401UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/400BadRequestError'
 *       500:
 *         $ref: '#/components/responses/500InternalServerError'
 */
 router.route('/pre_transacciones/inicializar')
 .post(facTran.post);

 

module.exports = router;