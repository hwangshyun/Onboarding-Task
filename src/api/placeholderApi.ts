import axios from 'axios';
import { Todo } from '../types/types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};
export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await axios.get(`${API_URL}/todos/${id}`);
  return response.data;
};
