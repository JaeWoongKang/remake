create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
     if new.raw_app_meta_data is not null then
         if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
             insert into public.profiles (profile_id, name, username, role)
             values (new.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8), 'developer');
             if new.raw_user_meta_data ? 'name' and new.raw_user_meta_data ? 'username' then
                 insert into public.profiles (profile_id, name, username, role)
                 values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username', 'developer');
             else
                 insert into public.profiles (profile_id, name, username, role)
                 values (new.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8), 'developer');
             end if;
         end if;
     end if;
     return new;

create trigger handle_new_user
after insert on auth.users
for each row
execute function public.handle_new_user();