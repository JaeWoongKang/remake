import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Route } from "./+types/idea-page";
import { getGptIdea } from "../queries";
export const meta = ({data : {idea :{gpt_idea_id, idea}}} : Route.MetaArgs) => {
  return [
    { title: `Ideas #${gpt_idea_id} | wemake` },
    { name: "description", content: idea },
  ];
};

export const loader = async ({params}: Route.LoaderArgs) => {
  const idea = await getGptIdea(Number(params.ideaId));
  return { idea };
};

export default function IdeaPage({loaderData}: Route.ComponentProps) {
  return (
    <div className="">
      <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">
          {loaderData.idea.idea}
        </p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span>123</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>12 hours ago</span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>12</span>
          </Button>
        </div>
        <Button size="lg">Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
