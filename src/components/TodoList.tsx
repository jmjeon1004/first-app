import { Todo, UpdateTodoInput } from '../types/todo';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  loading: boolean;
  onToggle: (id: string) => void;
  onUpdate: (id: string, input: UpdateTodoInput) => void;
  onRemove: (id: string) => void;
}

export default function TodoList({ todos, loading, onToggle, onUpdate, onRemove }: Props) {
  if (loading) {
    return <div className="todo-list__empty">불러오는 중...</div>;
  }

  if (todos.length === 0) {
    return <div className="todo-list__empty">할일이 없습니다 🎉</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
