import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

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