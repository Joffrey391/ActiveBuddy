import { isAuth } from "@/lib/utils";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
    const {method} = req

    switch(method){
        case 'POST': return createNewComment(req, res)

        default: res.status(404).send('Not found!')
    }
}

const createNewComment: NextApiHandler = async (req, res) => {
    const user = await isAuth(req, res)
    if(!user) return res.status(403).json({error: 'Unauthorized request!'})
}

export default handler;