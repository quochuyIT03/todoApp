import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({handleNewTaskAdded}) => {
  const [newTask, setNewTask] = useState("");
  const addTask = async () => {
    if(newTask.trim()){
      try {
        await api.post("/tasks", {title: newTask})
        toast.success(`Nhiệm vụ ${newTask} được thêm thành công!`)
        handleNewTaskAdded();
      } catch (error) {
        console.error("Lỗi xảy ra khi thêm", error); 
        toast.error("Lỗi xảy ra khi thêm nhiệm vụ")
      }
      setNewTask("");
    }else{
      toast.error("Bạn cần nhập nhiệm vụ mới");
    }
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      addTask();

    }
  }

  return (
    <Card className="p-6 border-0">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="To do...."
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTask}
          onChange={(even) => setNewTask(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button variant="gradient" size="xl" className="px-6" onClick={addTask} disabled={!newTask.trim()}>
          <Plus className="size-5" /> Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
