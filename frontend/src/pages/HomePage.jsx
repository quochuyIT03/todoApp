import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatAndFilter from "@/components/StatAndFilter";
import TaskEmpty from "@/components/TaskEmpty";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTasklimit } from "@/lib/data";


const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState();
  const [page, setPage] = useState(1);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  }, [dateQuery]);

    const handleNextPage = () => {
    if(page < totalPages){
      setPage((prev) => prev + 1)
    }
  }; 

  const handlePreviousPage = () => {
    setPage((prev) => prev - 1); 
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskChange = () => {
    fetchTasks();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filter, dateQuery])

  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";

      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTasklimit, 
    page * visibleTasklimit
  ); 

  useEffect(() => {
  if (page > 1 && visibleTasks.length === 0) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage((prev) => prev - 1);
  }
}, [visibleTasks, page]);

  const totalPages = Math.ceil(filteredTasks.length / visibleTasklimit);

useEffect(() => {
  if (page > totalPages) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(totalPages || 1);
  }
}, [totalPages, page]);

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Teal Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Your Content/Components */}

      <div className="container pt-8 mx-auto">
        <div className="w-full max-2xl p-6 mx-auto space-y-6 z-10 relative">
          <Header />

          <AddTask handleNewTaskAdded={handleTaskChange} />

          <StatAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <TaskList filterdTask={visibleTasks} filter={filter} handleTaskChanged={handleTaskChange} />

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination 
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
