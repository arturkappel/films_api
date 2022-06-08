const { Router } = require("express")
const TagsControllers = require("../controllers/TagsController")
const ensureAuth = require("../middlewares/ensureAuth")

const tagsRoutes = Router()

const tagsControllers = new TagsControllers()
//criar //update  //delete 


tagsRoutes.get("/:user_id",ensureAuth, tagsControllers.index)


module.exports = tagsRoutes;