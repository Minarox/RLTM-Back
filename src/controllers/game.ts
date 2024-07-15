import { Elysia } from "elysia";
import { GameTopic, type MatchPayload, type StatisticsPayload, type StatisticPayload } from "../types/game.ts";
import type {Logestic} from "logestic";
import type {BunSQLiteDatabase} from "drizzle-orm/bun-sqlite";

export const game = (app: Elysia<"", false, {decorator: { logestic: Logestic, db: BunSQLiteDatabase }, store: {}, derive: {}, resolve: {}}>) => app
    // Web overlay
    .get("/game", (): string => {
        return 'Game';
    })

    // Rocket League
    .ws("/game", {
        beforeHandle({set, query, logestic}): string | void {
            query = Object.assign({}, query);
            if (!query.hasOwnProperty('token')) {
                logestic.warn("Token is missing");
                return (set.status = "Unauthorized");
            }
        },
        open(ws): void {
            app.decorator.logestic.info(`Game ${ws.id} connected with token ${(ws.data.query as any).token}`);
        },
        message(_ws, message: any): void {
            switch (message?.topic) {
                case GameTopic.MATCH:
                    getMatch(message.payload);
                    break;

                case GameTopic.STATISTICS:
                    getStatistics(message.payload);
                    break;

                case GameTopic.STATISTIC:
                    getStatistic(message.payload);
                    break;

                case GameTopic.ENTITIES:
                    getEntities(message.payload);
                    break;
            }
        },
        close(ws): void {
            app.decorator.logestic.info(`Game ${ws.id} disconnected`);
        }
    })

function getMatch(payload: MatchPayload): void {
    console.log(payload);
}

function getStatistics(payload: StatisticsPayload): void {
    console.log(payload);
}

function getStatistic(payload: StatisticPayload): void {
    console.log(payload);
}

function getEntities(payload: any): void {
    console.log(payload);
}