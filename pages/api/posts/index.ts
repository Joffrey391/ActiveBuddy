import dbConnect from "@/lib/dbConnect";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Joi from "joi";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;
    switch(method){
        case 'GET': {
            await dbConnect();
            res.json({ok: true});
        }
        case 'POST': return createNewPost(req, res);
    }
};

const createNewPost: NextApiHandler = (req, res) => {
    const { body } = req;
    const error = validateSchema(postValidationSchema, body);
    if(error) return res.status(400).json({ error });
    res.json({ok: true});
};

export default handler;