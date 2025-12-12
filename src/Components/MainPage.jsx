import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://todo-backend-1-q0tf.onrender.com';

function MainPage() {
    const { user, token } = useSelector(state => state.user)
    const userID = user?.id

    const [menuOpen, setMenuOpen] = useState(false)
    const [todo, setTodo] = useState({ todoText: '' })
    const [todoList, setTodoList] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    const openSideNav = () => setMenuOpen(!menuOpen)
    const handleChange = (e) => setTodo({ ...todo, [e.target.id]: e.target.value })

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
                    toast.success('Todo updated successfully')
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
            const res = await fetch(`${API_URL}/todo/viewtodo`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const out = await res.json()
            if (out.success) setTodoList(out.data)
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
            toast.error('Server Error')
            console.log(error)
        }
    }

    const editTodoList = (index) => {
        const todoItem = todoList[index]
        setTodo({ todoText: todoItem.todoText })
        setEditIndex(todoItem.id)
    }

    const deleteTodoList = async (id) => {
        try {
            const res = await fetch(`${API_URL}/todo/delete/${id}`, { method: 'DELETE' })
            const out = await res.json()
            if (out.success) {
                toast.success('Todo deleted successfully')
                viewTodo()
            }
        } catch (error) {
            toast.error("Server Error")
            console.log(error)
        }
    }

    const openUserProfile = () => navigate('/userprofile')
    const backtoHome = () => navigate('/')
    const userLogout = () => navigate('/login')

    useEffect(() => {
        if (userID && token) {
            axios.get(`${API_URL}/register/getuser/${userID}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setProfile(res.data.data)).catch(err => console.log(err))
        }
    }, [userID, token])

    return (
        <div className='min-h-screen w-full bg-gradient-to-t from-rose-300 to-indigo-500'>

            <div className='w-full h-16 bg-gray-100 flex justify-center items-center'>
                <p className='text-2xl font-bold text-red-500 drop-shadow-md'>Daily Task Manager</p>
            </div>


            <div className='w-full bg-orange-400/40 flex items-center px-4 py-2 relative'>
                <div className='text-3xl cursor-pointer md:hidden' onClick={openSideNav}>
                    {menuOpen ? "✖" : "☰"}
                </div>


                <div className='hidden md:flex gap-10 text-lg font-bold ml-4'>
                    <span className='cursor-pointer hover:text-white transition' onClick={backtoHome}>Home</span>
                    <span className='cursor-pointer hover:text-white transition'>About Us</span>
                    <span className='cursor-pointer hover:text-white transition'>Contact Us</span>
                    <span className='cursor-pointer hover:text-white transition' onClick={viewTodo}>View Todo</span>
                    <span className='cursor-pointer hover:text-white transition' onClick={userLogout}>Logout</span>
                </div>


                {menuOpen && (
                    <div className='fixed top-0 left-0 w-64 h-screen bg-white/95 z-50 flex flex-col shadow-xl animate-slide-in'>
                        <span className='self-end p-4 text-xl cursor-pointer' onClick={() => setMenuOpen(false)}>✖</span>
                        <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition' onClick={() => { backtoHome(); setMenuOpen(false) }}>Home</span>
                        <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition'>About Us</span>
                        <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition'>Contact Us</span>
                        <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition' onClick={() => { viewTodo(); setMenuOpen(false) }}>View Todo</span>
                        <span className='px-5 py-4 cursor-pointer hover:bg-orange-100 transition' onClick={() => { userLogout(); setMenuOpen(false) }}>Logout</span>
                    </div>
                )}


                <div className='ml-auto cursor-pointer' onClick={openUserProfile}>
                    <img src={profile.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt='profile'
                        className='w-10 h-10 rounded-full object-cover' />
                </div>
            </div>


            <div className='w-11/12 max-w-2xl mx-auto my-8 bg-white/15 backdrop-blur-sm rounded-2xl p-6 mt-[50px]'>
                <p className='text-center text-xl font-bold text-white mb-5'>Todo List</p>

                <form onSubmit={handleTodoSubmit} className='flex flex-col md:flex-row gap-3 justify-center'>
                    <input type='text' id='todoText' placeholder='Type and create your todo list...' value={todo.todoText} onChange={handleChange}
                        className='flex-1 p-0 rounded-lg outline-none text-base' />
                    <button type='submit' className='px-6 py-3 bg-green-500/60 hover:bg-green-500/80 rounded-lg font-bold transition'>
                        {editIndex ? 'Update' : 'Add'}
                    </button>
                </form>

                <div className='mt-6'>
                    <ul className='space-y-3'>
                        {todoList.map((itm, idx) => (
                            <li key={idx} className='flex flex-wrap items-center gap-3 p-3 bg-orange-50 rounded-lg'>
                                <input type='checkbox' id={`todo-${idx}`} checked={itm.completed} onChange={() => toggleTodo(idx)} className='w-5 h-5 cursor-pointer accent-green-600' />
                                <label htmlFor={`todo-${idx}`} className={`flex-1 ${itm.completed ? 'line-through text-gray-500' : ''}`}>
                                    {itm.todoText}
                                </label>
                                <div className='flex gap-2'>
                                    <button type='button' onClick={() => editTodoList(idx)} className='px-4 py-1 bg-green-500/60 hover:bg-green-500/90 rounded-full text-sm font-medium transition'>
                                        Edit
                                    </button>
                                    <button type='button' onClick={() => deleteTodoList(itm.id)} className='px-4 py-1 bg-red-500/60 hover:bg-red-500/90 hover:text-white rounded-full text-sm font-medium transition'>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainPage
