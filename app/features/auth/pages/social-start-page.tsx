import { Button } from "~/common/components/ui/button";
import { Route } from "./+types/social-start-page";
import { makeSSRClient } from "supa-client";
import { z } from "zod";
import { redirect } from "react-router";

const paramSchema = z.object({
  provider: z.enum(["kakao", "github"]),
});

export const loader = async ({params, request}: Route.LoaderArgs) => {
  const {success, data} = paramSchema.safeParse(params);
  if(!success){
    return redirect("/auth/login");
  }
  const {provider} = data;
  const {client, headers} = makeSSRClient(request );
  const redirectoTo = `http://localhost:5173/auth/social/${provider}/complete`;
  const {data:{url}, error} = await client.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectoTo,
    },
  });
  if(url){
    return redirect(url,{headers});
  }
  if(error){
    throw error; 
  }
}