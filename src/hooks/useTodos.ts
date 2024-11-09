import { useQuery } from '@tanstack/react-query';
import { fetchTodo, fetchTodos} from '../api/placeholderApi';

// 전체 todos 리스트를 가져오는 훅
export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
};

// 단일 todo를 가져오는 훅
export const useTodo = (id: number) => {
    return useQuery({
      queryKey: ['todo', id],
      queryFn: () => fetchTodo(id),
    });
  };
  