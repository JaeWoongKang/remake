create function public.handle_new_user()
returns tigger
language plpgsql
security definer
set search_path = public
as $$
begin
   if new.raw_app_meta_data is not null then
      if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data->>'provider' = 'email' then
            insert into public.profiles (name, username, role) 
         values ('Anonymous','@mr.' ||substr(md5(random()::text), 1, 8) ,'developer');
      end if;
    end if;
    return new;
end
$$;

create trigger handle_new_user
after insert on auth.users
for each row
execute function public.handle_new_user();