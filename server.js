import express from "express"
import fileUpload from "express-fileupload";
import router from "./router.js";

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/static',express.static('views'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use("/",router)

app.listen(3000)