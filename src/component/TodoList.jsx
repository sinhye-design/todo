import TodoItem from './TodoItem';
import style from "../css/TodoList.module.css";






const TodoList = ({ todos, updateTodo, toggleComplete, deleteTodo }) => {
  return (
    <div className={style.ulcontainer}>
      <ul className={style.ul}>
        <h2>LiST</h2>
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
     </div>
  );
};

export default TodoList;