import { FC } from 'react';
import ProfileIcon from './ProfileIcon';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import { BsFillReplyAllFill } from 'react-icons/bs';

interface CommentOwnersProfile {
    name: string;
    avatar?: string;
}

interface Props {
    profile: CommentOwnersProfile;
    date: string,
    content: string,
}

const CommentCard: FC<Props> = ({profile, date, content}): JSX.Element => {
    const {name, avatar} = profile
    return (
        <div className='flex space-x-3'>
            <ProfileIcon nameInitial={name[0].toUpperCase()} avatar={avatar}/>
            <div className="flex-1">
                <h1 className='text-lg text-primary-dark dark:text-primary font-semibold'>
                    {name}
                </h1>
                <span className='text-sm text-secondary-dark'>
                    {dateFormat(date, 'd-mmm-yyyy')}
                </span>
                <p className='text-primary-dark dark:text-primary'>
                    {parse(content)}
                </p>
                <div className="flex">
                    <button className='flex items-center text-primary-dark dark:text-primary space-x-2'>
                        <BsFillReplyAllFill />
                        <span>Reply</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;