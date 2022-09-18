import { isConnect } from '../middleware/isConnect.js'
import {login} from '../services/admin.js'

export  function authRoute (router){
    router.get('/login',(request,response)=>{
            response.render("auth/login")
    })
    router.post('/login', async (request,response)=>{

            let {username,password}=request.body
            let {state,admin} = await login(username,password)
            //on met user dans la session
            request.addUser(admin)
            if (state) {
                request.sucess("conecter avec sucess",'/productList')
            }else{
                request.errors("identifiant incorrect",'/login')
            }
    })

    router.post('/register',(request,response)=>{

    })
    return router;
}