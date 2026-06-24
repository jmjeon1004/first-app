// Supabase 테이블 스키마와 1:1 매핑되도록 설계
export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  status?: TodoStatus;
}

export type FilterType = 'all' | 'active' | 'completed';
