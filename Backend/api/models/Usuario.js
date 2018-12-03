/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: {
      type: 'string',
      required: true
    },

    username: {
      type: 'string', 
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    institucion: {
      type: 'string',
    },

    email: {
      type: 'string',
      required: true,
      unique: true
    },

    rol: {
      type: 'string',
      required: true
    },

    activo: {
      type:'boolean',
      defaultsTo: false
    },

    neonatos: {
      collection: 'Neonato',
      via: 'ID_USUARIO'
    }

  }
};

