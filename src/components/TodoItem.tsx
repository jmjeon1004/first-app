import React, { useState } from 'react';
import { Todo, UpdateTodoInput } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, input: UpdateTodoInput) => void;
  onRemove: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onUpdate, onRemove }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    onUpdate(todo.id, { title: trimmed, description: editDesc.trim() });
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSave();
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setEditDesc(todo.description);
      setEditing(false);
    }
  };

  const isCompleted = todo.status === 'completed';

  if (editing) {
    return (
      <li className="todo-item todo-item--editing">
        <input
          className="todo-item__edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <textarea
          className="todo-item__edit-textarea"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          rows={2}
          placeholder="설명 (선택)"
        />
        <div className="todo-item__edit-actions">
          <button className="btn btn--save" onClick={handleSave}>저장</button>
          <button
            className="btn btn--cancel"
            onClick={() => {
              setEditTitle(todo.title);
              setEditDesc(todo.description);
              setEditing(false);
            }}
          >
            취소
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${isCompleted ? 'todo-item--completed' : ''}`}>
      <button
        className={`todo-item__checkbox ${isCompleted ? 'todo-item__checkbox--checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={isCompleted ? '완료 취소' : '완료'}
      >
        {isCompleted && '✓'}
      </button>
      <div className="todo-item__content" onDoubleClick={() => setEditing(true)}>
        <span className="todo-item__title">{todo.title}</span>
        {todo.description && (
          <span className="todo-item__description">{todo.description}</span>
        )}
      </div>
      <div className="todo-item__actions">
        <button className="btn btn--edit" onClick={() => setEditing(true)}>수정</button>
        <button className="btn btn--delete" onClick={() => onRemove(todo.id)}>삭제</button>
      </div>
    </li>
  );
}
