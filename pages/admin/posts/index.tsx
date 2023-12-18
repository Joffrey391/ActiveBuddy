import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}


const Posts: NextPage<Props> = () => {
    return (
        <AdminLayout>
            posts
        </AdminLayout>
    )
};

export default Posts;