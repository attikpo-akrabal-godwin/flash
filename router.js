import express from "express"

import { adminRoute } from "./routes/AdminRoute.js"
import { authRoute } from "./routes/authRoute.js"
import { clientRouter } from "./routes/clientRoute.js"

export default (  ()=>{
    let flash = express.Router()
    flash =   clientRouter(flash)
    flash =   authRoute(flash)
    flash =   adminRoute(flash)
    return  flash
})()