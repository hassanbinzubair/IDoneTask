import { useState, useEffect } from "react";
import "./App.css";
import Bottom from "./components/Bottom";
import Top from "./components/Top";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const toggleshowclass = () => {
    document.getElementById("finished").classList.toggle("toggleshow");
  };

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true);
  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const toggleFinished = () => {
    setShowFinished(!ShowFinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: todos.length * 2, todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => {
      return i.id === id;
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });

    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });

    setTodos(newTodos);
    saveToLS();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Top />
      <div className="container">
        <h1>IDoneTask - Manage your ToDos at one Place!</h1>
        <h2>Add a Todo</h2>
        <div className="addtodo">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            name="addATodo"
            id="addATodo"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="addbtn"
          >
            Add
          </button>
        </div>
        <div id="finished" className="finished">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={ShowFinished}
            name="toggle"
            id="toggle"
          />
          <label onClick={toggleshowclass} htmlFor="toggle">
            Show Finished
          </label>
        </div>
        <h2>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to Display</div>}
          {todos.map((item) => {
            return (
              (ShowFinished || !item.isCompleted) && (
                <div className="todo" key={item.id}>
                  <input
                    className="check"
                    onChange={handleCheckBox}
                    type="checkbox"
                    name={item.id}
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "strike" : ""}>
                    {item.todo}
                  </div>
                  <div className="buttons">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <Bottom />
    </>
  );
}

export default App;
