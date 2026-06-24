import { useCallback, useEffect, useState } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput, FilterType } from '../types/todo';
import { todoService } from '../services/todoService';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAll();
      setTodos(data);
    } catch (e) {
      setError('할일 목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (input: CreateTodoInput) => {
    try {
      const newTodo = await todoService.create(input);
      setTodos((prev) => [newTodo, ...prev]);
    } catch {
      setError('할일을 추가하지 못했습니다.');
    }
  }, []);

  const updateTodo = useCallback(async (id: string, input: UpdateTodoInput) => {
    try {
      const updated = await todoService.update(id, input);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('할일을 수정하지 못했습니다.');
    }
  }, []);

  const removeTodo = useCallback(async (id: string) => {
    try {
      await todoService.remove(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('할일을 삭제하지 못했습니다.');
    }
  }, []);

  const toggleStatus = useCallback(
    async (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
      await updateTodo(id, {
        status: todo.status === 'active' ? 'completed' : 'active',
      });
    },
    [todos, updateTodo]
  );

  const filteredTodos = todos.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const counts = {
    all: todos.length,
    active: todos.filter((t) => t.status === 'active').length,
    completed: todos.filter((t) => t.status === 'completed').length,
  };

  return {
    todos: filteredTodos,
    loading,
    error,
    filter,
    counts,
    setFilter,
    addTodo,
    updateTodo,
    removeTodo,
    toggleStatus,
  };
}
