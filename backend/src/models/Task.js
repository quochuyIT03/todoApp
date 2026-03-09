import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, //Tự động xóa khoảng trắng thừa ở đầu hoặc cuối
    },
    status: {
      type: String,
      enum: ["active", "complete"],
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, //createAt và UpdateAt được mongodb tự động thêm vào
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
