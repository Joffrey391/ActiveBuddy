import AdminNav from '@/components/common/AdminNav';
import { NextPage } from 'next';

interface Props {}

const Admin: NextPage<Props> = () => {
    return <div className='light'>
        <AdminNav />
    </div>;
};

export default Admin;