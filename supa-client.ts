import { createBrowserClient, serializeCookieHeader, parseCookieHeader ,createServerClient} from "@supabase/ssr"
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
                community_post_detail: {
                    Row:
                    SetNonNullable<
                        SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
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



export const browserClient = createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

//유저의 요청을 받아서 쿼리를 추출한 다음에 서버사이드 클라이언트에 전달해주는 역할
export const makeSSRClient = (request: Request) => {
    const headers = new Headers();
    const client = createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {cookies:{
            // supabase에게 유저의 쿠키를 전달하는 함수
            getAll(){
                //parseCookieHeader는 browser의 쿠키를 가져와서 supabase에 필요한 쿠기만 파싱해오는 함수
                return parseCookieHeader(request.headers.get("Cookie") ?? "");
            },
            // supabase가 유저의 쿠키를 설정하는 함수
            setAll(cookiesToSet){
                cookiesToSet.forEach(({name, value, options}) => {
                    headers.append("Set-Cookie", serializeCookieHeader(name, value, options));
                });
            },
        }
        }
    )
    return {client, headers};
}

//export default browserClient;

