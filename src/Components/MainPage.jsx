import React, { useState } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-backend-1-q0tf.onrender.com';

//const API_URL = 'http://localhost:3000';

function MainPage() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [todo, setTodo] = useState({ todoText: '' })
    const [todoList, setTodoList] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const navigate = useNavigate()

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
                    toast.success('Todo update successfully')
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
                    toast.success('Item added Successfully')
                    setTodo({ todoText: '' })
                } else {
                    toast.error(out.message || "Added failed");
                }
            }
        } catch (error) {
            toast.error('Server error!')
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
            toast.error('Server Error', error)
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
                toast.success('Todo deleted successfully')
                viewTodo()
            }
        } catch (error) {
            console.log(error)
            toast.error("Server Error")
        }
    }

    const openUserProfile = () => {
        navigate('/userprofile')
    }

    const backtoHome = () => {
        navigate('/login')
    }
    return (
        <>
            <div id='main_background'>
                <div id='header'>
                    <p className='rainbow-Text fs-2 fw-bold'>Daily Task Manager</p>
                </div>

                <div className='navbar_container'>
                    <div id="hamburger" onClick={openSideNav}>
                        {menuOpen ? "✖" : "☰"}
                    </div>
                    <div id='nav_bar' className={menuOpen ? "show" : ""}>
                        <span className="closeBtn" onClick={() => setMenuOpen(false)}>✖</span>
                        <span onClick={backtoHome}>Home</span>
                        <span>About Us</span>
                        <span>Contact Us</span>
                        <span onClick={viewTodo}>View_todo</span>
                    </div>

                    <div className="profile-section">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" width="40" height="40"
                            style={{ borderRadius: "50%", cursor: "pointer" }} onClick={openUserProfile} />
                    </div>
                </div>

                <div className='container'>
                    <p>Todo List</p>

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
