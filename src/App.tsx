import { useTodos, useTodo } from './hooks/useTodos';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {
  // 전체 todos 데이터 가져오기
  const { data: todos, isLoading: isTodosLoading } = useTodos();

  // 단일 todo 데이터 가져오기 (예: id = 1)
  const { data: todo, isLoading: isTodoLoading } = useTodo(1);

  if (isTodosLoading || isTodoLoading) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Todos List</h1>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>

        <h2>Single Todo (ID: 1)</h2>
        {todo && (
          <div>
            <p>ID: {todo.id}</p>
            <p>Title: {todo.title}</p>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
