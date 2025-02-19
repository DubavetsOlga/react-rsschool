import { useDispatch } from 'react-redux';
import { AppDispatch } from '../api/store.ts';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
