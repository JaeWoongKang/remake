
import { makeSSRClient } from "supa-client";

export const checkUsernameExists = async( request: Request,{username}: {username: string}) => {
    const {client} = makeSSRClient(request);
    const {data, error} = await client.from("profiles").select("username").eq("username", username).single();
    if(error){
        console.error(error);
        return false;
    }
    return true;
}