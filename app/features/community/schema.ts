import { AnyPgColumn, bigint, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const topics = pgTable("topics",{
    topic_id : bigint({mode:"number"}).primaryKey().generatedAlwaysAsIdentity(),
    name : text().notNull(),
    slug : text().notNull(),
    created_at : timestamp("created_at").defaultNow().notNull(),
});


export const posts = pgTable("posts",{
    post_id : bigint({mode:"number"}).primaryKey().generatedAlwaysAsIdentity(),
    title : text().notNull(),
    content : text().notNull(),
    created_at : timestamp("created_at").defaultNow().notNull(),
    updated_at : timestamp("updated_at").defaultNow().notNull(),
    topic_id : bigint({mode:"number"}).references(()=>topics.topic_id, {onDelete:"cascade"}),
    profile_id : uuid().references(()=>profiles.profile_id, {onDelete:"cascade"}),
});

export const postUpvotes = pgTable("post_upvotes",{
    post_id : bigint({mode:"number"}).references(()=>posts.post_id, {onDelete:"cascade"}),
    profile_id : uuid().references(()=>profiles.profile_id, {onDelete:"cascade"}),
}, (table)=>[primaryKey({columns:[table.post_id, table.profile_id]})]);

export const postReplies = pgTable("post_replies",{
    reply_id : bigint({mode:"number"}).primaryKey().generatedAlwaysAsIdentity(),
    reply : text().notNull(),
    post_id : bigint({mode:"number"}).references(()=>posts.post_id, {onDelete:"cascade"}),
    parent_id: bigint({mode:"number"}).references(():AnyPgColumn=>postReplies.reply_id, {onDelete:"cascade"}),
    //같은 테이블의 댓글 아이디를 참조할 때 문제. 자체 참조를 할 때는 다음과 같이 AnyPgColumn을 사용해야 한다.
    profile_id : uuid().references(()=>profiles.profile_id, {onDelete:"cascade"}).notNull(),
    created_at : timestamp("created_at").defaultNow().notNull(),
    updated_at : timestamp("updated_at").defaultNow().notNull(),
});
