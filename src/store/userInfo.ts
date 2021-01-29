import {action, computed, observable} from 'mobx'

interface item{
    gender?: number;
    headImgUrl?: string;
    nickname?: string;
    userId?: number;
    mobile?: string;
    isBeiwai: boolean

}

interface UserInfoInterface {
    hasBindedUser: number;
    openId: string;
    token: string;
    unionId: string;
    userInfo: item
}

class UserInfo {

    @observable
    userInfo: UserInfoInterface = {
        hasBindedUser: 0,
        openId: '',
        token: '',
        unionId: '',
        userInfo: {
            isBeiwai: false,
        }
    }

    @observable
    token: string = ''

    @observable
    mpId: string = '8'

    @observable
    type: string = ''

    @observable
    openId: string = ''

    @computed
    get getToken() {
        return this.token
    }

    @computed
    get getMpId() {
        return this.mpId
    }

    @computed
    get getOpenId() {
        return this.openId
    }

    @computed
    get hasBindedUser() {
        return this.userInfo.hasBindedUser
    }

    @computed
    get getUserInfo() {
        return this.userInfo.userInfo
    }

    @action.bound
    setUserInfo(userInfo: UserInfoInterface) {
        this.userInfo = userInfo
    }

    @action.bound
    setToken(token: string) {
        this.token = token
    }

    @action.bound
    setOpenId(openId: string) {
        this.openId = openId
    }

    @action.bound
    setMpId(mpId: string) {
        this.mpId = mpId
    }
}

export default UserInfo