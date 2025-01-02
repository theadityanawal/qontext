export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string
          expiration_date: string | null
          id: string
          issue_date: string
          issuer: string
          name: string
          resume_id: string
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          expiration_date?: string | null
          id?: string
          issue_date: string
          issuer: string
          name: string
          resume_id: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          expiration_date?: string | null
          id?: string
          issue_date?: string
          issuer?: string
          name?: string
          resume_id?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certifications_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      education: {
        Row: {
          created_at: string
          degree: string
          description: string[] | null
          end_date: string | null
          field_of_study: string
          grade: string | null
          id: string
          institution: string
          resume_id: string
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          description?: string[] | null
          end_date?: string | null
          field_of_study: string
          grade?: string | null
          id?: string
          institution: string
          resume_id: string
          start_date: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          description?: string[] | null
          end_date?: string | null
          field_of_study?: string
          grade?: string | null
          id?: string
          institution?: string
          resume_id?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "education_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_info: {
        Row: {
          created_at: string
          headline: string
          id: string
          languages: Json[] | null
          location: string | null
          phone: string | null
          resume_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          headline: string
          id?: string
          languages?: Json[] | null
          location?: string | null
          phone?: string | null
          resume_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          headline?: string
          id?: string
          languages?: Json[] | null
          location?: string | null
          phone?: string | null
          resume_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "personal_info_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: true
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          achievements: string[] | null
          created_at: string
          description: string
          end_date: string | null
          id: string
          resume_id: string
          start_date: string
          technologies: string[] | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          achievements?: string[] | null
          created_at?: string
          description: string
          end_date?: string | null
          id?: string
          resume_id: string
          start_date: string
          technologies?: string[] | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          achievements?: string[] | null
          created_at?: string
          description?: string
          end_date?: string | null
          id?: string
          resume_id?: string
          start_date?: string
          technologies?: string[] | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          job_description: string | null
          last_updated: string
          parent_resume_id: string | null
          summary: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          job_description?: string | null
          last_updated?: string
          parent_resume_id?: string | null
          summary?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          job_description?: string | null
          last_updated?: string
          parent_resume_id?: string | null
          summary?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resumes_parent_resume_id_fkey"
            columns: ["parent_resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resumes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string
          id: string
          resume_id: string
          skills_list: string[]
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          resume_id: string
          skills_list: string[]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          resume_id?: string
          skills_list?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      social_links: {
        Row: {
          created_at: string
          id: string
          platform: string
          resume_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          platform: string
          resume_id: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          platform?: string
          resume_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_links_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      work_experience: {
        Row: {
          achievements: string[] | null
          company: string
          created_at: string
          description: string[] | null
          end_date: string | null
          id: string
          location: string
          resume_id: string
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          company: string
          created_at?: string
          description?: string[] | null
          end_date?: string | null
          id?: string
          location: string
          resume_id: string
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          company?: string
          created_at?: string
          description?: string[] | null
          end_date?: string | null
          id?: string
          location?: string
          resume_id?: string
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_experience_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export interface Language {
  language: string
  proficiency: string
}

export interface PersonalInfo {
  headline: string
  phone?: string
  location?: string
  languages?: Language[]
}

export interface WorkExperience {
  title: string
  company: string
  location: string
  start_date: string
  end_date?: string
  description: string[]
  achievements: string[]
}

export interface Education {
  institution: string
  degree: string
  field_of_study: string
  start_date: string
  end_date?: string
  grade?: string
  description: string[]
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  url?: string
  start_date: string
  end_date?: string
  achievements: string[]
}

export interface Skills {
  category: string
  skills_list: string[]
}

export interface Certification {
  name: string
  issuer: string
  issue_date: string
  expiration_date?: string
  url?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface Resume {
  id: string
  type: string
  is_active: boolean
  personal_info?: PersonalInfo
  work_experience?: WorkExperience[]
  education?: Education[]
  projects?: Project[]
  skills?: Skills[]
  certifications?: Certification[]
  social_links?: SocialLink[]
}
