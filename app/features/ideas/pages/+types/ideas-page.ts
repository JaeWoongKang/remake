import type { MetaFunction } from "react-router";

export namespace Route {
  export type ComponentProps = {
    loaderData: {
      ideas: {
        gpt_idea_id: number;
        idea: string;
        views: number;
        created_at: string;
        likes: number;
        is_claimed: boolean;
      }[];
    }
  }
  export type MetaFunction = MetaFunction;
} 