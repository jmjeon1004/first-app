import './App.css';
import TodoFilter from './components/TodoFilter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export default function App() {
  const {
    todos,
    loading,
    error,
    filter,
    counts,
    setFilter,
    addTodo,
    updateTodo,
    removeTodo,
    toggleStatus,
  } = useTodos();

  return (
    <div className="app">
      <div className="app__card">
        <header className="app__header">
          <h1 className="app__title">할일 목록</h1>
          <p className="app__subtitle">오늘 해야 할 일을 기록하세요</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoFilter filter={filter} counts={counts} onFilterChange={setFilter} />

        {error && <div className="app__error">{error}</div>}

        <TodoList
          todos={todos}
          loading={loading}
          onToggle={toggleStatus}
          onUpdate={updateTodo}
          onRemove={removeTodo}
        />

        {counts.completed > 0 && (
          <footer className="app__footer">
            완료된 항목 {counts.completed}개
          </footer>
        )}
      </div>
    </div>
  );
}
