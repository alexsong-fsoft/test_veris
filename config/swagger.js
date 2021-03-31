require('dotenv').config();

swaggerConfig = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'PhantomX POST Pre Transacciones',
            version: '1.0.0',
            description: 'Servicio que inserta un registro en la tabla FAC_SEQ_PRE_TRANSACCIONES.',
            contact: {
                name: "Alex Mite",
                url: "https://www.veris.com.ec/",
                email: "lxmite@gmail.com",
            }
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/facturacion/v1`,
                description: 'Test'
            }
        ],
        tags: [
            {
                name: 'Transacciones',
                description: 'Transacciones de Facturación.'
            }
        ],
        components: {
            schemas: {
                '400Response': {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'integer'
                        },
                        success: {
                            type: 'boolean',
                            default: 'false'
                        },
                        message: {
                            type: 'string'
                        },
                        errorData: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    },
                    example: {
                        code: '400',
                        success: 'false',
                        message: 'El campo no es valido',
                        errorData: []
                    }
                },
                '401Response': {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'integer'
                        },
                        success: {
                            type: 'boolean',
                            default: 'false'
                        },
                        message: {
                            type: 'string'
                        },
                        errorData: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    },
                    example: {
                        code: '401',
                        success: 'false',
                        message: 'Las cedenciales de autenticación no son válidas.',
                        errorData: []
                    }
                },
                '500Response': {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'integer'
                        },
                        success: {
                            type: 'boolean',
                            default: 'false'
                        },
                        message: {
                            type: 'string'
                        },
                        errorData: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    },
                    example: {
                        code: '500',
                        success: 'false',
                        message: 'Ha ocurrido un error inesperado.',
                        errorData: ["java.lang.NullPointerException", "ORA-06508: PL/SQL: could not find program unit being called"]
                    }
                },
                '200Response': {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'integer'
                        },
                        success: {
                            type: 'boolean',
                            default: 'true'
                        },
                        message: {
                            type: 'string'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                idPreTransaccion: {
                                    type: 'integer'
                                }
                            }
                        }
                    },
                    example: {
                        code: '400',
                        success: 'false',
                        message: 'El campo no es valido',
                        errorData: []
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            responses: {
                '400BadRequestError': {
                    description: 'Error de validación',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/400Response'
                            }
                        }
                    }
                },
                '401UnauthorizedError': {
                    description: 'Error de autenticación.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/401Response'
                            }
                        }
                    }
                },
                '500InternalServerError': {
                    description: 'Error de Base de datos o de ejecución.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/500Response'
                            }
                        }
                    }
                }                
            }
        },
        security: {
            bearerAuth: []
        }
    },
    //apis: ['./src/routes*.js'],
    apis: ['./services/web-server.js', './services/router.js']
}

module.exports = swaggerConfig;