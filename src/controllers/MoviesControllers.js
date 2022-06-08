const knex = require("../database/knex");

class MoviesControllers{
    async create(request, response){
        const { title, description, rating, tags } = request.body
        const { user_id } = request.user.id
        const movie_id = await knex("movies").insert({
            title,
            description,
            rating,
            user_id
        })

        const tagsInsert = tags.map(name =>{
            return{
                movie_id,
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)
        
        response.json()
    }

    async show(request, response){
        const { id } = request.params
        
        const movies = await knex("movies").where({ id }).first();
        const tags = await knex("tags").where({ movie_id: id });
        console.log(id)
        return response.json({
            ...movies,
            tags
        })


    }

    async index(request, response){
        const { title, tags} = request.query
        const { user_id } = request.user.id

        let movies;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim());

            movies = await knex("tags").select([
                "movies.id",
                "movies.title",
                "movies.user_id"
            ])
            .where("movies.user_id", user_id)
            .whereLike("movies.title", `%${title}`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "movies", "tags.movie_id")
            .orderBy("movies.title")
        }else{
            movies = await knex("movies")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("tags").where({ user_id })
        const moviesWithTags = movies.map( movie => {
            const movieTags = userTags.filter( tag => tag.movie_id === movie.id);

            return{
                ...movie,
                tags: movieTags
            }
        })
        return response.json(moviesWithTags);

    }

}

module.exports = MoviesControllers