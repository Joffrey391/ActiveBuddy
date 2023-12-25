import classNames from 'classnames';
import Image from 'next/image';
import { FC, useCallback } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import ProfileIcon from './ProfileIcon';

interface Props {
    lightOnly?: boolean;
    avatar?: string;
    nameInitial?: string;
}

const ProfileHead: FC<Props> = ({ lightOnly, avatar, nameInitial }): JSX.Element => {
    return <div className='flex items-center'>
        <ProfileIcon avatar={avatar} nameInitial={nameInitial} lightOnly />
        <AiFillCaretDown className={lightOnly? 'text-primary' : 'text-primary-dark dark:text-primary'} />
    </div>;
};

export default ProfileHead;