import { useOutletContext } from "react-router";
import { Route } from "./+types/profile-page";
import { makeSSRClient } from "supa-client";
import { getUserById } from "../queries";
export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | wemake" }];
};

export const loader = async ({ params , request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const {data:{user}} = await client.auth.getUser();
  if(user){
    const profile = await getUserById(client, {id: user.id});
    return 
  }
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      username: params.username,
    },
  });
  return null;
};

export default function ProfilePage() {
  const { bio, headline } = useOutletContext<{ bio: string; headline: string }>();
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">{headline}</p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}
