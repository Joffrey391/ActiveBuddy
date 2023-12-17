import { FC, useEffect, useState } from 'react';
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TipTapImage from '@tiptap/extension-image';
import EditLink from './Link/EditLink';
import GalleryModal, { ImageSelectionResult } from './GalleryModal';
import axios from 'axios';


interface Props {}

const Editor: FC<Props> = (props): JSX.Element => {
    const [selectionRange, setSelectionRange] = useState<Range>();
    const [showGallery, setShowGallery] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<{src: string}[]>([]);

    const fetchImages = async () => {
        const { data } = await axios('/api/image');
        setImages(data.images);
    };

    const handleImageUpload = async (image: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post('/api/image', formData);
        setUploading(false);

        setImages([data, ...images]);
    };

    const editor = useEditor({
        extensions: [
            StarterKit, 
            Underline,
            Link.configure({
                autolink: false,
                linkOnPaste: false,
                openOnClick: false,
                HTMLAttributes: {
                    target: ''
                }
            }), 
            Placeholder.configure({
        placeholder: 'Type something'
        }),
        Youtube.configure({
            width: 840,
            height: 472.5,
            HTMLAttributes: {
                class: 'mx-auto rounded'
            },
        }),
        TipTapImage.configure({
            HTMLAttributes: {
                class: 'mx-auto'
            }
        })
        ],  
        editorProps: {
            handleClick(view, pos, event) {
                const {state} = view
                const selectionRange = getMarkRange(
                    state.doc.resolve(pos), 
                    state.schema.marks.link
                    );
                if(selectionRange) setSelectionRange(selectionRange);

            },
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full'
            }
        },
    });

    const handleImageSelection = (result: ImageSelectionResult) => {
        editor
        ?.chain()
        .focus()
        .setImage({src: result.src, alt: result.altText})
        .run();
    }

    useEffect(() => {
        if(editor && selectionRange){
            editor.commands.setTextSelection(selectionRange);
        }
    }, [editor, selectionRange]);

    useEffect(() => {
        fetchImages();
    }, []);



    return (
        <>
        <div className='p-3 dark:bg-primary-dark bg-primary transition'>
            <ToolBar 
                editor={editor} 
                onOpenImageClick={()=> setShowGallery(true)}
            />
            <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3"/>
            {editor ? <EditLink editor={editor}/> : null}
            <EditorContent editor={editor} />
        </div>

        <GalleryModal 
            visible={showGallery} 
            onClose={() => setShowGallery(false)}
            onSelect={handleImageSelection}
            images={images}
            onFileSelect={handleImageUpload}
            uploading={uploading}
        />
        
        </>
    );
};

export default Editor;