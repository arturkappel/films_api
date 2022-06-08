const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersControllers = require("../controllers/UsersControllers")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuth = require("../middlewares/ensureAuth")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const userControllers = new UsersControllers()
const userAvatarController = new UserAvatarController()
//criar //update  //delete 


usersRoutes.post("/", userControllers.create )
usersRoutes.put("/", ensureAuth ,userControllers.update)
usersRoutes.patch("/avatar", ensureAuth, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes;