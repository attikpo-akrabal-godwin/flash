import { PrismaClient } from "@prisma/client";
//import uniqid from 'uniqid'
const prisma = new PrismaClient()

export async function addProduct(name,photo,authorId){
    let product =await prisma.product.create({
        data:{
            name:name,
            photo:photo,
            authorId:authorId,
            //token:uniqid()
        }
    })
}

export async function findProducts(){
    let productTAb = await prisma.product.findMany()
    return productTAb
}


