import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function login(username,password){
    let admin = await prisma.admin.findFirst({
        where:{
            name: username
        }
    })
    
    if (admin) {
        if(admin.password == password){
            return {state:true,admin:admin}
        }else{
            return {state:false,admin:""}
        }
    }else{
        return {state:false,admin:admin}
    }
    
} 