export interface User {
    id: string;  // Changed from $id
    email: string;
    name: string;
    created_at: string;
}

export interface Resume {
    id: string;  // Changed from $id
    user_id: string;
    type: 'base' | 'ai_generated';
    parent_resume_id?: string;
    job_description?: string;
    created_at: string;
    last_updated: string;
    personal_info: {
        headline: string;
        contact: {
            email: string;
            phone: string;
            location: string;
        };
        skills_category: string;
        skills_list: string[];
        certifications?: string[];
    };
    work_experience: Array<{
        title: string;
        company: string;
        location: string;
        start_date: string;
        end_date?: string;
        description: string[];
        achievements?: string[];
    }>;
    education: Array<{
        institution: string;
        degree: string;
        field_of_study: string;
        start_date: string;
        end_date: string;
        grade?: string;
        description?: string[];
    }>;
    projects: Array<{
        title: string;
        description: string;
        technologies: string[];
        url?: string;
        start_date: string;
        end_date?: string;
        achievements?: string[];
    }>;
    links: Array<{
        platform: string;
        url: string;
    }>;
}
