import {sqliteTable, text, integer, SQLiteTable, blob} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { tournament } from "./tournament.ts";

export const season: SQLiteTable = sqliteTable("season", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    tournamentId: integer("tournament_id").references(() => tournament.id),
    name: text("name").notNull(),
    description: text("description"),
    teamLength: integer("team_length").notNull().default(3),
    defaultGameLength: integer("default_game_length").notNull().default(5),
    startAt: text("start_at").notNull(),
    endAt: text("end_at").notNull(),
    logo: blob("logo"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => sql`CURRENT_TIMESTAMP`)
});
