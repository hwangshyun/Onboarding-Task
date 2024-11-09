import axios from 'axios';
import { Todo } from '../types/types';

const API_URL = 'https://jsonplaceholder.typicode.com';

// 전체 todo 리스트 가져오기
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};

// 단일 todo 가져오기
export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await axios.get(`${API_URL}/todos/${id}`);
  return response.data;
};
