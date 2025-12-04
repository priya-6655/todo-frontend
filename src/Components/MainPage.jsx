import React, { useState } from 'react'
import './MainPage.css'

const API_URL = import.meta.env.VITE_API_URL;

function MainPage() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [todo, setTodo] = useState({ todoText: '' })
    const [todoList, setTodoList] = useState([])
    const [editIndex, setEditIndex] = useState(null)

    const openSideNav = () => {
        setMenuOpen(!menuOpen)
    }

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.id]: e.target.value
        })
    }

    const handleTodoSubmit = async (e) => {
        e.preventDefault();
        try {

            if (editIndex) {
                const res = await fetch(`${API_URL}/todo/edit`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editIndex, todoText: todo.todoText })
                })
                const out = await res.json()
                if (out.success) {
                    alert('Todo update successfully')
                    viewTodo()
                    setTodo({ todoText: "" })
                    setEditIndex(null)
                }
            } else {
                const res = await fetch(`${API_URL}/todo/addtodo`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(todo)
                })

                const out = await res.json()

                if (out.success) {
                    alert('Item added Successfully')
                    setTodo({ todoText: '' })
                } else {
                    alert(out.message || "Added failed");
                }
            }
        } catch (error) {
            alert('Server error!')
            console.log(error)
        }
    }

    const viewTodo = async () => {
        setMenuOpen(false)
        try {
            const res = await fetch(`${API_URL}/todo/viewtodo`)
            const out = await res.json()

            if (out.success) {
                setTodoList(out.data)
            } else {
                console.log(out.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleTodo = async (index) => {
        const updatedList = [...todoList]
        updatedList[index].completed = !updatedList[index].completed
        setTodoList(updatedList)

        const todoItem = updatedList[index]

        try {
            await fetch(`${API_URL}/todo/completed`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: todoItem.id, completed: todoItem.completed })
            })
        } catch (error) {
            console.log(error);
            alert('Server Error', error)
        }
    }

    const editTodoList = (index) => {
        const todoItem = todoList[index]
        setTodo({ todoText: todoItem.todoText })
        setEditIndex(todoItem.id)
    }

    const deleteTodoList = async (id) => {
        try {
            const res = await fetch(`${API_URL}/todo/delete/${id}`, {
                method: 'DELETE'
            })

            const out = await res.json()

            if (out.success) {
                alert('Todo deleted successfully')
                viewTodo()
            }
        } catch (error) {
            console.log(error)
            alert("Server Error")
        }
    }
    return (
        <>
            <div id='main_background'>
                <div id='header'>
                    <h1 className='rainbow-Text'>Daily Task Manager</h1>
                </div>

                <div className='navbar_container'>
                    <div id="hamburger" onClick={openSideNav}>&#9776;</div>
                    <div id='nav_bar' className={menuOpen ? "show" : ""}>
                        <span>Home</span>
                        <span>About Us</span>
                        <span>Contact Us</span>
                        <span onClick={viewTodo}>View_todo</span>
                    </div>
                </div>

                <div className='container'>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Todo List</h2>
                    <form onSubmit={handleTodoSubmit}>
                        <input type='text' id='todoText' placeholder='Type and create your todo list...' value={todo.todoText} onChange={handleChange} />
                        <button type='submit' className='todo-submit'>{editIndex ? 'Update' : 'Add'}</button>
                    </form>

                    <div className='ListContainer'>
                        <ul>
                            {todoList.map((itm, idx) => (
                                <li key={idx} className='todoItem'>
                                    <input type='checkbox' id={`todo-${idx}`} checked={itm.completed} onChange={() => toggleTodo(idx)} />
                                    <label htmlFor={`todo-${idx}`} style={{ textDecoration: itm.completed ? 'line-through' : 'none' }}>
                                        {itm.todoText}
                                    </label>
                                    <div className='buttons'>
                                        <button type='button' id='editBtn' onClick={() => editTodoList(idx)}>Edit</button>
                                        <button type='button' id='delBtn' onClick={() => deleteTodoList(itm.id)}>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>
        </>
    )
}

export default MainPage
