import { FaRegTrashAlt } from 'react-icons/fa'

const style = {
    checkBox:`w-4 sm:w-6 h-4 sm:h-6`,
    li: `flex justify-between items-center border h-12 sm:h-16 p-3 bg-slate-200 rounded-md mt-2`,
    liCompleted: `flex justify-between items-center border h-12 sm:h-16 p-3 rounded-md mt-2 bg-green-300  `,
    text:`text-sm sm:text-xl md:text-xl text-purple-700 capitalize w-[70%] md:w-[90%]`,
    textCompleted:`text-sm sm:text-xl md:text-xl capitalize w-[70%] md:w-[90%] text-slate-400 opacity-[0.5] text-right`,


}
const Todo = ({todo, toggleComplete, deleteTodo}) => {

    return(
        <li className= {todo.completed ? style.liCompleted : style.li}>
            <input onChange={() => toggleComplete(todo)} className={style.checkBox} checked={todo.completed ? 'checked' : ''} type="checkbox" />
            <p className={todo.completed ? style.textCompleted : style.text} onClick={() => toggleComplete(todo)}>{todo.text}</p>
            <button onClick={() => deleteTodo(todo.id)} className='text-red-500 text-base md:text-2xl' ><FaRegTrashAlt /></button>
        </li>
    )

}
export default Todo