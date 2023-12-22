import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/dbConnect";
import { formatPosts, readFile, readPostsFromDb } from "@/lib/utils";
import { postValidationSchema, validateSchema } from "@/lib/validator";
import Post from "@/models/Post";
import { IncomingPost } from "@/utils/types";
import formidable from "formidable";
import IncomingForm from "formidable/Formidable";
import Joi from "joi";
import { NextApiHandler } from "next";

export const config = {
    api: { bodyParser: false },
};   

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;
    switch(method){
        case 'GET': return readPosts(req, res);
        case 'POST': return createNewPost(req, res);
    }
};

const createNewPost: NextApiHandler = async (req, res) => {
    const { files, body } = await readFile<IncomingPost>(req);

    let tags = [];
    if(body.tags) tags = JSON.parse(body.tags as string);

    const error = validateSchema(postValidationSchema, {...body, tags});
    if(error) return res.status(400).json({ error });

    const { title, content, slug, meta } = body;

    await dbConnect();
    const alreadyExist = await Post.findOne({ slug });
    if(alreadyExist)
        return res.status(400).json({error: 'Slug need to be unique!'});

    const newPost = new Post({
        title,
        content,
        slug,
        meta,
        tags,
    });

    const thumbnail = files.thumbnail as formidable.File;
    if(thumbnail) {
        const { secure_url: url, public_id } = await cloudinary.uploader.
        upload(
            thumbnail.filepath, 
            {
            folder: 'active-buddy',
            }
        );
        newPost.thumbnail = {url, public_id};
    };
    await newPost.save();

    res.json({ post: newPost });
};

const readPosts: NextApiHandler = async (req, res) => {
    try {
        const { limit, pageNo } = req.query as { limit: string, pageNo: string };
        const posts = await readPostsFromDb(parseInt(limit), parseInt(pageNo));
        console.log(res.json({ posts: formatPosts(posts) }));   
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export default handler;