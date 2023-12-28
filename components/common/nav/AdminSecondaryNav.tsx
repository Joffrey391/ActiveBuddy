import { FC } from 'react';
import DropdownOptions, { dropdownOptions } from '../DropdownOptions';
import ProfileHead from '../ProfileHead';
import { useRouter } from 'next/router';
import useDarkMode from '@/hooks/useDarkMode';
import { signOut } from 'next-auth/react';
import SearchBar from '../SearchBar';

interface Props { }

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
    const router = useRouter();
    const {toggleTheme} = useDarkMode();
    const navigateToCreateNewPost = () => router.push('/admin/posts/create');
    const handleLogOut = async () => await signOut();

    const options: dropdownOptions = [
        {
            label: 'Add new post',
            onClick: navigateToCreateNewPost,
        },
        {
            label: 'Change theme',
            onClick: toggleTheme,
        },
        {
            label: 'Log out',
            onClick: handleLogOut,
        },

    ];

    const handleSearchSubmit = (query: string) => {
        if(!query.trim()) return;

        router.push('/admin/search?title=' + query)
    }

    return (
        <div className='flex items-center justify-between'>
            <SearchBar onSubmit={handleSearchSubmit}/>

            <DropdownOptions head={<ProfileHead nameInitial='M'/>} options={options} />
        </div>
    );
};

export default AdminSecondaryNav;