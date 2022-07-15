import { PrismaClient } from "@prisma/client";
import {addProduct} from '../services/product.js'
const prisma = new PrismaClient()

async function addadmin(name,password){
    await prisma.admin.create({
        data:{
            name:name,
            password:password
        }
    })
}



//addadmin('cool','cool')
addProduct("iphone","sjvgfiosvcv",1)