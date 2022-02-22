import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    AutorenewRounded,
    CommentRounded,
    PublishRounded,
    ThumbUp
} from "@material-ui/icons"
import cn from 'classnames';
import style from "./PostActions.module.css";
import UiButton from "../../UI/UIButton/UIButton";

export default function PostActions({post, like, setLike}) {
    const {user: currentUser} = useSelector(state => state);

    const [isLiked, setIsLiked] = useState(false);


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id]);

    const likeHandler = () => {
        try {
            axios.put('api/posts/' + post._id + '/like', {userId: currentUser._id});
        } catch (error) {
            console.log(error)
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }


    return (
        <div className={style.post__actions}>
            <UiButton
                onClick={likeHandler}
                textClass={isLiked ? style.text__active : style.text__disabled}
                buttonClass={isLiked ? style.button__active : style.button__disabled}
                text='Like'>
                <ThumbUp className={
                    isLiked
                        ? cn(style.action__icon, style.like__active)
                        : cn(style.action__icon, style.like__disabled)
                }/>

            </UiButton>

            <UiButton buttonClass={style.button__disabled} text='Retweet'>
                <AutorenewRounded className={style.action__icon}/>
            </UiButton>

            <UiButton buttonClass={style.button__disabled} text='Comment'>
                <CommentRounded className={style.action__icon}/>
            </UiButton>

            <div className={style.post__action_last}>
                <PublishRounded/>
            </div>
        </div>
    );
}
