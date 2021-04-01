

const oracledb = require('oracledb');
const configdb = require('../config/database')



const createFacTranSql = `
INSERT INTO LATINO_OWNER.FAC_PRE_TRANSACCIONES 
(CODIGO_PRE_TRANSACCION,
    CODIGO_EMPRESA,
    CODIGO_SUCURSAL, 
    CODIGO_CAJA, 
    NUMERO_PUNTO_EMISION,
    SECUENCIA_USUARIO,
    CODIGO_USUARIO,
    TIPO_PRE_TRANSACCION,
    CODIGO_CANAL_FACTURACION,
    ES_ACTIVO,
    SECUENCIA_USUARIO_INGRESO,
    USUARIO_INGRESO,
    FECHA_INGRESO)
VALUES(latino_owner.FAC_SEQ_PRE_TRANSACCIONES.Nextval,
    :CODIGO_EMPRESA,
    :CODIGO_SUCURSAL, 
    :CODIGO_CAJA, 
    :NUMERO_PUNTO_EMISION,
    :SECUENCIA_USUARIO,
    :CODIGO_USUARIO,
    :TIPO_PRE_TRANSACCION,
    :CODIGO_CANAL_FACTURACION,
    :ES_ACTIVO,
    :SECUENCIA_USUARIO_INGRESO,
    :USUARIO_INGRESO,
    SYSDATE)returning CODIGO_PRE_TRANSACCION
    into :CODIGO_PRE_TRANSACCION
`

//const person = db.model({ table: 'people' });




findUsuarioBySecuencia = async (secuencia_usuario) => {
    let conn;
    const opts = { outFormat: oracledb.OBJECT, autoCommit: false };
    try {
        conn = await oracledb.getConnection(configdb.oracledb);
        let query = 
        `SELECT * FROM LATINO_OWNER.DAFX_USUARIOS_SISTEMA WHERE SECUENCIA_USUARIO = :secuencia_usuario`;
        let variablesQuery = {
            secuencia_usuario: { dir: oracledb.BIND_IN, val: secuencia_usuario, type: oracledb.DB_TYPE_NUMBER }
        };
        let resultSet = await conn.execute(query, variablesQuery, opts);
        return resultSet.rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                throw err;
            }
        }
    }
}

findEmpresaByCodigo = async (codigo_empresa) => {
    let conn;
    const opts = { outFormat: oracledb.OBJECT, autoCommit: false };
    try {
        conn = await oracledb.getConnection(configdb.oracledb);
        let query = 
        `SELECT * FROM LATINO_OWNER.DAF_EMPRESAS WHERE CODIGO_EMPRESA = :codigo_empresa`;
        let variablesQuery = {
            codigo_empresa: { dir: oracledb.BIND_IN, val: codigo_empresa, type: oracledb.DB_TYPE_NUMBER }
        };
        let resultSet = await conn.execute(query, variablesQuery, opts);
        return resultSet.rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                throw err;
            }
        }
    }
}

createFacturaTransaccion = async (facTranObj) => {
    let conn;
    const opts = { outFormat: oracledb.OBJECT, autoCommit: true };
    const facTran = Object.assign({}, facTranObj);
    facTran.CODIGO_PRE_TRANSACCION = {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
    try {
        conn = await oracledb.getConnection(configdb.oracledb);
        let resultSet = await conn.execute(createFacTranSql, facTran, opts);
        facTran.CODIGO_PRE_TRANSACCION = resultSet.outBinds.CODIGO_PRE_TRANSACCION[0];
        console.log('facTran', facTran);
        return facTran;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                throw err;
            }
        }
    }
}

module.exports = {
    findUsuarioBySecuencia,
    findEmpresaByCodigo,
    createFacturaTransaccion
}

// const sworm = require('sworm');
// const config = require('./config/database');
// const db = sworm.db(config);

// const person = db.model({ table: 'people' });
// db.connect(function () {
//     // connected
//     console.log('conectado');
// }).then(function () {
//     // disconnected
//     console.log('desconectado');

// });

//db.close()