import { FilterType } from '../types/todo';

interface Props {
  filter: FilterType;
  counts: Record<FilterType, number>;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: '전체', value: 'all' },
  { label: '진행중', value: 'active' },
  { label: '완료', value: 'completed' },
];

export default function TodoFilter({ filter, counts, onFilterChange }: Props) {
  return (
    <div className="todo-filter">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          className={`todo-filter__btn ${filter === value ? 'todo-filter__btn--active' : ''}`}
          onClick={() => onFilterChange(value)}
        >
          {label}
          <span className="todo-filter__count">{counts[value]}</span>
        </button>
      ))}
    </div>
  );
}
