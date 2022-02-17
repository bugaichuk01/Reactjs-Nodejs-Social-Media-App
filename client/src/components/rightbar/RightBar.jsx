import "./RightBar.css";
import {Users} from "../../Data.js";
import Online from "../online/Online";

export default function RightBar({user}) {
    const HomeRightBar = () => {
        return (
            <>
                <div className="birthday__container">
                    <img className="birthday__img" src="assets/gift.png" alt=""/>
                    <span className="birthday__text">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
                </div>
                <img className="rightbar__ad" src="assets/ad.png" alt=""/>
                <h4 className="rightbar__title">Online Friends</h4>
                <ul className="rightbar__friend-list">
                    {Users.map((u) => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightBar = () => {
        return (
            <>
                <h4 className="rightbar__title">User information</h4>
                <div className="rightbar__info">
                    <div className="rightbar__info-item">
                        <span className="rightbar__info-key">City:</span>
                        <span className="rightbar__info-value">{user.city}</span>
                    </div>
                    <div className="rightbar__info-item">
                        <span className="rightbar__info-key">From:</span>
                        <span className="rightbar__info-value">{user.from}</span>
                    </div>
                    <div className="rightbar__info-item">
                        <span className="rightbar__info-key">Relationship:</span>
                        <span className="rightbar__info-value">
                            {user.relationship === 1
                            ? 'Single'
                            :user.relationship === 2
                            ? 'Married'
                            : '-'}
                        </span>
                    </div>
                </div>
                <h4 className="rightbar__title">User friends</h4>
                <div className="rightbar__followings">
                    <div className="rightbar__following">
                        <img
                            src="assets/person/1.jpeg"
                            alt=""
                            className="rightbar__following-img"
                        />
                        <span className="rightbar__following-name">John Carter</span>
                    </div>
                    <div className="rightbar__following">
                        <img
                            src="assets/person/2.jpeg"
                            alt=""
                            className="rightbar__following-img"
                        />
                        <span className="rightbar__following-name">John Carter</span>
                    </div>
                    <div className="rightbar__following">
                        <img
                            src="assets/person/3.jpeg"
                            alt=""
                            className="rightbar__following-img"
                        />
                        <span className="rightbar__following-name">John Carter</span>
                    </div>
                    <div className="rightbar__following">
                        <img
                            src="assets/person/4.jpeg"
                            alt=""
                            className="rightbar__following-img"
                        />
                        <span className="rightbar__following-name">John Carter</span>
                    </div>
                    <div className="rightbar__following">
                        <img
                            src="assets/person/5.jpeg"
                            alt=""
                            className="rightbar__following-img"
                        />
                        <span className="rightbar__following-name">John Carter</span>
                    </div>
                    <div className="rightbar__following">
                        <img
                            src="assets/person/6.jpeg"
                            alt=""
                            className="rightbar__following-img"
                        />
                        <span className="rightbar__following-name">John Carter</span>
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className="right-bar">
            <div className="rightbar__wrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    );
}
