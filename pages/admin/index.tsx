import ContentWrapper from '@/components/admin/ContentWrapper';
import LatestCommentListCard from '@/components/admin/LatestCommentListCard';
import LatestPostListCard from '@/components/admin/LatestPostListCard';
import AdminLayout from '@/components/layout/AdminLayout';
import { NextPage } from 'next';

interface Props {}

const Admin: NextPage<Props> = () => {
    return (
        <AdminLayout>
            <div className="flex space-x-10">
                <ContentWrapper seeAllRoute='/admin' title='Latest posts'>
                    <LatestPostListCard title='This is my title' slug='this-is-slug' meta='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil at et tempora impedit minima vitae, deleniti repudiandae ab nam, iste libero quod totam. Natus corrupti asperiores quaerat cupiditate recusandae repellendus accusantium ea incidunt numquam dolorem dicta doloribus a animi nulla cumque deserunt odio eveniet, veritatis dolorum illo ipsam. Reiciendis eos recusandae odio vel ab perferendis fugit quia, quos id itaque aut doloribus ut a delectus fuga repellendus laboriosam sunt, maxime beatae. Voluptatibus iure accusamus atque at delectus soluta velit eligendi nemo ex vero itaque dicta aperiam quia aut recusandae, repellat esse voluptatem deleniti commodi quasi amet. Eius culpa illum tempora, molestias id magnam numquam a consequuntur itaque suscipit beatae repellendus quas ex nemo debitis placeat amet officia nisi quod, expedita accusamus? Earum nulla quam quae, a accusamus cupiditate iure nostrum magni sint? Magnam nulla ratione quis, sed eligendi nam dolores? At, corrupti excepturi necessitatibus esse saepe sapiente, quis eaque, ad sit dolorem culpa tempora eius. Expedita cumque reiciendis veritatis praesentium nulla vero vitae, ab laborum? Quas nisi nam laudantium nostrum in quidem mollitia, quibusdam voluptatibus qui ipsam, voluptatum dolorem molestiae? Molestias alias quae id consectetur ipsa sapiente debitis iste, nihil delectus, corrupti sunt beatae! Veritatis rerum beatae soluta similique amet.'/>
                </ContentWrapper>

                <ContentWrapper seeAllRoute='/admin' title='Latest comments'>
                    {/* <LatestCommentListCard comment={}/> */}
                </ContentWrapper>
            </div>
        </AdminLayout>
    )
};

export default Admin;