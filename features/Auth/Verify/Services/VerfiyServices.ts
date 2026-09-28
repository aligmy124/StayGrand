import { apiFetch } from "@/lib/api/apiFetch"
import {VerifyRequset, VerifyResponse} from "../Types/Types"
export async function verifyServices(data:VerifyRequset):Promise<VerifyResponse>{
    return apiFetch<VerifyResponse>("/portal/users/verify",{
        method:"PUT",
         body: JSON.stringify(data), 
    })
}