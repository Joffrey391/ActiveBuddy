import dbConnect from "@/lib/dbConnect";
import { isAuth } from "@/lib/utils";
import { commentValidationSchema, validateSchema } from "@/lib/validator";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { isValidObjectId } from "mongoose";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
    const {method} = req

    switch(method){
        case 'POST': return createNewComment(req, res)
        case 'DELETE': return removeComment(req, res)
        case 'PATCH': return updateComment(req, res)

        default: res.status(404).send('Not found!')
    }
}

const createNewComment: NextApiHandler = async (req, res) => {
    const user = await isAuth(req, res)
    if(!user) return res.status(403).json({error: 'Unauthorized request!'});

    const error = validateSchema(commentValidationSchema, req.body)
    if(error) return res.status(422).json({error})

    await dbConnect()
    const {belongsTo, content} = req.body
    const post = await Post.findById(belongsTo)
    if(!post) return res.status(401).json({error: 'Invalid Post!'})

    const comment = new Comment({
        content,
        belongsTo,
        owner: user.id,
        chiefComment: true
    })

    await comment.save()
    res.status(201).json(comment)

}

const removeComment: NextApiHandler = async (req, res) => {
    const user = await isAuth(req, res)
    if(!user) return res.status(403).json({error: 'Unauthorized request!'});

    const {commentId} = req.query
    if(!commentId || !isValidObjectId(commentId)) return res.status(422).json({error: 'Invalid request!'})

    const comment = await Comment.findOne({_id: commentId, owner: user.id})
    if(!comment) return res.status(404).json({error: 'Comment not found!'})

    if(comment.chiefComment) {
        await Comment.deleteMany({repliedTo: commentId})
    } else {
        const chiefComment = await Comment.findById(comment.repliedTo)
        if(chiefComment?.replies?.includes(commentId as any)){
            chiefComment.replies = chiefComment.replies.filter((cId) => cId.toString() !== commentId)
            await chiefComment.save()
        }
    }
    await Comment.findByIdAndDelete(commentId);
    res.json({removed: true})

}

const updateComment: NextApiHandler = async (req, res) => {
    const user = await isAuth(req, res)
    if(!user) return res.status(403).json({error: 'Unauthorized request!'});

    const error = validateSchema(commentValidationSchema, req.body)
    if(error) return res.status(422).json({error})

    const {commentId} = req.query
    if(!commentId || !isValidObjectId(commentId)) return res.status(422).json({error: 'Invalid request!'})

    const comment = await Comment.findOne({_id: commentId, owner: user.id})
    if(!comment) return res.status(404).json({error: 'Comment not found!'})

    comment.content = req.body.content
    await comment.save()

    res.json(comment)
    

}

export default handler;