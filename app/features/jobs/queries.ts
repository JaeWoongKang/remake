import client from "supa-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "~/types/supabase.types";

export const getJobs = async (client:SupabaseClient<Database>,{
    limit = 10, 
    page = 1,
    type, 
    location, 
    salary
}: {
    limit?: number, 
    page?: number,
    type?: string, 
    location?: string, 
    salary?: string
}) => {
    // 페이지네이션 계산
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    // 기본 쿼리 설정
    let query = client.from("jobs")
        .select(`
            job_id,
            position,
            overview,
            company_name,
            company_logo,
            company_location,
            salary_range,
            job_type,
            job_location,
            created_at
        `)
        .range(from, to);
    
    // 필터 적용
    if(type) {
        query = query.eq("job_type", type as "full-time" | "part-time" | "freelance" | "internship");
    }
    if(location) {
        query = query.eq("job_location", location as "remote" | "in-person" | "hybrid");
    }
    if(salary) {
        query = query.eq("salary_range", salary as "$0 - $50,000" | "$50,000 - $70,000" | "$70,000 - $100,000" | "$100,000 - $120,000" | "$120,000 - $150,000" | "$150,000 - $250,000" | "$250,000+");
    }
    
    try {
        const { data, error } = await query;
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("데이터베이스 쿼리 오류:", error);
        throw error;
    }
}

// 단일 작업 조회 함수 추가
export const getJob = async (client:SupabaseClient<Database>,jobId: number) => {
    try {
        const { data, error } = await client.from("jobs")
            .select(`
                job_id,
                position,
                overview,
                company_name,
                company_logo,
                company_location,
                salary_range,
                job_type,
                job_location,
                created_at
            `)
            .eq("job_id", jobId)
            .single();
            
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("작업 조회 오류:", error);
        throw error;
    }
}

export const getJobById = async (client:SupabaseClient<Database>,{jobId}:{jobId: number}) => {
    const { data, error } = await client.from("jobs")
        .select(`
            *
        `)
        .eq("job_id", jobId)
        .single();
    if (error) {
        throw error;
    }
    return data;
}