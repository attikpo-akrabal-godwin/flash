import {login} from '../services/admin.js'

export function authRoute (router){
    router.get('/login',(request,response)=>{
            response.render("auth/login")
    })
    router.post('/login',(request,response)=>{

            let {username,password}=request.body
            let {authState,user} = login(username,password)
            //on met user dans la session
            if (authState) {
                response.redirect('/login')
            }else{
                response.redirect('/productList')
            }
    })

    router.post('/register',(request,response)=>{

    })
    return router;
}