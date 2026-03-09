import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

const TaskCard = ({ task, index }) => {
  let isEditting = false;

  return (
    <Card
      className={cn(
        "group p-4 bg-blue-100 border-0 hover:shadow-amber-500 transition-all duration-300 animate-in my-5 ",
        task.status === "complete" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 size-8 rounded-full"
        >
          {task.status === "complete" ? (
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
            />
          ) : (
            <p
              className={cn(
                "text-base",
                task.status === "complete"
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
            <span>{new Date(task.createAt).toDateString()}</span>

            {task.completedAt && (
              <>
                <span>-</span>
                <Calendar className="size-3" />
                <span>{new Date(task.completedAt).toLocaleString()}</span>
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
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 size-8"
          >
            <Trash className="size-4" />
          </Button>
        </div>

      </div>
    </Card>
  );
};

export default TaskCard;