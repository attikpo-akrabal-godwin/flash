import {addProduct,findProducts,findByToken, deleteByToken} from '../services/product.js'
import {addClient,findClientByProduct} from'../services/client.js'
import { isConnect } from '../middleware/isConnect.js'
export function adminRoute(router){
    router.get('/addProduct',isConnect,(request,response)=>{
        response.render("admin/addProduct")
    })
    router.post('/addProduct',isConnect,(request,response)=>{
        let   authorId // je doit implenter  fileuplod et la session pour les 
        //let productFile= request.files

        if(!request.files){
            request.errors("veillez ajouter la photo du produit ","/addProduct")
        }
        let {productName}=request.body
        let {productFile}= request.files

        if (!productName) {
            request.errors("veillez renseigner le nom du produit","/addProduct")
        }
        
        if (productFile&&productName) {
            addProduct(productName,Buffer.from(productFile.data).toString('base64'),request.session.user.id)
            request.sucess("produit ajouter ","/productList")
        }
       
    })

    router.get("/productList",isConnect,async (request,response)=>{
            let productTab = await findProducts()
            //on va passer ça a la vue
            response.render("admin/productList",{productTab:productTab})
    })

    router.get('/showClients/:idProduct',isConnect,async(request,response)=>{
        let {idProduct } = request.params
        let product = await findByToken(idProduct)
        response.locals.product = product
        let clientTab= await findClientByProduct(product.id)
        response.locals.clientTab=clientTab
        //on va passer ça a la vue
        response.render("admin/showClients")
    })

    router.get('/deconnexion',isConnect,(request,response)=>{
        request.deconnect('/')
    })

    router.get("/delete/:id",isConnect,async (request,response)=>{
        let {id}=request.params
        // on doit verifier si ce produit est dans la base  verifier 
        let newid = parseInt(id)
        let product = await deleteByToken(newid)
        request.sucess(`produit  ${product.name}  suprimer`,`/productList`)
    })
    
    return router;
}