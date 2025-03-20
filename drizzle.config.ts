import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
// 환경 변수 로드
dotenv.config();

// 디버깅을 위해 URL 출력
console.log("Database URL:", process.env.DATABASE_URL);

export default defineConfig({
    schema: "./app/features/**/schema.ts",
    out: "./app/sql/migrations",
    dialect : "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: true,
    },
})