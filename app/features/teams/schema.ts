import { sql } from "drizzle-orm";
import { bigint, check, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { PRODUCT_STAGES } from "./constant";
import { profiles } from "../users/schema";

export const productStage = pgEnum("product_stage", PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]]);


export const teams = pgTable("teams",{
    team_id : bigint({mode:"number"}).primaryKey().generatedAlwaysAsIdentity(),
    product_name : text().notNull(),
    team_size:integer().notNull(),
    equity_split:integer().notNull(),
    roles: text().notNull(),
    team_leader: uuid().references(() => profiles.profile_id),
    product_description: text().notNull(),
    product_stage: productStage("product_stage").notNull(),
    description : text().notNull(),
    created_at : timestamp("created_at").defaultNow().notNull(),
    updated_at : timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    check("team_size_check", sql`${table.team_size} BETWEEN 1 AND 100`),
    check("equity_split_check", sql`${table.equity_split} BETWEEN 1 AND 100`),
    check("product_description_check", sql`LENGTH(${table.product_description})<=200 `),
]);