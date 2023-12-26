import { isAdmin } from "@/lib/utils";
import Comment from "@/models/Comment";
import { LatestComment } from "@/utils/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET': return readLatestComments(req, res)

        default: res.status(404).send('Not found!')
    }
}

const readLatestComments: NextApiHandler = async (req, res) => {
    const admin = await isAdmin(req, res)
    if(!admin) res.status(403).json({error: 'Unathorized user!'})

    const limit = 5;

    const comments = await Comment.find({ chiefComment: true })
        .populate('owner')
        .limit(limit)
        .sort('-createdAt')
        .populate({
            path: 'belongsTo',
            select: 'title slug'
        })

        const latestComments : LatestComment[] = comments.map((comment: any) => ({
            id: comment._id,
            content: comment.content,
            owner: {
                id: comment.owner._id,
                name: comment.owner.name,
                avatar: comment.owner.avatar
            },
            belongsTo: {
                id: comment.belongsTo._id,
                title: comment.belongsTo.title,
                slug: comment.belongsTo.slug,
            }
        }))
        
    res.json({ comments: latestComments })
}



export default handler;