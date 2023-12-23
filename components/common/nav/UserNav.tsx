import Link from 'next/link';
import { FC } from 'react';
import Logo from '../Logo';
import { APP_NAME } from '../AppHead';
import { HiLightBulb } from 'react-icons/hi'
import { GitHubAuthButton } from '@/components/button';
import ProfileHead from '../ProfileHead';
import DropdownOptions, { dropdownOptions } from '../DropdownOptions';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Props { }

const UserNav: FC<Props> = (props): JSX.Element => {
    const { data, status } = useSession();
    const isAuth = status === 'authenticated'
    const handleLoginWithGithub = async () => {
        const res = await signIn('github');
        console.log(res)
    }

    const dropdownOptions: dropdownOptions = [
        { label: 'Dashboard', onClick() { } },
        {
            label: 'Logout', async onClick() {
                await signOut()
            }
        },
    ]

    return <div className='flex items-center justify-between bg-primary-dark p-3'>
        <Link legacyBehavior href='/'>
            <a className='flex space-x-2 text-highlight-dark'>
                <Logo className='fill-highlight-dark' />
                <span className='text-xl font-semibold'>{APP_NAME}</span>
            </a>
        </Link>
        <div className="flex items-center space-x-5">
            <button className='dark:text-secondary-dark text-secondary-light'>
                <HiLightBulb size={34} />
            </button>

            {isAuth ? (
                <DropdownOptions
                    options={dropdownOptions}
                    head={<ProfileHead nameInitial='M' lightOnly />}
                />
            ) : (
                <GitHubAuthButton onClick={handleLoginWithGithub} lightOnly />
            )}
        </div>
    </div>;
};

export default UserNav;