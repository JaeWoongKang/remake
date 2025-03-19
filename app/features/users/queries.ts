import client from "supa-client";
import { productListSelect } from "../products/queries";
import { profiles } from "./schema";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/types/supabase.types";

export const getUserProfile = async (client:SupabaseClient<Database>,username: string) => {
  const { data, error } = await client
    .from("profiles")
    .select(`
        profile_id,
        username,
        name,
        role,
        headline,
        bio,
        avatar
        `)
    .eq("username", username).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserProducts = async (client:SupabaseClient<Database>,username: string) => {
  const { data, error } = await client
    .from("products")
    .select(`${productListSelect},
     profiles!products_profile_id_profiles_profile_id_fk!inner(
        profile_id
    )`)
    .eq("profiles.username", username);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserPosts = async (client:SupabaseClient<Database>,username: string) => {
    const { data, error } = await client
    .from("community_post_list_view")
    .select(`
        *
    `)
    .eq("author_username", username);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}