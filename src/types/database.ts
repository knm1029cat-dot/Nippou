export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          school_name: string | null;
          start_date: string;
          duration_days: number;
          main_goal: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          school_name?: string | null;
          start_date: string;
          duration_days?: number;
          main_goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          school_name?: string | null;
          start_date?: string;
          duration_days?: number;
          main_goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      daily_reports: {
        Row: {
          id: string;
          user_id: string;
          report_date: string;
          actions: string | null;
          learnings: string | null;
          progress: string | null;
          problems: string | null;
          tomorrow_tasks: string | null;
          comment: string | null;
          achievement_score: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          report_date: string;
          actions?: string | null;
          learnings?: string | null;
          progress?: string | null;
          problems?: string | null;
          tomorrow_tasks?: string | null;
          comment?: string | null;
          achievement_score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          report_date?: string;
          actions?: string | null;
          learnings?: string | null;
          progress?: string | null;
          problems?: string | null;
          tomorrow_tasks?: string | null;
          comment?: string | null;
          achievement_score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      weekly_goals: {
        Row: {
          id: string;
          user_id: string;
          week_start: string;
          goal: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          week_start: string;
          goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          week_start?: string;
          goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      weekly_reviews: {
        Row: {
          id: string;
          user_id: string;
          week_start: string;
          review_content: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          week_start: string;
          review_content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          week_start?: string;
          review_content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type DailyReport = Database["public"]["Tables"]["daily_reports"]["Row"];
export type WeeklyGoal = Database["public"]["Tables"]["weekly_goals"]["Row"];
export type WeeklyReview = Database["public"]["Tables"]["weekly_reviews"]["Row"];
