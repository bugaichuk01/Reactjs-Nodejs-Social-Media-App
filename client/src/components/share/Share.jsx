import {Label, Room, EmojiEmotions, InsertPhoto, Cancel} from "@material-ui/icons"
import {useSelector} from "react-redux";
import {useRef, useState} from "react";
import axios from "axios";
import styles from "./Share.module.css";
import {useGetRequest} from "../../useApi";


export default function Share() {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user: currentUser} = useSelector(state => state);
    const user = useGetRequest(`api/users?userId=${currentUser._id}`, currentUser._id)

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
        try {
            await axios.post("api/posts", newPost);
            window.location.reload();
        } catch (err) {
        }
    };

    return (
        <div className={styles.share}>
            <div className={styles.share__wrapper}>
                <div className={styles.share__left}>
                    <img className={styles.share__avatar}
                         src={
                             user.profilePicture
                                 ? _path + user.profilePicture
                                 : _path + 'person/defaultAvatar.png'}
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
            </div>
        </div>
    );
}
