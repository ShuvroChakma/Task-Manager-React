import TasksModel from "../models/TasksModel.js";
import mongoose from "mongoose";


export const CreateTask = async (req, res) => {
    try {
        // Extract user ID from req.user (set by AuthMiddleware)
        let user_id = req.user?.user_id;

        if (!user_id) {
            return res.status(400).json({ status: "fail", message: "User ID is required." });
        }

        let requestBody = req.body;
        requestBody.user_id = user_id; // Assign user ID from token, not headers

        await TasksModel.create(requestBody);

        return res.json({ status: "success", message: "Task created successfully" });
    } catch (e) {
        return res.status(500).json({ status: "fail", message: e.toString() });
    }
};




export const UpdateTaskStatus=async(req,res)=>{
    try {
        let id=req.params.id;
        let status=req.params.status;
        let user_id=req.user?.user_id;
        await TasksModel.updateOne({"_id":id,"user_id":user_id},{
            status:status
        })
        return res.json({status:"success",message:"Task Updated successfully"})
    }
    catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
}




export const TaskListByStatus=async(req,res)=>{
    try {
        let user_id=req.user?.user_id;
        let status=req.params.status;
        let data=await TasksModel.find({user_id: user_id,status: status})
        return res.json({status:"success",message:"Task List",data:data})
    }catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
}

export const DeleteTask=async(req,res)=>{
    try {
        let id=req.params.id;
        let user_id=req.user?.user_id;
        await TasksModel.deleteOne({"_id":id,"user_id":user_id})
        return res.json({status:"success",message:"Task deleted"})
    }
    catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
}

export const CountTask=async(req,res)=>{

    try {
        let ObjectId=mongoose.Types.ObjectId
        let user_id=new ObjectId(req.user?.user_id)
        let data=await TasksModel.aggregate([
            {$match:{user_id:user_id}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        return res.json({status:"success",message:"Count successfully",data:data})
    }
    catch (e) {
        return res.json({status:"fail",message:e.toString()})
    }
}