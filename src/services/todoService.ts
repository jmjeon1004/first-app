import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

// Supabase로 교체할 때 이 인터페이스만 구현하면 됩니다.
export interface ITodoService {
  getAll(): Promise<Todo[]>;
  create(input: CreateTodoInput): Promise<Todo>;
  update(id: string, input: UpdateTodoInput): Promise<Todo>;
  remove(id: string): Promise<void>;
}

const STORAGE_KEY = 'todos';

// 현재 구현: LocalStorage
class LocalStorageTodoService implements ITodoService {
  private load(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private save(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  async getAll(): Promise<Todo[]> {
    return this.load();
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const todos = this.load();
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description ?? '',
      status: 'active',
      created_at: now,
      updated_at: now,
    };
    this.save([newTodo, ...todos]);
    return newTodo;
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const todos = this.load();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Todo ${id} not found`);

    const updated: Todo = {
      ...todos[index],
      ...input,
      updated_at: new Date().toISOString(),
    };
    todos[index] = updated;
    this.save(todos);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const todos = this.load().filter((t) => t.id !== id);
    this.save(todos);
  }
}

// Supabase 구현 (연결 시 주석 해제)
// import { supabase } from '../lib/supabaseClient'
// class SupabaseTodoService implements ITodoService {
//   async getAll(): Promise<Todo[]> {
//     const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false })
//     if (error) throw error
//     return data
//   }
//   async create(input: CreateTodoInput): Promise<Todo> {
//     const { data, error } = await supabase.from('todos').insert([{ title: input.title, description: input.description ?? '' }]).select().single()
//     if (error) throw error
//     return data
//   }
//   async update(id: string, input: UpdateTodoInput): Promise<Todo> {
//     const { data, error } = await supabase.from('todos').update({ ...input, updated_at: new Date().toISOString() }).eq('id', id).select().single()
//     if (error) throw error
//     return data
//   }
//   async remove(id: string): Promise<void> {
//     const { error } = await supabase.from('todos').delete().eq('id', id)
//     if (error) throw error
//   }
// }

// Supabase로 전환 시: new LocalStorageTodoService() → new SupabaseTodoService()
export const todoService: ITodoService = new LocalStorageTodoService();
