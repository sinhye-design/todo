import TodoItem from './TodoItem';
import style from "../css/TodoList.module.css";






const TodoList = ({ todos, updateTodo, toggleComplete, deleteTodo }) => {
  return (
     <ul className={style.ul}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
     </ul> 
  );
};

export default TodoList;