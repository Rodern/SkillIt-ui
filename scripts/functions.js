
function popUpBox(boxType, boxMsg, OKCN, cancelCN = "CN_Class", CallBack = function () {
    $(globalAlertConfirm).removeClass(OKCN);
    clearPopUpBox();
}) {
    if (boxType == "done") {
        $('.typeImg').attr('src', 'assets/icons/done.png');
        $('.typeName').text("Done!");
        $('.alertBody').text(boxMsg);
    } else if (boxType == "alert") {
        $('.typeImg').attr('src', 'assets/icons/alert.png');
        $('.typeName').text("Alert!");
        $('.alertBody').text(boxMsg);
        $('.alertCancel').show();
    } else if (boxType == "notify") {
        $('.typeImg').attr('src', 'assets/icons/notify.png');
        $('.typeName').text("Notification");
        $('.alertBody').text(boxMsg);
    } else if (boxType == "info") {
        $('.typeImg').attr('src', 'assets/icons/info.png');
        $('.typeName').text("Notification");
        $('.alertBody').text(boxMsg);
    } else if (boxType == "warn") {
        $('.typeImg').attr('src', 'assets/icons/warning.png');
        $('.typeName').text("Warning!");
        $('.alertBody').text(boxMsg);
    }
    $('.alertCover').attr('tabindex', -1).focus(function () {
        //console.log('hit');
    });
    $('.alertCover').on('keyup', function (e) {
        if (e.which === 13 && $('.alertCover').css('display') == 'flex') {
            e.preventDefault();
            CallBack();
        }
    })

    $('.alertCover').fadeIn(150);
    $('.alertCover').css('display', 'flex');

    $(globalAlertConfirm).addClass(OKCN);
    $(globalAlertCancel).addClass(cancelCN);

    $(globalAlertCancel).on('click', function () {
        $(globalAlertConfirm).removeClass(OKCN);
        $(globalAlertCancel).removeClass(cancelCN);
        clearPopUpBox();
    });

    $(globalAlertConfirm).on('click', function () {
        CallBack();
        $(globalAlertConfirm).removeClass(OKCN);
    });
}

function clearPopUpBox() {
    $('.alertCover').fadeOut(150, function () {
        $('.typeImg').attr('src', '');
        $('.typeName').text("");
        $('.alertBody').text("");
        $('.alertCancel').hide();
    });
}

function IsValid(val) {
    if (val.success == true) console.log(true)
}

var g_img = ''

const KeyExists = (key) => {
    return (localStorage.hasOwnProperty(key))
}

const setKeyValue = (key, val) => {
    localStorage.setItem(key, val)
}

const getKeyValue = (key) => { return localStorage.getItem(key) }

const deleteKey = (key) => { return localStorage.removeItem(key) }

const encodeText = (text) => {
    let encoder = new TextEncoder()
    return encoder.encode(text).toString()
}

const decodeText = (text) => {
    let decoder = new TextDecoder()
    return decoder.decode(Uint8Array.from(text.split(",")));
}

const getIP = () => {
    $.ajax({
        type: 'get',
        url: 'https://api.ipify.org/?format=json',
        success: (ipAdress) => {
            ip_address = ipAdress;
            setKeyValue('ip_address', JSON.stringify(ipAdress))
        }
    })
}

const getResetCode = (email) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/GenerateCode?email=${email}`,
        data: '',
        success: (responseModel) => {
            if (responseModel.success == true) {
                popUpBox('notify', 'Check your mail box for the reset code. Donot close this page yet', 'catAlert')
                return
            }
            popUpBox('notify', responseModel.message, 'catAlert')
        }
    })
}

const newUserId = () => {
    return Math.floor(Date.now())
}

function TrimSpace(text, pos = 1, UP = false) {
    if (pos == -1)
        return text.trimStart();
    if (pos == 0)
        return text.trimEnd();
    if (pos == 1)
        return text.trim();
}

const getGeoLoc = () => {
    navigator.geolocation.getCurrentPosition((location) => {
        userLocation = location
        console.log(location)
    })
}

const resetPassword = (userCredential) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/Reset`,
        data: `{
			"email": "${userCredential.email}",
			"password": "${userCredential.password}",
			"rememberMe": ${userCredential.rememberMe},
			"code": "${userCredential.code}"
		}`,
        dataType: "json",
        contentType: "application/json",
        success: (responseModel) => {
            if (responseModel.success == true) {
                function cb(){
                    clearFlc('floating-content-2')
                    loadSignin()
                }
                popUpBox('notify', responseModel.message, 'catAlert', 'caR', cb)
                return
            }
            function cb() {

            }
            popUpBox('notify', 'Failed: Restart the reset process', 'catAlert', '', cb)
        }
    })
}

