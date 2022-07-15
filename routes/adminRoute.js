import {addProduct,findProducts,findByToken} from '../services/product.js'
import {addClient,findClientByProduct} from'../services/client.js'
export function adminRoute(router){
    router.get('/addProduct',(request,response)=>{
        response.render("admin/addProduct")
    })
    router.post('/addProduct',(request,response)=>{
        let   authorId // je doit implenter  fileuplod et la session pour les 
        //let productFile= request.files
        let {productFile}= request.files
        let {productName}=request.body
        let test = request.body
        if(productFile&&productName){
            addProduct(productName,Buffer.from(productFile.data).toString('base64'),1)
            response.redirect("/productList")
        }else{
            response.redirect("/addProduct")
        }
       
    })

    router.get("/productList",async (request,response)=>{
            let productTab = await findProducts()
            
            response.locals = productTab
            //on va passer ça a la vue
            response.render("admin/productList",{productTab:productTab})
    })

    router.get('/showClients/:idProduct',async(request,response)=>{
        let {idProduct } = request.params
        console.log(idProduct);
        let product = await findByToken(idProduct)
        response.locals.product = product
        let clientTab= await findClientByProduct(product.id)
        response.locals.clientTab=clientTab
        //on va passer ça a la vue
        response.render("admin/showClients")
    })
    
    return router;
}