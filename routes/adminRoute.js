import {addProduct,findProducts} from '../services/product.js'
import {addClient,findClientByProduct} from'../services/client.js'
export function adminRoute(router){
    router.get('/addProduct',(request,response)=>{
        response.render("admin/addProduct")
    })
    router.post('/addProduct',(request,response)=>{
        let productFile , authorId // je doit implenter  fileuplod et la session pour les 
        let {productName}=request.body
        if(productFile&&productName){
            addProduct(productName,productFile,authorId)
            response.redirect("/productList")
        }else{
            response.redirect("/addProduct")
        }
       
    })

    router.get('/productList',(request,response)=>{
            let productTab =  findProducts()
            //on va passer ça a la vue
            response.render("admin/productList")
    })

    router.get('/showClients/:id',(request,response)=>{
        let {idProduct } = request.params
        let clientTab= findClientByProduct(idProduct)
        //on va passer ça a la vue
        response.render("admin/showClients")
    })
    
    return router;
}