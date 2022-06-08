require("express-async-errors")
const express = require("express")
const routes = require("./routes")
const sqliteConnection = require("./database");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload")

sqliteConnection().then(db => db).catch(error => console.error(error));

const app = express()

app.use(express.json()) //para ler o arquivo json
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

app.use((error,request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        })
    }
    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "internal server error"
    })
})

const PORT = 3222;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))

/* /* app.post("/users", (req, res) => {
    res.status(201).json(req.body)
}) */
