import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "supa-client";

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("profiles_view")
    .select(
      `
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio,
        followers:stats->>followers,
        following:stats->>following,
        is_following
        `
    )
    .eq("username", username)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserById = async (
  client: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("profiles_view")
    .select(
      `
        profile_id,
        name,
        username,
        avatar
        `
    )
    .eq("profile_id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserProducts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("product_list_view")
    .select(
      `
        *,
        profiles!products_to_profiles!inner (
            profile_id
        )
    `
    )
    .eq("profiles.username", username);
  if (error) {
    throw error;
  }
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) {
    throw error;
  }
  return data;
};
