"use client"
import { useState } from "react"
import {useForm } from "react-hook-form"
import {zodResolver } from "@hookform/resolvers/zod"
import {todoSchema} from "@/validations/todo";
import {createTodo} from "@/actions/todo-action";
import { toast } from "sonner";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

import {useCreateTodo} from "@/hooks/use-create-todo"




function CreateForm() {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  const form = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
    },
  })

  const onSubmit = async (data:any)=>{
    try{
    const result = await createTodoMutation.mutateAsync(data);
    if(result.success){
      toast.success("Todo created successfully");
      form.reset();
      setIsOpen(false);
    }else{
      toast.error(result.error);
    }
    }catch(error){
      toast.error("Error creating todo");
    }
  }

  if(!isOpen){
    return (
      <Button  className="w-full mb-6 " size='lg' onClick={() => setIsOpen(true)}>Create Todo</Button>
    )
  }
  return (
   <Card className="mb-6">
    <CardHeader>
      <CardTitle>Create Todo</CardTitle>
    </CardHeader>
    <CardContent>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title"> Title </Label>
          <Input id = "title" {...form.register("title")} placeholder="Enter todo title..."/>
          {form.formState.errors.title && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="description">Description </label>
          <Textarea 
          id = "description"
          {...form.register("description")}
          placeholder="Enter todo description (optional)..."
          rows={3}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>
          )}

          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
            value = {form.watch("priority")}
            onValueChange={(value:"low"|"medium"|"high")=> form.setValue("priority",value)}>

              <SelectTrigger>
                <SelectValue placeholder="Select priority" />

              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>



          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createTodoMutation.isPending}>
              {createTodoMutation.isPending ? "Creating..." : "Create"}
            </Button>
            <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setIsOpen(false);
            }}
            >
              Cancel
            </Button>
          </div>

      </form>

      </CardContent>
   </Card>
  )
}

export default CreateForm