import Link from 'next/link';
import { FC } from 'react';
import Logo from '../Logo';
import { APP_NAME } from '../AppHead';
import { HiLightBulb } from 'react-icons/hi'
import { GitHubAuthButton } from '@/components/button';

interface Props {}

const UserNav: FC<Props> = (props): JSX.Element => {
    return <div className='flex items-center justify-between bg-primary-dark p-3'>
        <Link legacyBehavior href='/'>
            <a className='flex space-x-2 text-highlight-dark'>
                <Logo className='fill-highlight-dark'/>
                <span className='text-xl font-semibold'>{APP_NAME}</span>
            </a>
        </Link>
        <div className="flex items-center space-x-5">
            <button className='dark:text-secondary-dark text-secondary-light'>
                <HiLightBulb size={34} />
            </button>

            <GitHubAuthButton lightOnly/>
        </div>
    </div>;
};

export default UserNav;