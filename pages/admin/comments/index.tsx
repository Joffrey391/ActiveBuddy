import Comments from '@/components/common/Comments';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const AdminComments: NextPage<Props> = () => {
    return (
    <AdminLayout>
        <Comments fetchAll />
    </AdminLayout>
    );
};

export default AdminComments;