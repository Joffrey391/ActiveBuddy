import useEditorConfig from '@/hooks/useEditorConfig';
import { EditorContent } from '@tiptap/react';
import { FC, useEffect } from 'react';
import ActionButton from './ActionButton';
import { useToast } from "@chakra-ui/react";

interface Props {
    title?: string;
    onSubmit(content: string): void;
    busy?: boolean;
    onClose?(): void;
    initialState?: string;
    visible?: boolean

}

const CommentForm: FC<Props> = ({
    title, 
    busy = false, 
    onSubmit, 
    onClose, 
    initialState,
    visible = true
}): JSX.Element | null => {
    const {editor} = useEditorConfig({placeholder: 'Add your comment...'})
    const toast = useToast();
    
    const handleSubmit = () => {
        if(editor && !busy) {
            const value = editor?.getHTML()
            if(value === '<p></p>') return;
            onSubmit(value);
            toast({
                status: "success",
                description: "Comment Submitted",
                position: "top-right",
                isClosable: true,
                duration: 3000,
                variant: "left-accent",
            });
            editor.commands.clearContent();
            } else {
            toast({
                status: "error",
                description: "Comment was not submitted, please try again.",
                position: "top-right",
                isClosable: true,
                duration: 3000,
                variant: "left-accent",
            });
            editor?.commands.clearContent();
        }
    }

    useEffect(() => {
        if(typeof initialState === 'string') editor?.chain().focus().setContent(initialState).run()
    }, [editor, initialState])

    if(!visible) return null


    return (
        <div>
            {title? <h1 className='text-xl text-primary-dark dark:text-primary font-semibold py-3'>{title}</h1>: null}
            <EditorContent 
                className='min-h-[200px] border-2 border-secondary-dark rounded p-2' 
                editor={editor}
            />
            <div className="md:flex justify-end py-3">
                <div className='flex space-x-4'>
                    <ActionButton 
                        busy={busy} 
                        title='Submit' 
                        onClick={handleSubmit}
                    />
                    {onClose? (
                        <button onClick={onClose} className='text-primary-dark dark:text-primary'>
                            Close
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default CommentForm;