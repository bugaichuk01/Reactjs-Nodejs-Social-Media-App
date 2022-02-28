import React from "react";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Label, Room, EmojiEmotions, InsertPhoto, Cancel} from "@material-ui/icons"
import API from "../../utils/API";
import ShareLoader from "../../loaders/ShareLoader";
import styles from "./Share.module.css";


export default function Share() {
    const {user: currentUser} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        API.getUser(currentUser.username)
            .then(response => setUser(response.data))
            .catch(error => console.log(error));
    }, [currentUser.username]);

    //Example to see how works skeleton-screen components
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const desc = useRef();
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("api/upload", data);
            } catch (err) {
            }
        }
        API.createPost(newPost, dispatch);
    };

    return (
        <div className={styles.share}>
            <div className={styles.share__wrapper}>
                {isLoading
                    ? <ShareLoader/>
                    : (
                        <React.Fragment>
                            <div className={styles.share__left}>
                                <img className={styles.share__avatar}
                                     src={
                                         user.profilePicture
                                             ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture
                                             : process.env.REACT_APP_PUBLIC_FOLDER + 'static/defaultAvatar.png'}
                                     alt=""/>
                            </div>
                            <div className={styles.share__right}>
                                <input
                                    placeholder={"What's in your mind " + user.username + "?"}
                                    className={styles.share__input}
                                    ref={desc}
                                />
                                {file && (
                                    <div className={styles.share__img_container}>
                                        <img className={styles.share__img} src={URL.createObjectURL(file)} alt=""/>
                                        <Cancel className={styles.share__cancel} onClick={() => setFile(null)}/>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.share__options}>
                                        <label htmlFor='file' className={styles.share__option}>
                                            <InsertPhoto htmlColor="#20da97" className={styles.share__icon}/>
                                            <span className={styles.share__option_text}>Photo/Video</span>
                                            <input
                                                style={{display: 'none'}}
                                                type="file"
                                                id='file'
                                                accept='.png,.jpeg,.jpg'
                                                onChange={(event) => setFile(event.target.files[0])}
                                            />
                                        </label>
                                        <div className={styles.share__option}>
                                            <Label className={styles.share__icon}/>
                                            <span className={styles.share__option_text}>Tag</span>
                                        </div>
                                        <div className={styles.share__option}>
                                            <Room className={styles.share__icon}/>
                                            <span className={styles.share__option_text}>Location</span>
                                        </div>
                                        <div className={styles.share__option}>
                                            <EmojiEmotions className={styles.share__icon}/>
                                            <span className={styles.share__option_text}>Feelings</span>
                                        </div>
                                        <button type='submit' className={styles.share__button}>Share</button>
                                    </div>
                                </form>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    );
}
