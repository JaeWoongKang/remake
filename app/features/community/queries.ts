import { DateTime } from "luxon";
import client from "supa-client"

export const getTopics = async () => {
    const { data, error } = await client.from("topics").select("name, slug");
    if (error) {
        throw error;
    }
    return data;
}


export const getPosts = async ({ limit, sorting, period = "all", keyword, topic }: 
    { limit: number, 
      sorting: "newest" | "popular", 
      period?: "all" | "day" | "week" | "month" | "year", 
      keyword?: string,
      topic?: string }) => {
    const baseQuery = client
        .from("community_post_list_view")
        .select("*").limit(limit);
    if (sorting === "newest") {
        baseQuery.order("created_at", { ascending: false });
    } else {
        const today = DateTime.now();
        if (period === "all") {
            baseQuery.order("upvotes", { ascending: false });
        } else if (period === "day") {
            baseQuery.gte("created_at", today.startOf("day").toISO());
            baseQuery.order("created_at", { ascending: false });
        } else if (period === "week") {
            baseQuery.gte("created_at", today.startOf("week").toISO());
            baseQuery.order("created_at", { ascending: false });
        } else if (period === "month") {
            baseQuery.gte("created_at", today.startOf("month").toISO());
            baseQuery.order("created_at", { ascending: false });
        } else if (period === "year") {
            baseQuery.gte("created_at", today.startOf("year").toISO());
            baseQuery.order("created_at", { ascending: false });
        }
        
    }

    if(keyword) {
        baseQuery.ilike("title", `%${keyword}%`);
    }
    if(topic) {
        baseQuery.eq("topic_slug", topic);
    }
    const { data, error } = await baseQuery;
    if (error) {
        throw error;
    }
    return data;
}


export const getPostById = async ({postId}: {postId: number}) => {
    const { data, error } = await client.from("community_post_detail").select("*").eq("post_id", postId).single();
    if (error) {
        throw error;
    }
    return data;
}