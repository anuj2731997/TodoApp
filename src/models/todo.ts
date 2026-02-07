import mongoose from "mongoose";

 interface Todo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
    priority: Priority;
}

 enum Priority {
    Low = "low",
    Medium = "medium",
    High = "high",

}

const todoSchema = new mongoose.Schema<Todo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: Priority.Medium
    },

}, {
    timestamps: true
})


export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);
