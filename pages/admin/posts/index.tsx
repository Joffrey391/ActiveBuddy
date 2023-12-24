import ConfirmModal from '@/components/common/ConfirmModal';
import InfiniteScrollPost from '@/components/common/InfiniteScrollPost';
import PostCard from '@/components/common/PostCard';
import AdminLayout from '@/components/layout/AdminLayout';
import { formatPosts, readPostsFromDb } from '@/lib/utils';
import { filterPosts } from '@/utils/helper';
import { PostDetail } from '@/utils/types';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

let pageNo = 0;
const limit = 9;


const Posts: NextPage<Props> = ({ posts }) => {
    const [postsToRender, setPostsToRender] = useState(posts);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const fetchMorePosts = async () => {
        try {
            pageNo++;
            const { data } = await axios(`/api/posts?limit=${limit}&pageNo=${pageNo}`);
            if (data.posts.length < limit) {
                setPostsToRender([...postsToRender, ...data.posts]);
                setHasMorePosts(false);
            } else setPostsToRender([...postsToRender, ...data.posts]);
        } catch (error) {
            setHasMorePosts(false);
            console.log(error);
        }
    };
    return (
        <>
            <AdminLayout>
                <InfiniteScrollPost
                    hasMore={hasMorePosts}
                    next={fetchMorePosts}
                    dataLength={postsToRender.length}
                    posts={postsToRender}
                    showControls
                    onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
                />

            </AdminLayout>
        </>
    )
};

interface ServerSideResponse {
    posts: PostDetail[]
}

export const getServerSideProps: GetServerSideProps<ServerSideResponse> = async () => {
    try {
        const posts = await readPostsFromDb(limit, pageNo);
        const formattedPosts = formatPosts(posts);
        return {
            props: {
                posts: formattedPosts,
            }
        }
    } catch (error) {
        return { notFound: true };
    }
}

export default Posts;