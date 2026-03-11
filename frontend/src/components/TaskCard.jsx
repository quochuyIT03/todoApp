import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";


const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || ""); 

  const deleteTask =async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      toast.success("Nhiệm vụ đã xóa.")
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi xóa task.", error)
      toast.error("Lỗi xảy ra khi xóa task.");
    }
  }

  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status === 'active'){
        await api.put(`/tasks/${task._id}`, {
          status: 'completed', 
          completedAt: new Date().toISOString(),
        })
        toast.success(`${task.title} đã hoàn thành.`)
      }else{
        await api.put(`/tasks/${task._id}`, {
          status: 'active', 
          completedAt: null
        })
        toast.success(`${task.title} đã đổi sang chưa hoàn thành`)
      }

      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi xảy ra khi cập nhật task.", error)
      toast.error("Lỗi xảy ra khi cập nhật task.");
    }
  }

  const updateTask = async () => {
    try {
      setIsEditting(false)
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
      })
      toast.success(`Nhiệm vụ đã đổi thành ${updateTaskTitle}`)
      handleTaskChanged();  
    } catch (error) {
      console.error("Lỗi xảy ra khi sửa task.", error)
      toast.error("Lỗi xảy ra khi sửa task.");
    }
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      updateTask();

    }
  }

  return (
    <Card
      className={cn(
        "group p-4 bg-blue-100 border-0 hover:shadow-amber-500 transition-all duration-300 animate-in my-5 ",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full",
            task.status === "completed" ? "text-success hover:text-success/80" : "text-muted-foreground hover:text-primary"
            
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5 text-emerald-500" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* TITLE + DATE */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="to do...."
              className="h-10 text-base"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false); 
                setUpdateTaskTitle(task.title || "")
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}

          {/* DATE xuống dòng */}
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
            <Calendar className="size-3" />
            <span>{new Date(task.createdAt).toDateString()}</span>
            <span>{new Date(task.createdAt).toLocaleTimeString()}</span>
            {task.completedAt && (
              <>
                <span>-</span>
                <Calendar className="size-3" />
                <span>{new Date(task.completedAt).toDateString()}</span>
                <span>{new Date(task.completedAt).toLocaleTimeString()}</span>
              </>
            )}
          </div>
        </div>

        {/* EDIT DELETE */}
        <div className="hidden gap-2 group-hover:inline-flex">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 size-8"
            onClick={() => setIsEditting(true)}
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 size-8"
            onClick={() => deleteTask(task._id)}
          >
            <Trash className="size-4" />
          </Button>
        </div>

      </div>
    </Card>
  );
};

export default TaskCard;