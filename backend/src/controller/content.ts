import { Request, Response } from "express";
import ContentModel from "../models/content";
import UserModel from "../models/user";

function removeSensitiveFields(obj: any, blacklist: string[]) {
  const filtered: any = { ...obj }; // copy all fields
  for (const field of blacklist) {
    if (field in filtered) delete filtered[field]; // remove sensitive fields
  }
  return filtered;
}

export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, link, type, tags, userId } = req.body;

    const loggedInUser = await UserModel.findById(userId);

    if (!loggedInUser) {
      res.status(401).json({
        success: false,
        message: "you are not authorized!",
      });
      return;
    }

    const result = await ContentModel.create({
      userId,
      title,
      link,
      type,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "content created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getContentBulk = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const results = await ContentModel.find({ userId }).populate(
      "userId",
      "email username"
    );
    if (results.length === 0) {
      res.status(204).json({
        success: false,
        message: "you don't have any content",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "content fetched successfully",
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id;
    const userId = req.body.userId;

    const result = await ContentModel.findOne({ _id: contentId, userId });

    if (!result) {
      res.status(404).json({
        success: false,
        message: "content does not exist",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "content fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};



export const updateContent = async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id;
    const userId = req.body.userId;

   
    const updateData = removeSensitiveFields(req.body, ["userId", "_id", "createdAt"]);

    
    if (Object.keys(updateData).length === 0) {
       res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
      return;
    }

    const result = await ContentModel.findOneAndUpdate(
      { _id: contentId, userId }, // authorization check
      updateData,
      { new: true }
    );

    if (!result) {
       res.status(404).json({
        success: false,
        message: "Content not found or not authorized",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while updating content",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const contentId = req.params.id;
    const userId = req.body.userId;

    const result = await ContentModel.findOneAndDelete({
      _id: contentId,
      userId,
    });

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Content not found or not authorized to delete",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "content deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
