import { useEffect, useState } from 'react';
import TodoInput from './component/TodoInput';
import TodoList from './component/TodoList';
import MemoInput from './component/MemoInput';
import style from './css/App.module.css';
import { SearchOutlined } from '@ant-design/icons';

function App() {
  // R: 로컬스토리지에서 메모 불러오기
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // 완료된 항목을 따로 관리
  const [completedTodos, setCompletedTodos] = useState(() => {
    const storedCompletedTodos = localStorage.getItem('completedTodos');
    return storedCompletedTodos ? JSON.parse(storedCompletedTodos) : [];
  });

  // useEffect로 메모 변경 시 로컬스토리지 업데이트
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [todos, completedTodos]);

  // C: 할 일 추가
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  // U: 할 일 수정
  const updateTodo = (id, updatedText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedText } : todo
      )
    );
  };

  // U: 완료 여부 토글
  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;

      // 완료된 항목을 완료된 리스트로 이동
      if (todo.completed) {
        setCompletedTodos([...completedTodos, todo]);
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        // 완료된 항목을 다시 원래 리스트로 이동
        setTodos([...todos, todo]);
        setCompletedTodos(completedTodos.filter((item) => item.id !== id));
      }
    }
  };

  // D: 할 일 삭제
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // D: 완료된 항목 삭제
  const deleteCompletedTodo = (id) => {
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  };

  //   // R 읽기
  //   const [todos, setTodos] = useState(() => {
  //     const storedTodos = localStorage.getItem("todos");
  //     return storedTodos ? JSON.parse(storedTodos) : [];
  //   });

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));

  // }, [todos]);

  //   // C 생성하기 - todo 등록
  // const addTodo = (text) => {
  //   setTodos([...todos, {
  //     id: Date.now(),
  //     text,
  //     completed: false
  //   }]);

  // };

  // //U 업데이트 - 텍스트 수정하기

  // const updateTodo = (id, updatedText) => {
  //   setTodos(todos.map((todo) => (todo.id === id ? {...todo, text: updatedText} : todo)));
  // };

  // //U 업데이트 - 완료 토글

  // const toggleComplete = (id) => {
  //   setTodos(todos.map((todo) => (todo.id === id ? {...todo, completed : !todo.completed} : todo )));

  // };

  // // D 삭제

  // const deleteTodo = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };

  // 검색기능 구현하기
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = searchQuery
    ? todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : todos;

  // 메모 기능 만들기
  // 지피티가 써줌!!! 주석까지 달아줌! 우와!!

  // R: 로컬 스토리지에서 메모 불러오기
  const [memo, setMemo] = useState(() => {
    const storedMemo = localStorage.getItem('memo');
    return storedMemo ? storedMemo : ''; // 로컬스토리지에서 memo가 있으면 불러오고 없으면 빈 문자열
  });

  // 메모를 로컬스토리지에 저장
  useEffect(() => {
    if (memo) {
      localStorage.setItem('memo', memo);
    }
  }, [memo]);

  // 메모 업데이트 함수
  const updateMemo = (text) => {
    setMemo(text);
  };

  // 메모 지우기 함수
  const clearMemo = () => {
    setMemo(''); // 메모 지우기
    localStorage.removeItem('memo'); // 로컬스토리지에서 삭제
  };

  return (
    <div className={style.App}>
      <h1>TODO-LiST SCENe</h1>
      <TodoInput addTodo={addTodo} />
      <div className={style.wrap}>
        {/* 1번 */}
        <div className={style.firstwrap}>
          <h2>LiST</h2>
        <TodoList
          // todos={todos}
          todos={filteredTodos}
          updateTodo={updateTodo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
        </div>

        {/* 2번 */}
        <div className={style.rightwrap}>
          <div className={style.searchInput}>
            <SearchOutlined className={style.ico} />
            <input
              type="search"
              placeholder="할 일을 검색할 수 있어요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 3번 */}
            <div className={style.thirdwrap}>
              <h2>메모 작성하기 📝</h2>
              <MemoInput
                memo={memo}
                updateMemo={updateMemo}
                clearMemo={clearMemo}
              />
            </div>
        </div>
      </div>

      {/* 완료된 항목 관리 
      여기에 div로 묶어서 선이랑 굴리기*/}
      <h2>완료된 항목</h2>
      <TodoList
        todos={completedTodos}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteCompletedTodo}
      />
    </div>
  );
}

export default App;