const decryptToken = (token) => {
    let [, infoSection] = token.split('.')
    return JSON.parse(atob(infoSection))
}

const IsTokenValid = (token, callback = () => { console.info(" ") }) => {
    let isValid;
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/CheckTokenValidity?token=${token}`,
        data: '',
        success: (responseModel) => {
            if (responseModel.success == true) {
                callback()
                console.log(responseModel.success)
            }
            else {
                var cred = decryptToken(Token)
                AuthenticateUser(new UserCredential(cred.email, decodeText(getKeyValue('pass')), false, "", ""))
            }
        }
    })

}

const checkEmail = (email, callback = () => {}) => {
    $.ajax({
        type: 'post',
        url: `https://localhost:7165/api/User/CheckEmailExistence?email=${email}`,
        error: (error) => {
            console.log(error)
        },
        success: (message) => {
            if(message.status == false){
                popUpBox('alert', 'This email exists already!', 'catAlert')
                return
            }
            callback()
        }
    })
}

const AuthenticateUser = (userCredential, callback = () => {}) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/Authenticate`,
        data: `{
			"email": "${userCredential.email}",
			"password": "${userCredential.password}",
			"rememberMe": ${userCredential.rememberMe},
			"code": "${userCredential.code}"
		}`,
        dataType: "json",
        contentType: "application/json",
        success: (responseModel) => {
            if (responseModel.success == true) {
                console.log(responseModel.message)
                let data = JSON.parse(responseModel.message)
                UserId = parseInt(data.userId);
                Token = data.token;
                getUser(data.userId, data.token)
                setKeyValue(userIdKey, encodeText(`${UserId}`))
                setKeyValue(tokenKey, encodeText(Token))
                setKeyValue('pass', encodeText(userCredential.password))
                callback()
                chAuth()
                return
            }
            loader.addClass('hidden')
            popUpBox('alert', 'Please check you credentials', 'catAlert')
        }
    }).done((e)=>{
        chAuth()
    })
}

const addUser = (user, callback = () => {}) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/User/AddUser`,
        data: JSON.stringify(user),
        dataType: "json",
        contentType: "application/json",
        error: function(error) {console.log(error.responseText)},
        success: (responseModel) => {
            if (responseModel.success == true) {
                console.log(responseModel)
                callback()
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const updateUser = (userId, user, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/User/UpdateUser?userId=${userId}`,
        data: JSON.stringify(user),
        dataType: "json",
        contentType: "application/json",
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        error: function(error) {console.log(error.responseText)},
        success: (responseModel) => {
            if (responseModel.success == true) {
                getUser(UserId, Token)
                console.log(responseModel)
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const logout = () => {
    UserId = 0;
    Token = '';
    _user = new User()
    deleteKey(userIdKey)
    deleteKey(tokenKey)
    deleteKey('pass')
    _ROUTER.navigate('/home');
    chAuth()
}

const getUser = (userId, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/User/GetUser?id=${userId}`,
        data: '',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (user) => {
            _user = user
            console.log(user)
            getAccountDetail(userId, token)
        }
    }).done(() => {
        loader.addClass('hidden')
        loadDash();
    })
}

function loadDash() {
    $('.u-name').text(_user.firstName + " " + _user.lastName)
    $('.u-email').text(_user.email)
    $('.u-phone').text(_user.phone)
    $('.u-dob').text(_user.dob === Date ? _user.dob.toDateString() : _user.dob)
    $('.u-g').text(_user.gender)
    $('.u-address').text(_user.address)
    getUserSkill(UserId, Token)
    getUserSocial(UserId, Token)
}

const getAccountDetail = (userId, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/AccountDetail/GetAccountDetail?userId=${userId}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        error: (error) => {
            console.log(error)
        },
        success: (detail) => {
            _Detail = detail
            console.log(detail)
        }
    })
}

