import React from "react";
import TaskEmpty from "./TaskEmpty";
import TaskCard from "./TaskCard";

const TaskList = ({filterdTask}) => {
  let filter = "all";

  if (!filterdTask || filterdTask.length === 0) {
    return <TaskEmpty filter={filter} />;
  }
  return(
    <div className="space-x-3 ">
        {filterdTask.map((task, index) => (
            <TaskCard key={task._id ?? index} task={task} index={index} />
        ))}
  </div>)
};

export default TaskList;
