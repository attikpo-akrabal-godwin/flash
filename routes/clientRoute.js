import {addClient} from "../services/client.js"
export function clientRouter(router){
    router.get("/",(request,response)=>{
        response.render('index')
    })

    router.get("/userContact",(request,response)=>{
        //on va passer ça a la vue
        response.render("client/userContact")
    })

    router.get("/userContact/:productId",(request,response)=>{
        let {productId}=request.params
        //on va passer ça a la vue
        response.render("client/userContact")
    })
    
    router.post("/userContact",(request,response)=>{
        let {name,phoneNumber,sexe,quartier,productId}=request.boby
        addClient(name,phoneNumber,sexe,quartier,productId)
        response.redirect("/merci")
    })

    router.get("/merci",(request,response)=>{
        response.render("client/merci")
    })
    return router;
}