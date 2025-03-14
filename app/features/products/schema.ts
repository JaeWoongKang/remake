import { pgTable, bigint, text, timestamp, jsonb, uuid, integer, check, primaryKey } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
    product_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    how_it_works: text("how_it_works").notNull(),
    tagline: text("tagline").notNull(),
    icon: text("icon").notNull(),
    url: text("url").notNull(),
    stats: jsonb().notNull().default({ views: 0, reviews: 0, upvotes: 0}),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    //{onDelete: "cascade"}means that if the profile is deleted, the product will be deleted
    category_id: bigint({ mode: "number" }).references(() => categories.category_id, { onDelete: "set null" }).notNull(),
    //{onDelete: "set null"}means that if the category is deleted, the product will not be deleted, but the category will be set to null
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
    category_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity().notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});


export const product_upvotes = pgTable("product_upvotes", {
    product_id: bigint({ mode: "number" }).references(() => products.product_id, { onDelete: "cascade" }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }),
}, (table) => [primaryKey({ columns: [table.product_id, table.profile_id] })]);




export const reviews = pgTable(
    "reviews",
    {
        review_id: bigint({ mode: "number" })
            .primaryKey()
            .generatedAlwaysAsIdentity(),
        product_id: bigint({ mode: "number" }).references(
            () => products.product_id,
            {
                onDelete: "cascade",
            }
        ),
        profile_id: uuid().references(() => profiles.profile_id, {
            onDelete: "cascade",
        }),
        rating: integer().notNull(),
        review: text().notNull(),
        created_at: timestamp().notNull().defaultNow(),
        updated_at: timestamp().notNull().defaultNow(),
    },
    (table) => [check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`)]
);