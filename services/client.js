import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function addClient(name,phoneNumber,sexe,quartier,productId){
    await prisma.client.create({
        data:{
            name:name,
            phoneNumber:phoneNumber,
            sexe:sexe,
            quartier:quartier,
            productId:productId
        }
    })
}

export async function findClientByProduct(productId){
    let clientTab =  await prisma.client.findMany({
       where:{
        productId:productId
       },
       include:{
        product:true
       }
    })
    return clientTab;
}