import './App.css';
import React, {useReducer,useState, useEffect} from 'react';
import Input from "./components/UI/Input";
import Button from "./components/UI/Button";
import styled from "styled-components";

const initialState = {
  todos:[],
  loading: false,
  error:"",
};

const reducer = (state,action)=>{
  switch (action.type) {
    case "SET_TODOS":
      return {...state,todos:action.payload};

      case "FETCH_LOADING":
        return {...state,loading:action.payload};
    default:
      return state
  }
}
const TodoTitle = styled.h2`
  margin:10px;
  color:pink;
`

const TodoWrapper = styled.div`
  display: inline-block;
  margin: 2rem;
  background-color:aliceblue;

`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 10px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    border: 2px solid #39d5ab;
    border-radius:4px;
    background-color:#39d5ab;
    color:#e21895;
    font-weight:600;
    font-size:large
  }
`;
const LoadingImage = styled.img`
  width: 30% ;
  height: 30%;
  margin:2rem auto ;
`;

const App = ()=> {
  const [state, dispatch] = useReducer(reducer,initialState);
  const [value, setValue] = useState("");

  const getUsersData = async () => {
    dispatch({ type: "FETCH_LOADING", payload: true });
    try {
      const response = await fetch("https://todo-11ebd-default-rtdb.firebaseio.com/todo.json");
      const result = await response.json();
      if (result !== null && typeof result === "object") {
        const data = Object.entries(result).map(([id, value]) => {
          return {
            id,
            value,
          };
        });
        dispatch({ type: "SET_TODOS", payload: data });
      } else {
        dispatch({ type: "SET_TODOS", payload: [] }); 
      }
      dispatch({ type: "FETCH_LOADING", payload: false });
   } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: "FETCH_LOADING", payload: false });
    }
  };


 const onHandleAddItem= async()=>{
  await fetch(
    "https://todo-11ebd-default-rtdb.firebaseio.com/todo.json",
    {
      method:"POST",
      body:JSON.stringify({value} ),
    } );
    getUsersData();
    setValue("");
};
    

  useEffect(() =>{
    getUsersData();
  },[]);

  const onHandleDeleteItem  =async (id)=>{
    await fetch(`https://todo-11ebd-default-rtdb.firebaseio.com/todo/${id}.json`,
    {
     method:"DELETE",
   });
   getUsersData()
 };


  if (state.loading) {
    return <LoadingImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgBOIyMaIXRkqifCgF788csvK-tWPUsdMHmXeJ0vVKN7AldzEJnWznqSrSm_BobpbEVxU&usqp=CAU" alt="Loading..." />
  }


  return (
    <TodoWrapper>
      <TodoTitle>TODO LIST</TodoTitle>
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
    <Button onClick={onHandleAddItem}>ADD</Button>
    <TodoList>
      {state.todos.map((item) => (
        <li key={item.id}>
          {item.value.value}
          <Button onClick={() => onHandleDeleteItem(item.id)}>DELETE</Button>
        </li>
      ))}
    </TodoList>
  </TodoWrapper>
  );
 }
    
 export default App;