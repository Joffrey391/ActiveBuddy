import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import dbConnect from "./dbConnect";
import Post, { PostModelSchema } from "@/models/Post";
import { CommentResponse, PostDetail, UserProfile } from "@/utils/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IComment } from "@/models/Comment";
import { ObjectId } from "mongoose";

interface FormidablePromise<T> {
    files: { [key: string]: formidable.File };
    body: T;
}

export const readFile = async <T extends object>(
    req: NextApiRequest
): Promise<FormidablePromise<T>> => {
    const form = formidable();
    const [fields, files]: any = await form.parse(req);

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

export const readPostsFromDb = async (limit: number, pageNo: number, skip?: number) => {
    if (!limit || limit > 10)
        throw Error('Please use limit under 10 and valid pageNo');
    const finalSkip = skip || limit * pageNo;
    await dbConnect();
    const posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .select('-content')
        .skip(finalSkip)
        .limit(limit);

    return posts;

};

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
    return posts.map((post) => ({
        id: post._id.toString(),
        title: post.title,
        slug: post.slug,
        createdAt: post.createdAt.toString(),
        thumbnail: post.thumbnail?.url || '',
        meta: post.meta,
        tags: post.tags,
    }));
};

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    const user = session?.user as UserProfile;
    return user && user.role === 'admin';
}

export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    const user = session?.user;
    if(user) return user as UserProfile;
}

const getLikedByOwner = (likes: any[], user: UserProfile) => likes.includes(user.id)


export const formatComment = (comment: IComment, user?: UserProfile): CommentResponse => {
    const owner = comment.owner as any
    return {
        id: comment._id.toString(),
        content: comment.content,
        likes: comment.likes.length,
        chiefComment: comment?.chiefComment || false,
        createdAt: comment.createdAt?.toString(),
        owner:{id: owner._id, name: owner.name, avatar: owner.avatar},
        repliedTo: comment?.repliedTo?.toString(),
        likedByOwner: user ? getLikedByOwner(comment.likes, user) : false
    }
}
