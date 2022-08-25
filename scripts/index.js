class UserCredential {
    constructor(email, password, rememberMe = false, code = "") {
        this.email = email
        this.password = password
        this.rememberMe = rememberMe
        this.code = code
    }
}

class Authenticate {
    constructor(email, password, rememberMe = false, code = "") {
        this.email = email
        this.password = password
        this.rememberMe = rememberMe;
        this.code = code
    }
    authString = (val) => {
        return JSON.stringify(val)
    }
    authJson = (val) => {
        return JSON.parse(val)
    }
}

class ResponseModel {
    constructor(status, message) {
        this.status = status
        this.message = message
    }
}

class LoginInfo {
    constructor(longitude, latitude, dateTime, isOnline, isLoggedOut, ip, deviveName, imgBase64, accountType) {
        this.longitude = longitude
        this.latitude = latitude
        this.dateTime = dateTime
        this.isOnline = isOnline
        this.isLoggedOut = isLoggedOut
        this.ip = ip
        this.deviceName = deviveName
        this.imgBase64 = imgBase64
    }
}

class LoginAttemp {
    constructor(dateTime, reason, status) {
        this.dateTime = dateTime
        this.reason = reason
        this.status = status
    }
}

class User {
    constructor(userId, username, firstname, lastname, email, password, dob, address, dateCreated, phone, loginInfos, loginAttemps){
        this.userId = userId
        this.username = username
        this.firstName = firstname
        this.lastName = lastname
        this.email = email
        this.password = password
        this.dob = dob
        this.address = address
        this.dateCreated = dateCreated
        this.phone = phone
        this.userSocialId = 0
        this.userSKillId = 0
        this.loginInfos = loginInfos
        this.loginAttemps = loginAttemps
    }
}

class AccountDetail {
    constructor(acId, userId, lastLogin, loginInfos, accountStatus, loginAttemps) {
        this.acId = acId
        this.userId = userId
        this.lastLogin = lastLogin
        this.loginInfo = loginInfos
        this.accountStatus = accountStatus
        this.loginAttemp = loginAttemps
        this.user = null
    }
}

class Catalog {
    constructor(caption, description, imgLink, catalogLink) {
        this.caption = caption
        this.description = description
        this.imgLink = imgLink
        this.catalogLink = catalogLink
    }
}

const Level = [
    'Beginner',
    'Amatuer',
    'Intermediate',
    'Professional',
    'GodLevel'
]

class Skill {
    constructor(skillId, name, level) {
        this.skillId = skillId
        this.name = name
        this.level = level
        this.userSkills = new Array()
    }
}

class UserSkill {
    constructor(userSkillId, skillId, userId, skill) {
        this.userSkillId = userSkillId
        this.skillId = skillId
        this.userId = userId
        this.skill = skill
        this.user = null
    }
}

class Social {
    constructor(socialId, name, link) {
        this.socialId = socialId
        this.name = name
        this.link = link
        this.userSocials = []
    }
}

class UserSocial {
    constructor(userSocialId, socialId, userId, social) {
        this.userSocialId = userSocialId
        this.socialId = socialId
        this.userId = userId
        this.social = social
        this.user = null
    }
}