"use server";

import { revalidatePath } from "next/cache";
import Todo from "@/models/todo";
import { connectDB } from "@/lib/db";
import { todoSchema } from "@/validations/todo";
import { success } from "zod";
import { error } from "console";

export async function createTodo(data:any) {
    
    try{
        const parsedData = todoSchema.safeParse(data);
        if(parsedData.error){
            throw new Error(parsedData.error.message);

        }
        await connectDB();
        const todo = await Todo.create(parsedData.data);
        if(todo){

            revalidatePath("/");
        }
    
        return {
            success:true,
            data:JSON.parse(JSON.stringify(todo))
        }
        

    }catch(e){
        console.log("Error occure while creating todo",e);
        return {
            success:false,
            error:e instanceof Error ? e.message:"Something went wrong while creating todo"
        }

    }
}

export async function getTodos(){
    try{
        await connectDB();
        const todos = await Todo.find({}).sort({createdAt:-1}).lean();
        return {
            success:true,
            data:JSON.parse(JSON.stringify(todos))
        };
    }catch(e){
        console.log("Error occure while fetching todos",e);
        return {
            success:false,
            error:e instanceof Error ? e.message:"Something went wrong while fetching todos"
        };
    }
}

export async function toggleTodo(id:string){
    try{
        await connectDB();
        const todo = await Todo.findById(id);
        if(!todo){
            return {
                success:false,
                error:"Todo not found"
            }
        }
        todo.completed = !todo.completed;
        await todo.save();
        revalidatePath("/");
        return {
            success:true,
            data:JSON.parse(JSON.stringify(todo))
        }
    }catch(e){
        console.log("Error occure while toggling todo",e);
        return {
            success:false,
            error:e instanceof Error ? e.message:"Something went wrong while toggling todo"
        };  
    }
}

export async function deleteTodo(id:string){
    try{
        await connectDB();
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            return {
                success:false,
                error:"Todo not found"
            }
        }
        revalidatePath("/");
        return {
            success:true,
            data:JSON.parse(JSON.stringify(todo))
        }
    }catch(e){
        console.log("Error occure while deleting todo",e);
        return {
            success:false,
            error:e instanceof Error ? e.message:"Something went wrong while deleting todo"
        };

    }
}