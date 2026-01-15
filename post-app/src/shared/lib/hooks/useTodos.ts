import React, { useMemo } from 'react';
import { useGetUserTodosQuery } from '../../api/todoApi';

const useTodos = (userId?: number) => {
    const { 
        data: todos = [],        // Данные с сервера
        isLoading,               // Загружаются ли данные
        error,                   // Ошибка если есть
        refetch                  // Функция для повторной загрузки
      } = useGetUserTodosQuery(userId!, {
        skip: !userId, // Не загружаем если нет userId
      })

      const completedTodos = useMemo(
        () => todos.filter(todo => todo.completed),
        [todos]
      )

      return {
        todos,
        isLoading,
        error,
        completedTodos,
        refetch

      }
}

export default useTodos