import { PropsType } from "../Profile"
import {Preloader} from "../../../common/Preloader";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";

export const ProfileInfo = (props: PropsType) => {

    if (!props.profile) {
        return <Preloader />
    } else {
        return (
            <div>
                {/*<img src="https://1gai.ru/uploads/posts/2020-05/1590574950_435.jpg" alt="avatar"/>*/}
                <img src={props.profile.photos.large !== null ? props.profile.photos.large : undefined} alt=""/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>

        )
    }
}