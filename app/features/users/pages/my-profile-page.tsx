import { redirect } from "react-router";
import { Route } from "./+types/my-profile-page";
import { makeSSRClient } from "supa-client";
import { getUserById } from "../queries";
export async function loader({request}: Route.LoaderArgs) {
  // find user using the cookies
  const {client, headers} = makeSSRClient(request);
  const {data:{user}} = await client.auth.getUser();
  if(user){
    console.log(user);
    const profile = await getUserById(client, {id: user.id});
    return redirect(`/users/${profile.username}`);
  }
  return redirect(`/auth/login`);
}
