import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  //インプットのテキスト
  const [todoText, setTodoText] = useState("");
  //未完了のTodoテキスト
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  //完了のTodoテキスト
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = () => [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    //incompleteTodosの配列をコピー
    const newIncompleteTodos = [...incompleteTodos];
    //incompleteTodosのindex番目の配列を削除
    newIncompleteTodos.splice(index, 1);
    //setIncompleteTodosにセット
    setIncompleteTodos(newIncompleteTodos);
  };

  //完了を押したときの関数
  const onClickComplete = (index) => {
    //incompleteTodosの配列をコピー
    const newIncompleteTodos = [...incompleteTodos];
    //incompleteTodosのindex番目の配列を削除
    newIncompleteTodos.splice(index, 1);
    //newCompleteTodosに既存のcompleteTodosとさっき削除したincompleteTodos（index番目）をコピー
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    //setIncompleteTodosにセット
    setIncompleteTodos(newIncompleteTodos);
    //setCompleteTodosにセット
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODOは５個までだよ</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
