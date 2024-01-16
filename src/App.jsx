// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useCallback } from 'react'
import ToDoEdit from './components/ToDoEdit';
import ToDoInsert from './components/ToDoInsert';
import ToDoList from './components/ToDoList';
import TodoTemplate from './components/ToDoTemplate';


// 1. 인풋창이 있고 버튼이 있다.
// 2. 인풋창에 값을 입력하고 버튼을 클릭하면 아이템이 추가가 된다.
// 3. 아이템 삭제 버튼을 누르면 삭제가 가능하다.

// useState로 일정 항목들 관리하기, 기본 값 3개 객체 넣어줌



function App() {
  const [todos, setTodos] = useState([
  {
    id: 1,
    text: '리액트 기초 알아보기',
    checked: true,
  },
  {
    id:2,
    text : '말해보카 1일 1강 하기',
    checked: true,
  },{
    id:3,
    text : '콰트 1일 3강 운동하기',
    checked: false,
  },
]);

  // 기본 값 3개 있으니깐 초기값 4부터 시작
  // useRef는 currnet 값이 바뀌어도 컴포넌트가 리렌더링 되지 않고, 컴포넌트가 리렌더링 되어도 current의 값을 잃지 않는다는 장점이 있습니다
  const nextId = useRef(4);

  const [selectedTodo, setSelectedTodo] = useState(null); // 클릭한 일정 항목을 가져옴
  const [insertToggle, setInsertToggle] = useState(false); // 플래그 역할을 해줄 state

  // 수정 팝업창을 보여줄 toggle 기능 구현
  const onInsertToggle = useCallback(() => {
    // 만일 selectedTodo에 값이 있다면(=일정 항목을 클릭한 상태라면) selectedTodo를 null로 리셋
    if(selectedTodo) {
      setSelectedTodo((selectedTodo) => null);
    }
    setInsertToggle((prev) => !prev);
  },[selectedTodo]);

  const onChangeSelectedTodo = (todo) => { //ToDoListItem의 수정 아이콘에 onClick 이벤트로 넣어줄 함수
    setSelectedTodo((selectedTodo) => todo);
  };

  // 새 객체 추가하기
  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo)); // concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
      nextId.current++; //nextId 1씩 더하기
      console.log("insert")
    },[]);
  
  // id를 인자로 받은 후, todos 배열에서 id가 일치하지 않는 것들만 모아 새로운 배열로 반환 => id 일치하면 제거
  const onRemove = useCallback(
    (id) => {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    },[]);

  const onUpdate = useCallback(
    (id, text) => {
      onInsertToggle();

      setTodos((todos) => 
      todos.map((todo) => (todo.id === id? { ...todo, text} : todo)),
      );
    },
    [onInsertToggle],
  );
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => 
        todo.id === id ? {...todo, checked: !todo.checked } :todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <ToDoInsert onInsert={onInsert} />
      <ToDoList 
      todos={todos}
      onToggle={onToggle}
      onRemove={onRemove}
      onChangeSelectedTodo={onChangeSelectedTodo}
      onInsertToggle={onInsertToggle}
      />
      {insertToggle && (
        <ToDoEdit
        onInsert={onInsert}
        selectedTodo={selectedTodo}
        onInsertToggle={onInsertToggle}
        onUpdate={onUpdate}
        insertToggle={insertToggle}
        />
      )}
    </TodoTemplate>
  );
}

export default App;
