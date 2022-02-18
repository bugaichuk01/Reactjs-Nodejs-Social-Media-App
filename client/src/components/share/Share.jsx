import "./Share.css";
import {Label, Room, EmojiEmotions, InsertPhoto} from "@material-ui/icons"
import {useSelector} from "react-redux";
import {useRef, useState} from "react";
import axios from "axios";

export default function Share() {
    const _path = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useSelector(state => state);

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
        <div className="share">
            <div className="share__wrapper">
                <div className="share__top">
                    <img className="share__profile-img"
                         src={
                             user.profilePicture
                                 ? _path + user.profilePicture
                                 : _path + 'person/defaultAvatar.png'}
                         alt=""/>
                    <input
                        placeholder={"What's in your mind " + user.username + "?"}
                        className="share__input"
                        ref={desc}
                    />
                </div>
                <form className="share__bottom" onSubmit={handleSubmit}>
                    <div className="share__options">
                        <label htmlFor='file' className="share__option">
                            <InsertPhoto htmlColor="#20da97" className="share__icon"/>
                            <span className="share__option-text">Photo/Video</span>
                            <input
                                style={{display: 'none'}}
                                type="file"
                                id='file'
                                accept='.png,.jpeg,.jpg'
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                        </label>
                        <div className="share__option">
                            <Label htmlColor="#3d7cd1" className="share__icon"/>
                            <span className="share__option-text">Tag</span>
                        </div>
                        <div className="share__option">
                            <Room htmlColor="#ff6b6b" className="share__icon"/>
                            <span className="share__option-text">Location</span>
                        </div>
                        <div className="share__option">
                            <EmojiEmotions htmlColor="#f5bc51" className="share__icon"/>
                            <span className="share__option-text">Feelings</span>
                        </div>
                    </div>
                    <button type='submit' className="share__button">Share</button>
                </form>
            </div>
        </div>
    );
}
