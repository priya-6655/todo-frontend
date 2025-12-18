import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import todoApi from '../feature/api/todoApi'
import LandingFooter from '../LandingPage/LandingFooter';

function MainPage() {
    const { user, token } = useSelector(state => state.user)
    const userID = user?.id

    const [menuOpen, setMenuOpen] = useState(false)
    const [todo, setTodo] = useState({ todoText: '' })
    const [todoList, setTodoList] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    const aboutRef = useRef(null)
    const contact = useRef(null)
    const topOfPage = useRef(null)
    const [contactUs, setContactUs] = useState({ name: "", email: "", message: "" })

    const openSideNav = () => setMenuOpen(!menuOpen)
    const handleChange = (e) => setTodo({ ...todo, [e.target.id]: e.target.value })

    const handleTodoSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editIndex) {
                const { response, data } = await todoApi.updateTodo({ id: editIndex, todoText: todo.todoText }, token)

                if (!response.ok) {
                    toast.warning(data.message || "You are unauthorized person")
                }
                if (data.success) {
                    toast.success('Todo updated successfully')
                    viewTodo()
                    setTodo({ todoText: "" })
                    setEditIndex(null)
                }
            } else {
                const { data } = await todoApi.addTodo(todo, token)

                if (data.success) {
                    toast.success('Item added Successfully')
                    setTodo({ todoText: '' })
                } else {
                    toast.error(data.message || "Added failed");
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
            const { response, data } = await todoApi.viewTodo(token)

            if (!response.ok) {
                toast.warning(data.message || 'You are not authorized person')
                return
            }

            if (data.success) {
                setTodoList(data.data)

                setTimeout(() => {
                    topOfPage.current?.scrollIntoView({ behavior: "smooth" })
                }, 100);
            }
        } catch (error) {
            console.log(error)
            toast.error("Network error")
        }
    }

    const toggleTodo = async (index) => {
        const updatedList = [...todoList]
        updatedList[index].completed = !updatedList[index].completed
        setTodoList(updatedList)
        const todoItem = updatedList[index]

        try {
            await todoApi.completeTodo({
                id: todoItem.id,
                completed: todoItem.completed
            }, token)

            if (todoItem.completed) {
                toast.warning('Your todo task completed')
            } else {
                toast.info('Todo marked as incomplete')
            }
        } catch (error) {
            toast.error('Server Error')
            console.log(error)
        }
    }

    const editTodoList = (index) => {
        const todoItem = todoList[index]
        setTodo({ todoText: todoItem.todoText })
        setEditIndex(todoItem.id)

        if (todoItem.completed) {
            toast.warning(`Can't edit task completed!`)
            return
        }
    }

    const deleteTodoList = async (id) => {
        try {
            const { response, data } = await todoApi.deleteTodo(id, token)

            if (!response.ok) {
                toast.warning(data.message || "You are not authorized person")
            }
            if (data.success) {
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
        const fetchProfile = async () => {
            if (userID && token) {
                try {
                    const { data } = await todoApi.getUserData(userID, token)
                    setProfile(data.data)
                } catch (err) {
                    console.log(err)
                }
            }
        }
        fetchProfile()
    }, [userID, token])

    const goToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const goToContact = () => {
        contact.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const goToHome = () => {
        topOfPage.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleContact = (e) => {
        setContactUs({
            ...contactUs,
            [e.target.name]: e.target.value
        })
    }

    const sendUserMessage = async (e) => {
        e.preventDefault()

        // Validation
        if (!contactUs.name.trim()) {
            toast.warning("Please enter your name")
            return
        }
        if (!contactUs.email.trim()) {
            toast.warning("Please enter your email")
            return
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(contactUs.email)) {
            toast.warning("Please enter a valid email")
            return
        }
        if (!contactUs.message.trim()) {
            toast.warning("Please enter your message")
            return
        }

        try {
            const { data } = await todoApi.sendContactMessage({
                userId: userID,
                name: contactUs.name,
                email: contactUs.email,
                message: contactUs.message
            }, token)

            if (data.success) {
                toast.success(data.message)
                setContactUs({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("Server Error");
        }
    }

    return (
        <>
            <div className='min-h-screen w-full bg-gradient-to-t from-rose-300 to-indigo-500 h-auto'>


                <div className='w-full h-16 bg-gray-100 flex justify-center items-center fixed top-0 left-0 z-40'>
                    <p className='text-2xl font-bold text-red-500 drop-shadow-md'>Daily Task Manager</p>
                </div>


                <div className='w-full bg-orange-400/40 flex items-center px-4 py-2 fixed top-16 left-0 z-30'>
                    <div className='text-3xl cursor-pointer md:hidden' onClick={openSideNav}>
                        {menuOpen ? "✖" : "☰"}
                    </div>

                    <div className='hidden md:flex gap-10 text-lg font-bold ml-4'>
                        <div className='flex justify-start'>
                            <img src="https://www.freepnglogos.com/uploads/logo-home-png/download-home-image-13.png" alt="home"
                                className="w-12 h-10 object-contain cursor-pointer hover:scale-110 transition-transform" onClick={backtoHome} />
                        </div>
                        <span className='cursor-pointer hover:text-white transition' onClick={goToHome}>Home</span>
                        <span className='cursor-pointer hover:text-white transition' onClick={goToAbout}>About Us</span>
                        <span className='cursor-pointer hover:text-white transition' onClick={goToContact}>Contact Us</span>
                        <span className='cursor-pointer hover:text-white transition' onClick={viewTodo}>View Todo</span>
                        <span className='cursor-pointer hover:text-white transition' onClick={userLogout}>Logout</span>
                    </div>


                    {menuOpen && (
                        <div className='fixed top-0 left-0 w-64 h-screen bg-white/95 z-50 flex flex-col shadow-xl animate-slide-in'>
                            <span className='self-end p-4 text-xl cursor-pointer' onClick={() => setMenuOpen(false)}>✖</span>
                            <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition' onClick={() => { goToHome(); setMenuOpen(false) }}>Home</span>
                            <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition' onClick={() => { goToAbout(); setMenuOpen(false) }}>About Us</span>
                            <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition' onClick={() => { goToContact(); setMenuOpen(false) }}>Contact Us</span>
                            <span className='px-5 py-4 border-b cursor-pointer hover:bg-orange-100 transition' onClick={() => { viewTodo(); setMenuOpen(false) }}>View Todo</span>
                            <span className='px-5 py-4 cursor-pointer hover:bg-orange-100 transition' onClick={() => { userLogout(); setMenuOpen(false) }}>Logout</span>
                        </div>
                    )}

                    <div className='ml-auto cursor-pointer' onClick={openUserProfile}>
                        <img src={profile.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt='profile'
                            className='w-10 h-10 rounded-full object-cover' />
                    </div>
                </div>

                <div className='w-11/12 max-w-2xl mx-auto bg-white/15 backdrop-blur-sm rounded-2xl p-6 pt-6 mt-[140px] scroll-mt-[140px]' ref={topOfPage}>
                    <p className='text-center text-xl font-bold text-white mb-5'>Todo List</p>

                    <form onSubmit={handleTodoSubmit} className='flex flex-col md:flex-row gap-3 justify-center'>
                        <input type='text' id='todoText' placeholder='Type and create your todo list...' value={todo.todoText} onChange={handleChange}
                            className='flex-1 p-2 rounded-lg outline-none text-base' />
                        <button type='submit' className='px-3 py-2 bg-green-500/60 hover:bg-green-500/80 rounded-lg font-bold transition'>
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

                <div className='mt-[400px] scroll-mt-[140px]' ref={aboutRef}>
                    <h3 className='text-2xl text-violet-600 text-center font-bold underline'>Our Services</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 px-5 gap-4 mb-5'>

                        <div className='w-[300px] h-auto rounded-lg p-3 text-center border-white-600 border-2 mb-5 cursor-pointer 
                        hover:scale-105 hover:shadow-xl transition-transform duration-300'>
                            <h1 className='text-white font-bold'>Movie Ticket Booking</h1>
                            <p className='mt-3 font-bold'>Skip long queues and last-minute stress. Discover the latest movies,
                                pick your favourite showtime, choose the best seats, and book instantly. Enjoy a fast, smooth,
                                and hassle-free booking experience—because entertainment should always be easy.</p>
                            <div className='mt-3 flex justify-center'>
                                <img src='https://s3-alpha.figma.com/hub/file/4096328112/56374ffa-81cd-44df-b6fd-901d78965cfd-cover.png'
                                    className='w-[60px] h-[40]' />
                            </div>
                        </div>
                        <div className='w-[300px] h-auto rounded-lg p-3 text-center mb-5 border-2 border-white cursor-pointer 
                        hover:scale-105 hover:shadow-xl transition-transform duration-300'>
                            <h1 className='text-white font-bold'>Vegetable/Grocery Ordering</h1>
                            <p className='mt-3 font-bold'>Say goodbye to crowded markets. Order fresh, hand-picked vegetables and
                                groceries online and get them delivered straight to your home. Save time, eat healthy, and enjoy
                                farm-fresh goodness every day.</p>
                            <div className='mt-5 flex justify-center'>
                                <img src='https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-assortment-of-grocery-items-arranged-on-png-image_10536689.png'
                                    className='w-[60px] h-[40]' />
                            </div>
                        </div>
                        <div className='w-[300px] h-auto rounded-lg p-3 text-center mb-5 border-2 border-white cursor-pointer 
                        hover:scale-105 hover:shadow-xl transition-transform duration-300'>
                            <h1 className='text-white font-bold'>Todo List Management</h1>
                            <p className='mt-3 font-bold'>Stay focused and organised with our smart todo list. Create tasks, track
                                progress, and get things done without forgetting anything. Perfect for managing your day, work, and
                                personal goals—all from one simple tool.</p>
                            <div className='mt-4 flex justify-center'>
                                <img src='https://cdni.iconscout.com/illustration/premium/thumb/business-people-working-on-todo-list-illustration-svg-download-png-12722932.png'
                                    className='w-[60px] h-[40]' />
                            </div>
                        </div>

                        <div className='w-[300px] h-auto rounded-lg p-3 text-center mb-5 border-2 border-white cursor-pointer 
                        hover:scale-105 hover:shadow-xl transition-transform duration-300'>
                            <h1 className='text-white font-bold'>Dress Shopping</h1>
                            <p className='mt-4 font-bold'>Explore trendy collections, find your perfect look, and shop with confidence.
                                Enjoy a smooth browsing experience, secure checkout, and fashion that fits your lifestyle—all in one place.</p>
                            <div className='mt-5 flex justify-center'>
                                <img src='https://png.pngtree.com/png-clipart/20240313/original/pngtree-dress-shopping-with-mobile-online-product-ordering-and-payment-online-store-png-image_14580444.png'
                                    className='w-[60px] h-[40]' />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='mt-[350px] scroll-mt-[140px]' ref={contact}>
                    <h1 className='text-center text-white text-2xl font-bold underline'>Contact Us</h1>
                    <p className='text-center text-lg font-bold mt-3'>We'd love to hear from you!</p>
                    <p className='text-center text-lg font-bold mt-2'>Whether you have a question, feedback, or need support with our services, feel free to reach out. Our team is always ready to help you.</p>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 backdrop-blur-md p-8 rounded-2xl shadow-lg'>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white ">Contact Information</h3>

                            <div>
                                <p className="font-bold mb-3">Address</p>
                                <p className="opacity-90">
                                    123,Chutti Nova Solutions,<br />
                                    Chennai, Tamil Nadu – 600001
                                </p>
                            </div>

                            <div>
                                <p className="font-bold mb-3">Email</p>
                                <p className="opacity-90">support@multiservice.com</p>
                            </div>

                            <div>
                                <p className="font-bold mb-3">Phone</p>
                                <p className="opacity-90">+91 98765 43210</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-6 text-white">Send us a message</h3>

                            <form className="space-y-5" onSubmit={sendUserMessage}>
                                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg outline-none border focus:border-violet-500"
                                    name="name" value={contactUs.name} onChange={handleContact} />

                                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg outline-none border focus:border-violet-500"
                                    name="email" value={contactUs.email} onChange={handleContact} />

                                <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-3 rounded-lg outline-none border focus:border-violet-500 resize-none"
                                    name="message" value={contactUs.message} onChange={handleContact}></textarea>

                                <button type="submit" className="w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition">
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

            </div>

            <LandingFooter />
        </>
    )
}

export default MainPage

