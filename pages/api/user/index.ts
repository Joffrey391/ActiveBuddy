import { isAdmin } from "@/lib/utils";
import User from "@/models/User";
import { LatestUserProfile } from "@/utils/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            return getLatestUsers(req, res);
        default:
            res.status(404).send('Not Found!');
    }
}

const getLatestUsers: NextApiHandler = async (req, res) => {
    const admin = await isAdmin(req, res)
    if (!admin) res.status(403).json({ error: "Unathorized request!" })

    const { pageNo = '0', limit = '5' } = req.query as { pageNo: string; limit: string }

    const results = await User.find({ role: 'user' })
        .sort({ createdAt: 'desc' })
        .skip(parseInt(pageNo) * parseInt(limit))
        .limit(parseInt(limit))
        .select('name email avatar provider')

    const users: LatestUserProfile[] = results.map(({ _id, email, name, avatar, provider }) => ({
        id: _id.toString(),
        name,
        avatar,
        email,
        provider
    }))

    res.json({ users })
}

export default handler;