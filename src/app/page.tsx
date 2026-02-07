import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CreateForm from "@/components/CreateForm";
import TodoList from "@/components/TodoList";
import TodoFilter from "@/components/todo-filter";
export default async function Home() {



  return (
    <div className="min-h-screen bg-background ">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Todo App</h1>
          <p className="text-muted-foreground">
            Built with Next.js, Tailwind CSS, Zustand, Tanstack Query, Zod, Shadcn UI, and Mongoose

          </p>


        </header>
        
        <main>
      <CreateForm></CreateForm>
      <TodoFilter></TodoFilter>
      <TodoList></TodoList>


        </main>

      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© 2023 Todo App</p>
      </footer>


    </div>
  );
}



