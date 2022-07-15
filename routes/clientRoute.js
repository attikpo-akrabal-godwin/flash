import {addClient} from "../services/client.js"
import {findByToken} from '../services/product.js'
export function clientRouter(router){
    router.get("/",(request,response)=>{
        response.render('index')
    })

    

    router.get("/userContact/:productId",async (request,response)=>{
        let {productId}=request.params
        // on doit verifier si ce produit est dans la base  verifier 
        response.locals.id= productId
        let product = await findByToken(productId)
        response.locals.product = product
        response.render("client/userContact")
    })
    
    router.post("/userContact",async(request,response)=>{
        console.log(request.body);
        console.log(request.body.name);

        let {name,phoneNumber,quartier,sexe,id}=request.body
        
        let product  = await findByToken(id)
        addClient(name,phoneNumber,sexe,quartier,parseInt(product.id))
        response.redirect("/merci")
    })

    router.get("/merci",(request,response)=>{
        response.render("client/merci")
    })
    return router;
}