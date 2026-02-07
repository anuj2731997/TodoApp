"use client"

import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";  
import { useTodoStore } from "@/store/todo-store";

function TodoFilter() {

    // @ts-ignore
    const {filter,setFilter,completedCount,activeCount} = useTodoStore();

    const filters = [
        {key:"all", label:"ALL",count:activeCount()+completedCount()},
        {key:"active", label:"ACTIVE",count:activeCount()},
        {key:"completed", label:"COMPLETED",count:completedCount()},
    ]
  return (
    <Card className="mb-6">
        <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    {filters.map(({key, label, count})=>(
                        <Button
                        key ={key}
                        variant = {filter === key ? "default" : "outline"}
                        size= 'sm'
                        onClick = {()=>setFilter(key)
                        
                        }
                        className="relative"
                        >

                            {label}
                            {count>0 && (
                                <span className="ml-2 bg-muted text-muted-foreground rounded-full px-2 py-1 text-xs">{count}</span>
                            )}
                        </Button>
                    ))}

                </div>
                

            </div>
        </CardContent>
    </Card>
  )
}

export default TodoFilter