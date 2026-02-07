import { createTodo, getTodos,deleteTodo, } from "@/actions/todo-action";
import {useTodoStore} from "@/store/todo-store";
import {todoSchema} from "@/validations/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import {toggleTodo} from "@/actions/todo-action";

export const todoKeys = {
    all:["todos"],
    lists:()=> [...todoKeys.all,"list"] as const,
}
export const useCreateTodo = () => {

const queryClient = useQueryClient();  
const addTodo = useTodoStore((state:any) => state.addTodo);  
 return useMutation({
    mutationFn:(data) => createTodo(data),
    onSuccess:(result) => {
        if(result.success){
            addTodo(result.data);
            queryClient.invalidateQueries({
                queryKey:todoKeys.lists()
            });
        }
        
    }
 })


}


export  function useTodos(){
    const setTodos = useTodoStore((state:any)=> state.setTodos)

    return useQuery(
        {
            queryKey:todoKeys.lists(),
            queryFn:async() =>{
                const result = await getTodos();
                console.log(result);
                if(result.success){
                    setTodos(result.data);
                    return result.data;
                }
                throw new Error(result.error);
            }
        }
    )
}

export function useToggleTodo(){
    const queryClient = useQueryClient();
    const updateTodoInStore = useTodoStore((state:any) => state.updateTodo);

    return useMutation({
        mutationFn:(id:string) => toggleTodo(id),
        onSuccess:(result:any, id)=>{
            if(result.success){
                updateTodoInStore(id, {completed:result.data.completed});
                queryClient.invalidateQueries({
                    queryKey:todoKeys.lists()
                });

            }
        }
    })
}


export function useDeleteTodo(){
const queryClient = useQueryClient();
    const removeTodoInStore = useTodoStore((state:any) => state.removeTodo);

    return useMutation({
        mutationFn:(id:string) => deleteTodo(id),
        onSuccess:(result:any, id)=>{
            
            if(result.success){
                removeTodoInStore(id);
                queryClient.invalidateQueries({
                    queryKey:todoKeys.lists()
                });

            }
        }
    })
}