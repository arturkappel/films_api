const { Router } = require("express")
const MoviesControllers = require("../controllers/MoviesControllers")
const ensureAuth = require("../middlewares/ensureAuth")

const moviesRoutes = Router()

const moviesControllers = new MoviesControllers()
//criar //update  //delete 

moviesRoutes.use(ensureAuth)

moviesRoutes.post("/", moviesControllers.create )
moviesRoutes.get("/:id", moviesControllers.show)
moviesRoutes.get("/", moviesControllers.index)

module.exports = moviesRoutes;