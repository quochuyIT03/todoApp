import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmpty = ({ filter }) => {
  return (
    <Card className="items-center justify-between">
      <div className="space-x-3">
        <Circle className="mx-auto size-10 text-accent-foreground" />
        <div>
          <h4 className="font-bold text-foreground">
            {filter === "active"
              ? "Không có ghi chú nào cần làm hết!"
              : filter === "completed"
                ? "Chưa có ghi chú nào hoàn thành!"
                : "Chưa có ghi chú, ghi thêm 1 ghi chú mới!"}
          </h4>
          <p className="text-foreground/50 text-center mt-2">
            {filter === "all" ? "Bấm vào nút Thêm để tạo ghi chú mới." : filter === "active" ? "Cần hoàn thành các ghi chú hiện có." : "Bạn đã hoàn thành hết các ghi chú!"}
          </p>
        </div>
      </div>
      
    </Card>
  );
};

export default TaskEmpty;
