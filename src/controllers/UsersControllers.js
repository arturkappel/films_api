const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersControllers{
    async create(request, response){
       const { name, email, password, avatar } = request.body;
       
       const checkUserExists = await knex("users").where({ email })
        
        
        if(!checkUserExists.length == 0 ){
            console.log(checkUserExists)
            throw await new AppError("Email existente")
        }
       
       
        await knex("users").insert({
            name,
            email, 
            password, 
            avatar
        });
        
        response.json()
    }

    async update(request, response){
        const { name, email, password, old_password, avatar } = request.body;
        const { id } = request.params;
        
        const user = await knex("users").where({ id })
        
        const userEmail = await knex("users").where({ email })
        

        console.log(user)
        console.log(userEmail[0])
        if(user.length == 0){
            throw new AppError("Usuário não encontrado")
        }

        if(userEmail.length != 0 && userEmail[0].id !== user[0].id){
            throw new AppError("Email em uso")
        }

        if(password && !old_password){
            throw new AppError("Insira a senha antiga")
        }

        if(password && old_password){ 
            if(user[0].password !== old_password){
                console.log(user[0])
                throw new AppError("A senha antiga nao confere")
            }
        }
        user[0].name = name ?? user[0].name
        user[0].email = email ?? user[0].email
        user[0].avatar = avatar ?? user[0].avatar
        await knex("users").where({ id }).update({
            name,
            email,
            password,
            avatar
        })
        response.json()
    }

}

module.exports = UsersControllers;