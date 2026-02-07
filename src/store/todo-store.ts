import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {todoSchema} from "@/validations/todo";
import {any, z} from 'zod';
import { id } from "date-fns/locale";
type todoType = z.infer<typeof todoSchema>;

export const useTodoStore = create(
    devtools(
        (set,get)=>({
            todos:[],
            filter:"all",
            isLoading:false,
            setTodos:(todos:todoType)=>set({todos}),
            addTodo:(todo:todoType)=> set((state:any)=> ({
                todos:[todo, ...state.todos]
            })),
            setFilter:(filter:string)=>set({filter}),
            setIsLoading:(isLoading:boolean)=>set({isLoading}),
            filteredTodos:()=>{
                
                const {todos,filter} = get() as {todos: todoType[], filter: string};
                switch (filter){
                    case "active":
                        return todos.filter((todo:any)=> !todo.completed);
                    case "completed":
                        return todos.filter((todo:any)=> todo.completed);
                    default:
                        return todos;
                }
            },
            completedCount:()=>(get() as {todos: todoType[]}).todos.filter((todo:any)=> todo.completed).length,
            activeCount:()=> (get() as {todos: todoType[]}).todos.filter((todo:any)=> !todo.completed).length,
            updateTodo:(id:string, todo:todoType)=> set((state:any)=> ({
                todos:state.todos.map((t:any)=> t._id === id ? {...t,...todo} : t),

            })),
            removeTodo:(id:string)=>{
                set((state:any)=>({
                    todos:state.todos.filter((todo:any)=> todo._id !== id)
                }))
            }
            
            
        }),
        {
            name:"todo-store"
        }
    )
)