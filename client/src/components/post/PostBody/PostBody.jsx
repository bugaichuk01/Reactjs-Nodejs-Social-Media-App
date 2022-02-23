import React, {useEffect, useState} from 'react';
import style from "./PostBody.module.css";
import {AutorenewRounded, LoyaltyRounded, PublishRounded} from "@material-ui/icons";
import cn from "classnames";

function PostBody({post, like}) {
    const [description, setDescription] = useState('');
    const [isFullDesc, setIsFullDesc] = useState(false);

    useEffect(() => {
        post.desc.length > 100 ? setDescription(post.desc.slice(0, 100) + '...') : setDescription(post.desc);
    }, [post.desc])


    const descriptionHandler = () => {
        setIsFullDesc(!isFullDesc);
        isFullDesc ? setDescription(description.slice(0, 100) + '...') : setDescription(post.desc);
    }

    return (
        <div className={style.post__container}>
            <span className={style.post__body}>{description}</span>
            {post.desc.length > 100 && (
                <span
                    className={style.post__body_full}
                    onClick={descriptionHandler}>
                {isFullDesc ? 'Hide' : 'Read more...'}
            </span>
            )}
            <img className={style.post__img} src={process.env.REACT_APP_PUBLIC_FOLDER + post.img} alt=""/>
            <div className={style.post__under}>
                <div className={style.icons}>
                    <LoyaltyRounded className={cn(style.icon, style.heart__icon)}/>
                    <AutorenewRounded className={cn(style.icon, style.retweet__icon)}/>
                    <PublishRounded className={cn(style.icon, style.share__icon)}/>
                    <span className={style.post__likes}>{like}</span>
                </div>
                <div>
                    <span className={style.post__comments_text}>{post.comment} comments</span>
                </div>
            </div>
        </div>
    );
}

export default PostBody;