import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import dbConnect from "./dbConnect";
import Post from "@/models/Post";

interface FormidablePromise<T> {
    files: { [key: string]: formidable.File };
    body: T;
}

export const readFile = async <T extends object>(
    req: NextApiRequest
): Promise<FormidablePromise<T>> => {
    const form = formidable();
    const [fields, files] = await form.parse(req);

    const result: any = {};

    if (!result.body) result.body = {};
    if (!result.files) result.files = {};

    for (let key in fields) {
        result.body[key] = fields[key][0];
    }

    for (let key in files) {
        const file = files[key][0];
        result.files[key] = file;
    }

    return result;
};

export const readPostsFromDb = async (limit: number, pageNo: number) => {
    const skip = limit * pageNo;
    await dbConnect();
    await Post.find().skip(skip).limit(limit);
};