/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi = require('joi');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

module.exports = {
    signup: async function (req, res) {
        try {
          const schema = Joi.object().keys({
            nombre: Joi.string().min(3).max(30).required(),
            username: Joi.string().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9.*]{3,30}$/),
            institucion: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            rol: Joi.string().min(3).max(30).required(),
            activo: Joi.boolean().required()
            
          });
          //validar el username y el password
          const {nombre, username, password, institucion, email, rol, activo} = await Joi.validate(req.allParams(), schema);
          var encryptedPassword = bcrypt.hashSync(password, 5);
          //crear nuevo usuario
          const results = await Usuario.create({
            nombre,
            username,
            password: encryptedPassword,
            institucion,
            email,
            rol,
            activo
          });
          transporter.sendMail({
              to: 'ricardo@optimussocial.com',
              from: 'no-reply@scorebebe.com',
              subject: 'Solicitud para realizar el test',
              html: '<h1>El usuario '+username+' ha solicitado registrarse</h1>'
          });
          //enviar parametros del usuario
          return res.ok(results);
        } catch (err) {
          if(err.name === 'ValidationError'){
            return res.badRequest({err});
          }
          return res.serverError(err);
        }
      },
    
      /**
       * `UserController.login()`
       */
      login: async function (req, res) {
        try {
          const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
          });
          //validar el username y el password
          const {username, password} = await Joi.validate(req.allParams(), schema);
          const user = await Usuario.findOne({username});
          if(!user){
            return res.badRequest({err: 'El usuario no existe'});
          }
          
          const matchedPassword = await bcrypt.compareSync(password, user.password);;
          if(!matchedPassword){
            return res.badRequest({err: 'Contraseña incorrecta'});
          }

          if(!user.activo){
            return res.badRequest({err: 'Todavía no ha sido aceptado para realizar el test'});
          }
         // return res.ok(user);
          const token  = JWTService.issuer({user: user.id}, '5h');
          return res.ok({token});
        } catch (err) {
          if(err.name === 'ValidationError'){
            return res.badRequest({err});
          }
          return res.serverError(err);
        }
    
      },

      updateActivo: async function(req,res) {
        try {
          const user = await Usuario.find({
              username: req.params.username
          }).limit(1);
         await Usuario.update({username: user[0].username })
          .set({
            activo: true
          });
          await transporter.sendMail({
            to: user[0].email,
            from: 'no-reply@scorebebe.com',
            subject: 'Solicitud de test aprobada',
            html: '<h1>Estimado '+user[0].nombre+' :</h1><p>Ha sido aceptado para realizar el test scorebebe, ingrese a <a href="https//www.optimussocial.com/scorebebe/login">en este link</a> para iniciar sesion</p>'
        });
          return res.ok(user);
        } catch (error) {
            return res.serverError(error);
        }
      },

      async findOne(req, res){
        try {
          const user = await Usuario.find({
              username: req.params.username
          }).limit(1);
    
          return res.ok(user[0]);
        } catch (error) {
            return res.serverError(error);
        }
    
      },

      

};

