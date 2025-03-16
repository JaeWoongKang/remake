import { IdeaCard } from "~/features/ideas/components/idea-card";
import { getGptIdeas } from "~/features/ideas/queries";
import { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "My Ideas | wemake" }];
};

export const loader = async () => {
  const ideas = await getGptIdeas({limit: 5});
  return { ideas };
};

export default function DashboardIdeasPage( {loaderData}: {loaderData: Route.ComponentProps}) {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id.toString()}
            title={idea.idea}
            viewsCount={idea.views}
            postedAt={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
}
