const { Router } = require("express")
const SessionsController = require("../controllers/SessionsController")

const sessionsRoutes = Router()

const sessionsController = new SessionsController()
//criar //update  //delete 


sessionsRoutes.post("/", sessionsController.create )

module.exports = sessionsRoutes;