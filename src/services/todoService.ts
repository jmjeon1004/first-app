import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { supabase } from '../lib/supabaseClient';

export interface ITodoService {
  getAll(): Promise<Todo[]>;
  create(input: CreateTodoInput): Promise<Todo>;
  update(id: string, input: UpdateTodoInput): Promise<Todo>;
  remove(id: string): Promise<void>;
}

class SupabaseTodoService implements ITodoService {
  async getAll(): Promise<Todo[]> {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title: input.title, description: input.description ?? '' }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const { data, error } = await supabase
      .from('todos')
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) throw error;
  }
}

export const todoService: ITodoService = new SupabaseTodoService();
