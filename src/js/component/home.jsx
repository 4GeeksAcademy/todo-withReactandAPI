import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

//create your first component
const Home = () => {
	const [todo, setTodo] = useState('')
	const [todos, setTodos] = useState([])
	const handleClick = () => {
		setTodos(prev => [...prev, todo])
		setTodo('')
	}
	
	useEffect (() => {
		if (todos.length > 0) {
			fetch('https://playground.4geeks.com/apis/fake/todos/user/httpscammy', {
			method: "PUT",
			body: JSON.stringify(todos.map(todo => ({label: todo, done: false}))),
			headers: {
		  	"Content-Type": "application/json"
			}
	  		})
	  		.catch(error => {//error handling
		  	console.log(error);
	  		});
		}
		} , [todos])

		window.onload() = () => {
			fetch('https://playground.4geeks.com/apis/fake/todos/user/httpscammy', {
			method: "GET",
			headers: {
		  	"Content-Type": "application/json"
			}
			.then
		}
	return (
		<div className="text-center">
			<h1 className="header">My Todos</h1>
			<input 
				type="text" 
				onChange={(evt) => setTodo(evt.target.value)} 
				value={todo}
				onKeyDown={(evt) => {
					if (evt.key === "Enter") {
						setTodos(prev => [...prev,todo]); 
						setTodo("");
					}
				}}
				placeholder="What do you need to do?"  
			/>
			
			<button 
				onClick ={() => setTodos(prev => [...prev,todo])}>
					Send
			</button>
			<ul>
				{todos.map((data, index) => 
					<li key={`${data}-${index}`}>{data} 
						<FontAwesomeIcon icon={faTrashCan} 
							onClick= {() => {
								setTodos(todos.filter((data, currentIndex) => index != currentIndex));
								}}/>
					</li>)}
			</ul>
			<div>
				{todos.length} tasks
			</div>
		</div>
	);
};

export default Home;
