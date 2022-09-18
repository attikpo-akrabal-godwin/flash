export function isConnect  (request,response,next){
    if(!request.session.user){
        request.errors('veillez vous connecter ','/login')
    }else{
        next()
    }
}

export function userErrors (request, response, next){
    if(request.session.errors) {
        response.locals.errors = request.session.errors
        request.session.errors = undefined
    }
    if (request.session.sucess) {
        response.locals.sucess = request.session.sucess
        request.session.sucess = undefined
    }
    request.errors = (content, redirect) => {
        if(request.session.errors == 'undefined') {
            request.session.errors = {}
        }
        request.session.errors = content
        response.redirect(redirect)
    }
    request.sucess = (content, redirect) => {
        if(request.session.sucess == 'undefined') {
            request.session.sucess = {}
        }
        request.session.sucess = content
        response.redirect(redirect)
    }
    next()
}

export function sessionRegistry (request, response, next){
    if(request.session.user) {
        response.locals.user = request.session.user
    }
    request.addUser = (user)=>{
        if(request.session.user === 'undefined') {
            request.session.user = {}
        }
        request.session.user = user
        request.session.save()
       
    }

    request.deconnect =(redirect)=>{
        request.session.destroy()
        response.redirect(redirect)
    }
    next()
}


