const { sign } = require('jsonwebtoken');
const authConfig = require('../configs/auth');
const knex = require('../database/knex');
const AppError = require('../utils/AppError');



class SessionsController{ 
    async create(request, response){
        const { email, password } = request.body;

        const user = await knex("users").where({ email }).first();
       
        if(!user){
            throw new AppError("Usuário ou senha inválidos", 401)
        }

        const checkPassword = password === user.password

        if(!checkPassword){
            throw new AppError("Usuário ou senha inválidos", 401)
        }

        const { expiresIn, secret } =authConfig.jwt
        const token = sign({ }, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token })
    }
}

module.exports = SessionsController;