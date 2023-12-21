import { FinalPost } from "@/components/editor";
import dbConnect from "@/lib/dbConnect";

export const generateFormData = (post: FinalPost) => {
    const formData = new FormData();
    for (let key in post) {
        const value = (post as any)[key];
        if (key === 'tags' && value.trim()) {
            const tags = value.split(',').map((tag: string) => tag.trim());
            formData.append('tags', JSON.stringify(tags));
        } else formData.append(key, value);
    };
    return formData;
};
