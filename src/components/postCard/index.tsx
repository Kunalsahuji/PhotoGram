import { useUserAuth } from '@/context/userAuthContext';
import { DocumentResponse } from '@/types';
import * as React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import image2 from "@/assets/images/image2.jpg"


interface IPostCardProps {
    data: DocumentResponse
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
    const { user } = useUserAuth()
    return (
        <Card className='mb-6 '>
            <CardHeader className='flex flex-col p-3'>
                <CardTitle className='text-sm text-center flex justify-start items-center'>
                    <span className='mr-2 '>
                        <img src={image2} alt="img feed" className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover' />
                    </span>
                </CardTitle>
            </CardHeader>
        </Card>
    );
};

export default PostCard;
