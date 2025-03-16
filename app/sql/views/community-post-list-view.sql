CREATE OR REPLACE VIEW community_post_list_view AS
SELECT
    posts.post_id,
    posts.title,
    posts.created_at,
    topics.name as topic,
    profiles.name as author,
    profiles.avatar as author_avatar,
    profiles.username as author_username,
    COUNT(upvotes.upvote_id) as upvotes,
    topics.slug as topic_slug
FROM posts
INNER JOIN topics USING (topic_id)
INNER JOIN profiles USING (profile_id)
LEFT JOIN post_upvotes USING (post_id)
GROUP BY posts.post_id, topics.name, 
topics.topic_id, profiles.name, 
profiles.profile_id, profiles.avatar, profiles.username