const getCatalogs = (token, callback = () => {}) => {
    $.ajax({
        type: 'get',
        url: `${BaseURL}api/Catalog/GetAllCatalogs`,
        /* beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        }, */
        success: (catalogs) => {
            Catalogs = catalogs
            console.log(catalogs)
        }
    }).done(()=>{
        callback(cat_template)
        modalInit()
        chAuth()
    })
}

const getCatalog = (catalogId, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/Catalog/GetCatalog?id=${catalogId}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (cat) => {
            catalog = cat
            console.log(cat)
        }
    })
}

const addCatalog = (catalog, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/Catalog/AddCatalog`,
        data: JSON.stringify(catalog),
        dataType: "json",
        contentType: "application/json",
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        error: function(error) {
            console.log(error)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                getCatalogs(Token)
                loadCatalog()
                console.log(responseModel.message)
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const updateCatalog = (catalogId, catalog, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/Catalog/UpdateCatalog?id=${catalogId}`,
        data: JSON.stringify(catalog),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                getCatalogs(Token)
                loadCatalog()
                console.log(responseModel.message)
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const getUserSkills = (token) => {
    $.ajax({
        type: 'get',
        url: `${BaseURL}api/UserSkill/GetUserSkills`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (catalogs) => {
            console.log(catalogs)
        }
    })
}

const getUserSkill = (userId, token) => {
    $.ajax({
        type: "post",
        url: `${BaseURL}api/UserSkill/GetUserSkillForUser?userId=${userId}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        },
        success: (skills) => {
            userSkills = skills;
            console.log(skills);
        },
    }).done(()=> {
        loadSkills()
        $('.sk-del').click((e) => {
            let id = e.target.parentElement.id.substring(6) || e.target.id.substring(6);
            deleteUserSkill(id)
            $(e.target.closest('.skill')).remove()
        })

        modalInit()
        //loader.addClass('hidden')
    })
}

const addUserSkills = (userSkill, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/UserSkill/AddUserSkills`,
        data: JSON.stringify(userSkill),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                getUserSkill(UserId, Token)
                console.log(responseModel.message)
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const updateUserSkill = (id, userSkill, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/UserSkill/UpdateUserSkill?id=${id}`,
        data: JSON.stringify(userSkill),
        dataType: 'json',
        contentType: 'application/json',
        error: (error) => {
            console.log(error)
        },
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                getUserSkill(UserId, Token)
                console.log(responseModel.message)
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const deleteUserSkill = (id, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/UserSkill/DeleteUserSkill?id=${id}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        error: (error) => {
            console.log(error)
        },
        success: (responseModel) => {
            getUserSkill(UserId, Token)
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const getUserSocials = (token) => {
    $.ajax({
        type: 'get',
        url: `${BaseURL}api/UserSocial/GetUserSocials`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (socials) => {
            console.log(socials)
        }
    })
}

const getUserSocial = (userId, token) => {
    $.ajax({
        type: "post",
        url: `${BaseURL}api/UserSocial/GetUserSocialForUser?userId=${userId}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        },
        success: (socials) => {
            userSocials = socials;
            console.log(socials);
        },
    }).done(() => {
        loadSocials()

        $('.sc-del').click((e) => {
            let id = e.target.id.substring(6) || e.target.parentElement.id.substring(6);
            deleteUserSocial(id)
            $(e.target.closest('.social')).remove()
        })
    })
}

const addUserSocial = (userSocial, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/UserSocial/AddUserSocial`,
        data: JSON.stringify(userSocial),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                getUserSocial(UserId, Token)
                console.log(responseModel.message)
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const updateUserSocial = (id, userSocial, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/UserSocial/UpdateUserSocial?id=${id}`,
        data: JSON.stringify(userSocial),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                getUserSocial(UserId, Token)
                console.log(responseModel.message)
                return
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}

const deleteUserSocial = (id, token) => {
    $.ajax({
        type: 'delete',
        url: `${BaseURL}api/UserSocial/DeleteUserSocial?id=${id}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        error: (error) => {console.log(error)},
        success: (responseModel) => {
            if(responseModel.success == true){
                getUserSocial(UserId, Token)
            }
            popUpBox('notify', `Failed: ${responseModel.message} `, 'catAlert')
        }
    })
}