import {useDispatch, useSelector} from "react-redux";
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
import API from "../../../utils/API";

export default function PostActions({post, like, setLike}) {
    const {user: currentUser} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [isLiked, setIsLiked] = useState(false);


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id]);

    const likeHandler = () => {
        API.updateLikes(post._id, currentUser._id, dispatch)
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
