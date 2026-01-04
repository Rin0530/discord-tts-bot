export type Json =
  | string
  | number
  | boolean
  | null
  | bigint
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pitch: {
        Row: {
          id: string
          pitch: number
        }
        Insert: {
          id: string
          pitch: number
        }
        Update: {
          id?: string
          pitch?: number
        }
        Relationships: []
      }
      wordsdict: {
        Row: {
          after: string
          before: string
          guild_id: string
          id: number
        }
        Insert: {
          after: string
          before: string
          guild_id: string
          id?: number
        }
        Update: {
          after?: string
          before?: string
          guild_id?: string
          id?: number
        }
        Relationships: []
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
