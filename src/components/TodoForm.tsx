import React, { useState } from 'react';
import { CreateTodoInput } from '../types/todo';

interface Props {
  onAdd: (input: CreateTodoInput) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDesc, setShowDesc] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, description: description.trim() });
    setTitle('');
    setDescription('');
    setShowDesc(false);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__row">
        <input
          className="todo-form__input"
          type="text"
          placeholder="할일을 입력하세요..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <button
          type="button"
          className="todo-form__desc-toggle"
          onClick={() => setShowDesc((v) => !v)}
          title="설명 추가"
        >
          {showDesc ? '−' : '+'}
        </button>
        <button className="todo-form__submit" type="submit">
          추가
        </button>
      </div>
      {showDesc && (
        <textarea
          className="todo-form__textarea"
          placeholder="설명 (선택)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      )}
    </form>
  );
}
