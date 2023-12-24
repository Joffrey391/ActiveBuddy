import InfiniteScrollPost from '@/components/common/InfiniteScrollPost';
import DefaultLayout from '@/components/layout/DefaultLayout';
import { formatPosts, readPostsFromDb } from '@/lib/utils';
import { filterPosts } from '@/utils/helper';
import { PostDetail, UserProfile } from '@/utils/types';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useState } from 'react';


type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<Props> = ({posts}) => {
    const [postsToRender, setPostsToRender] = useState(posts);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const {data} = useSession();
    const profile = data?.user as UserProfile;

    const isAdmin = profile && profile.role === 'admin';

    const fetchMorePosts = async () => {
        try {
            pageNo++;
            const { data } = await axios(`/api/posts?limit=${limit}&pageNo=${pageNo}`);
            if(data.posts.length < limit){
                setPostsToRender([...postsToRender, ...data.posts]);
                setHasMorePosts(false);
            } else setPostsToRender([...postsToRender, ...data.posts]);     
        } catch (error) {
            setHasMorePosts(false);
            console.log(error);
        }
    };

    return <DefaultLayout>
        <div className="pb-20">
            <InfiniteScrollPost 
                    hasMore={hasMorePosts} 
                    next={fetchMorePosts} 
                    dataLength={postsToRender.length} 
                    posts={postsToRender} 
                    showControls={isAdmin}
                    onPostRemoved={(post) => setPostsToRender(filterPosts(posts, post))}
                />
        </div>
    </DefaultLayout>
};

interface ServerSideResponse {
    posts: PostDetail[]
}

let pageNo = 0;
const limit = 9;

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

export default Home;