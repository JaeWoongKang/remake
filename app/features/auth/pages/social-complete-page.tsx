import { z } from "zod";
import { Route } from "./+types/social-complete-page";
import { redirect } from "react-router";
import { makeSSRClient } from "supa-client";

const paramSchema = z.object({
  provider: z.enum(["kakao", "github"]),
});

export const loader = async ({params, request}: Route.LoaderArgs) => {
  const {success, data} = paramSchema.safeParse(params);
  if(!success){
    return redirect("/auth/login");
  }
  const {provider} = data;
  const {client, headers} = makeSSRClient(request);
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if(!code){
    return redirect("/auth/login");
  }
  const {error} = await client.auth.exchangeCodeForSession(code);
  if(error){
    throw error;
  }
  
  return redirect("/", {headers});
  
}