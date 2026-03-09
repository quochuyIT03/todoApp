import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTTIONSTRING);
    console.log("Connect Database success!")
    } catch (error) {
        console.error("Error connect DB:", error)
        process.exit(1); //Đóng liên kết database nếu gặp lỗi 
    }
}