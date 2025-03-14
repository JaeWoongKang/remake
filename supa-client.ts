import { createClient } from "@supabase/supabase-js";
import { Database } from "database.types";

const supabaseUrl = "https://sayvoxrjlrsmqngitadv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNheXZveHJqbHJzbXFuZ2l0YWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3Njk0MzgsImV4cCI6MjA1NzM0NTQzOH0.cw5OF8p1UX93aRsX2afRzg0OOgm6r42aKStpb6IvZ8Y";


const client = createClient<Database>(
    supabaseUrl,
    supabaseKey
);

export default client;