import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  app: `h-screen w-screen bg-gradient-to-r from-[#d076ff] to-[#8f2eca] via-[#f480df] text-center p-3 sm:p-6`,
  container: `p-3 sm:p-6 bg-gradient-to-l from-[#bc57af] to-[#8f2eca] border-[#bc57af] border-4 rounded-md max-w-[700px] w-full m-auto max-h-[97vh]`,
  heading: `font-bold text-3xl text-[#f9efff] mb-5`,
  searchCont: `w-full rounded-md p-3 sm:p-6 bg-slate-100 text-left overflow-y-scroll max-h-[80vh]`,
  form: `flex items-center justify-between mb-5 md:mb-10`,
  input: `border border-purple-400 sm:text-xl text-sm p-2 sm:p-3 w-4/5 `,
  button: `bg-purple-500 text-xl md:text-3xl border text-white p-2 sm:p-3 w-1/5 justify-center flex ml-3 `,
  count: `text-slate-200 m-2 md:m-3 text-base md:text-xl`
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  ///////////CREATE TODO//////////
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (!input) {
      alert("Please enter a valid text");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  /////////////READ TO DO FROM FIREBASE/////////////
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todoArr = [];
      QuerySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsubscribe;
  }, []);
  /////////////UPADATE TODO IN FIREBASE/////////////
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  /////////////DELETE TODO//////////
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.app}>
      <div className={style.container}>
        <h2 className={style.heading}>TODO LIST</h2>
        <div className={style.searchCont}>
          <form onSubmit={createTodo} className={style.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className={style.input}
            />
            <button className={style.button}>
              <AiOutlinePlus />
            </button>
          </form>

          <div>
            <ul>
              {todos.map((todo, index) => {
                return (
                  <Todo
                    key={index}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                  />
                );
              })}
            </ul>
          </div>

        </div>
          {todos.length < 1 ? null : <p className={style.count}>{`You have ${todos.length} todos`}</p>}
      </div>
    </div>
  );
}

export default App;
