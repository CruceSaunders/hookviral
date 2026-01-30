export interface Profile {
  id: string;
  email: string;
  name: string | null;
  plan: 'free' | 'pro' | 'lifetime';
  stripe_customer_id: string | null;
  generations_today: number;
  generations_total: number;
  created_at: string;
  updated_at: string;
}

export interface Hook {
  id: string;
  text: string;
  niche: string;
  style: string | null;
  source_url: string | null;
  view_count: number | null;
  save_count: number;
  tags: string[] | null;
  created_at: string;
}

export interface SavedHook {
  id: string;
  user_id: string;
  hook_id: string | null;
  custom_text: string | null;
  notes: string | null;
  created_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  topic: string;
  niche: string | null;
  style: string | null;
  hooks: GeneratedHook[];
  created_at: string;
}

export interface GeneratedHook {
  text: string;
  style: string;
  explanation: string;
  rating: number;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Profile>;
      };
      hooks: {
        Row: Hook;
        Insert: Omit<Hook, 'id' | 'created_at' | 'save_count'>;
        Update: Partial<Hook>;
      };
      saved_hooks: {
        Row: SavedHook;
        Insert: Omit<SavedHook, 'id' | 'created_at'>;
        Update: Partial<SavedHook>;
      };
      generations: {
        Row: Generation;
        Insert: Omit<Generation, 'id' | 'created_at'>;
        Update: Partial<Generation>;
      };
    };
  };
};
