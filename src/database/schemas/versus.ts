import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { season } from "./season.ts";
import { team } from "./team.ts";

export interface Versus {
    id: number;
    seasonId: number;
    team1Id: number;
    team2Id: number;
    length: number;
    createdAt: string;
    playedAt: string;
}

export const versus = sqliteTable("versus", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    seasonId: integer("season_id").references(() => season.id),
    team1Id: integer("team_1_id").notNull().references(() => team.id),
    team2Id: integer("team_2_id").notNull().references(() => team.id),
    length: integer("length").notNull().default(5),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    playedAt: text("played_at")
});