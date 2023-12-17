import { FC, useState } from 'react';
import Button from '../ToolBar/Button';
import { BsYoutube } from 'react-icons/bs';

interface Props {
    onSubmit(link: string): void;
}

const EmbedYoutube: FC<Props> = ({ onSubmit }): JSX.Element => {
    const [url, setUrl] = useState('');
    const [visible, setVisible] = useState(false)

    const handleSubmit = () => {
        if(!url.trim()) return hideForm();
        onSubmit(url);
        setUrl('');
        hideForm();
    };

    const resetForm = () => {

    };

    const hideForm = () => setVisible(false);
    const showForm = () => setVisible(true);

    return (
        <div onKeyDown={({key}) => {
            if(key === 'Escape') hideForm();
        }} className="relative">
            <Button onClick={ visible ? hideForm : showForm}>
                <BsYoutube />
            </Button>
                {visible && <div className="absolute top-full mt-4 right-0 z-50">
                    <div className="flex space-x-2">
                        <input
                        autoFocus
                        type="text"
                        className="rounded bg-transparent focus:ring-0 focus:border-primary-dark dark:focus:border-primary transition dark:text-primary text-primary-dark p-2"
                        placeholder="https://youtube.com"
                        value={url}
                        onChange={({target}) => setUrl(target.value)}
                        />
                        <button onClick={handleSubmit} className="bg-action text-primary text-sm p-2 rounded">
                        Embed
                        </button>
                    </div>
                </div>}
        </div>
    )
};

export default EmbedYoutube;