import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatAndFilter = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = "all",
  setFilter
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-accent/50"
        >
        {FilterType.active}: {activeTasksCount}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-accent/50"
        >
        {FilterType.completed}: {completedTasksCount}
        </Badge>
      </div>

      <div className="flex gap-2 sm:flex-row">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
            onClick={() => setFilter(type)}
          >
            <Filter className="size-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatAndFilter;
