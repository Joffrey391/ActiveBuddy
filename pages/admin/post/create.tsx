import AdminLayout from '@/components/layout/AdminLayout';
import  Editor  from '../../../components/editor';
import { NextPage } from 'next';

interface Props {}

const Create: NextPage<Props> = () => {
    return (
        <AdminLayout title='New Post'>
            <div className="max-w-4xl mx-auto">
                <Editor onSubmit={(post) => {
                    console.log(post)
                }}/>
            </div>
        </AdminLayout>    
    );
};

export default Create;