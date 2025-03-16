import { createClient } from "@supabase/supabase-js";
import { Database as SupabaseDatabase } from "database.types";
import { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";

type Database = MergeDeep<SupabaseDatabase,
    {
        public: {
            Views: {
                product_overview_view: {
                    Row: SetFieldType<
                        SetNonNullable<
                            SupabaseDatabase["public"]["Views"]["product_overview_view"]["Row"]
                        >,
                        "reviews",
                        string | null
                    >
                },
                community_post_list_view: {
                    Row: SetFieldType<
                        SetNonNullable<
                            SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
                        >,
                        "author_avatar",
                        string | null
                    >
                },
                gpt_ideas_view: {
                    Row:
                    SetNonNullable<
                        SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
                    >
                }
            }
        }
    }
>   



const client = createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

export default client;