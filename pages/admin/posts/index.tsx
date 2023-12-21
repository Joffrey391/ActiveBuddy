import PostCard from '@/components/common/PostCard';
import AdminLayout from '@/components/layout/AdminLayout';
import { PostDetail } from '@/utils/types';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>


const Posts: NextPage<Props> = ({posts}) => {
    const [postsToRender, setPostsToRender] = useState(posts);
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto p-3">
                <div className="grid grid-cols-3 gap-4">
                    {postsToRender.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
};

interface ServerSideResponse {
    posts: PostDetail[]
}

export const getServerSideProps: GetServerSideProps<ServerSideResponse> = async () => {
    await readPostsFromDb();
}

export default Posts;