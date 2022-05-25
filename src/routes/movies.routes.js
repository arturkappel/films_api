const { Router } = require("express")
const MoviesControllers = require("../controllers/MoviesControllers")

const moviesRoutes = Router()

const moviesControllers = new MoviesControllers()
//criar //update  //delete 


moviesRoutes.post("/:user_id", moviesControllers.create )
moviesRoutes.get("/:id", moviesControllers.show)
moviesRoutes.get("/", moviesControllers.index)

module.exports = moviesRoutes;