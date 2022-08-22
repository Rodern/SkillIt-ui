window.addEventListener("DOMContentLoaded", () => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js');
            console.info("Succesfully registered Service Worker");
        } catch (error) {
            console.info("Service worker registration failed" + error);
        }
    }
})

class ResponseModel {
    constructor(status, message){
        this.Status = status
        this.Message = message
    }
}

class AccountDetail {
    constructor(acId, userId, lastLogin, loginInfo, accountStatus, loginAttemp){
        this.acId =  acId
        this.userId =  userId
        this.lastLogin =  lastLogin
        this.loginInfo =  loginInfo
        this.accountStatus =  accountStatus
        this.loginAttemp =  loginAttemp
        this.user = null
    }
    LoginInfo = () => {
        return JSON.parse(this.LoginInfo)
    }
    LoginAttemps = () => {
        return JSON.parse(this.loginAttemp)
    }
}

const _Detail = new AccountDetail()

class Authenticate {
    constructor(email, password, rememberMe = false, code = ""){
        this.email = email
        this.password = password
        this.rememberMe = rememberMe;
        this.code = code
    }
    authString = (val) => {
        return JSON.stringify(val)
    }
}

const _Authenticate = new Authenticate('kimb.alain@gmail.com', 'lksdjpsk0309');


$.ajax({
    headers: {
        Accept: "text/plain; charset=utf-8",
        "Content-Type": "text/plain; charset=utf-8"  
    },
    type: "post",
    url: "https://localhost:7165/api/Authenticate",
    data: _Authenticate.authString(_Authenticate),
    dataType: "aplication/json",
    success: function (response) {
        console.log(response)
    }
});

fetch('https:api.ipify.org/?format=json').then(results => results.json()).then(data => console.log(data))