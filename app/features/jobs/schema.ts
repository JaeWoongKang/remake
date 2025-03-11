import { bigint, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core"   
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "./constants"

export const jobTypes= pgEnum("job_type", JOB_TYPES.map((type) => type.value) as [string, ...string[]])

export const jobLocations= pgEnum("job_location", LOCATION_TYPES.map((location) => location.value) as [string, ...string[]])

export const salaryRanges = pgEnum("salary_range", SALARY_RANGE.map((range) => range) as [string, ...string[]])

export const jobs = pgTable("jobs",{
    job_id: bigint({mode: "number"}).primaryKey().generatedAlwaysAsIdentity(),
    position: text("position").notNull(),
    overview: text("overview").notNull(),
    responsibilities: text("responsibilities").notNull(),
    qualifications: text("qualifications").notNull(),
    benefits: text("benefits").notNull(),
    skills: text("skills").notNull(),
    company_name: text("company_name").notNull(),
    company_url: text("company_url").notNull(),
    company_logo: text("company_logo").notNull(),
    company_location: text("company_location").notNull(),
    apply_url: text("apply_url").notNull(),
    job_type: jobTypes("job_type").notNull(),
    job_location: jobLocations("job_location").notNull(),
    salary_range: salaryRanges("salary_range").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
})