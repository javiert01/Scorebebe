/**
 * Neonato.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombreApellido: {
      type: 'string',
      required: true
    },

    fechaCalculo: {
      type: 'string'
    },

    catEdadGestional: {
      type: 'string'
    },

    catPeso: {
      type: 'string'
    },

    catPesoEdadGestional: {
      type: 'string'
    },

    catApgar: {
      type: 'string'
    },

    catTipoParto: {
      type: 'string'
    },

    catComorbilidades: {
      type: 'string'
    },

    scoreTotal: {
      type: 'number'
    },

    catRiesgo: {
      type: 'string'
    },

    ID_USUARIO: {
      model: 'Usuario'
    }

  }
};

