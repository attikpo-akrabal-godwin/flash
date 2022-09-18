import express from "express"
import fileUpload from "express-fileupload";
import router from "./router.js";
import session from "express-session";
import cors from 'cors'
import { isConnect, sessionRegistry, userErrors } from "./middleware/isConnect.js";
const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/static',express.static('views'));
app.use(express.static('public'));
app.use(session({
  secret: "aazaezezeaeaz",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))  

app.use(sessionRegistry)
app.use(userErrors)

app.set('view engine', 'ejs');

app.use("/",router)

app.listen(3000)