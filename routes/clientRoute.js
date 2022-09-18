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
        if (product) {
            response.render("client/userContact")
        }else{
            request.errors('désolé le  produit n\'est plus dans le catalogue ',"/merci")
        }
       
    })
    
    router.post("/userContact",async(request,response)=>{
       
        let {name,phoneNumber,quartier,sexe,id}=request.body
        if (!(name&&phoneNumber&&quartier&&sexe&&id)) {
            request.errors("veiller renseigner touts les champs ",`/userContact/${id}`)
        }else{
            let product  = await findByToken(id)
            addClient(name,phoneNumber,sexe,quartier,parseInt(product.id))
            request.sucess("information enregistrer","/merci")
        }
        
    })

    router.get("/userContact",async (request,response)=>{

        request.errors('désolé le  produit n\'est plus dans le catalogue ','/merci')
    })

    router.get("/merci",(request,response)=>{
        response.render("client/merci")
    })

    return router;
}