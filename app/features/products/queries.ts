import { DateTime } from "luxon";
import { PAGE_SIZE } from "./constants";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/types/supabase.types";

export const productListSelect = `
    product_id,
    name,
    tagline,
    stats->>'upvotes' as upvotes,
    stats->>'views' as views,
    stats->>'reviews' as reviews
`;
export const getProductsByDateRange = async (client:SupabaseClient<Database>,{
    startDate,
    endDate,
    page =1
}: {
    startDate: DateTime;
    endDate: DateTime;
    page?: number;
}) => {
    const { data, error } = await client
        .from("products")
        .select(productListSelect)
        .order("stats->>'upvotes'", { ascending: false })
        .gte("created_at", startDate.toISO())
        .lte("created_at", endDate.toISO())
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    if (error) throw error;
    return data;
};

export const getProductsPagesByDateRange = async (client:SupabaseClient<Database>,
    {startDate,endDate}: {startDate: DateTime, endDate: DateTime},
) => {
    const { count, error } = await client
    .from("products")
    .select(`product_id`,{count: "exact", head: true})
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    if (error) throw error;
    if (!count) return 1;
    return Math.ceil(count / PAGE_SIZE);
};


export const getCategories = async (client:SupabaseClient<Database>) => {
    const { data, error } = await client
    .from("categories")
    .select(`category_id, name, description`);
    if (error) throw error;
    return data;
};  

export const getCategory = async (client:SupabaseClient<Database>,{categoryId}:{categoryId: number}) => {
    const { data, error } = await client
    .from("categories")
    .select(`category_id, name, description`)
    .eq("category_id", categoryId).single();
    if (error) throw error;
    return data;
}

export const getProductsByCategory = async (client:SupabaseClient<Database>,{categoryId, page}:{categoryId: number, page: number}) => {
    const { data, error } = await client
    .from("products")
    .select(`
        product_id, 
        name, 
        tagline, 
        stats->>'upvotes' as upvotes, 
        stats->>'views' as views, 
        stats->>'reviews' as reviews
    `)
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    if (error) throw error;
    return data;
}

export const getProductsByCategoryPages = async (client:SupabaseClient<Database>,{categoryId}:{categoryId: number}) => {
    const { count, error } = await client
    .from("products")
    .select(`product_id`,{count: "exact", head: true})
    .eq("category_id", categoryId);
    if (error) throw error;
    if (!count) return 1;
    return Math.ceil(count / PAGE_SIZE);
}

export const getProductsBySearch = async (client:SupabaseClient<Database>,{search, page}:{search: string, page: number}) => {
    const { data, error } = await client
    .from("products")
    .select(`
        product_id, 
        name, 
        tagline, 
        stats->>'upvotes' as upvotes, 
        stats->>'views' as views, 
        stats->>'reviews' as reviews
    `)
    .or(`name.ilike.%${search}%, tagline.ilike.%${search}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
    if (error) throw error;
    return data;
}

export const getProductsPagesBySearch = async (client:SupabaseClient<Database>,{search}:{search: string}) => {
    const { count, error } = await client
    .from("products")
    .select(`product_id`,{count: "exact", head: true})
    .or(`name.ilike.%${search}%, tagline.ilike.%${search}%`);
    if (error) throw error;
    if (!count) return 1;
    return Math.ceil(count / PAGE_SIZE);
}


export const getProductById = async (client:SupabaseClient<Database>,{productId}:{productId: number}) => {
    const { data, error } = await client
    .from("product_overview_view")
    .select('*')
    .eq("product_id", productId).single();
    if (error) throw error;
    return data;
}


export const getReviewsByProductId = async (client:SupabaseClient<Database>,{productId}:{productId: number}) => {
    const { data, error } = await client
    .from("reviews")
    .select(`
        review_id,
        rating,
        review,
        created_at,
        user:profiles!inner(
            name,   
            username,
            avatar
        )
        `)
    .eq("product_id", productId);
    if (error) throw error;
    return data;
}