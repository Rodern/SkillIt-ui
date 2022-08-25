

function IsValid(val) {
    if (val.success == true) console.log(true)
}

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
        url: 'https:api.ipify.org/?format=json',
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
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
        }
    })
}

const newUserId = () => {
    return Math.floor(Date.now() / 5000)
}

const getGeoLoc = () => {
    navigator.geolocation.getCurrentPosition((location) => {
        userLocation = location
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
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
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
                callback(responseModel)
                isValid = responseModel.success
            }
        }
    })

}

const AuthenticateUser = (userCredential) => {
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
                UserId = data.userId;
                Token = data.token;
                getUser(data.userId, data.token)
                setKeyValue(userIdKey, encodeText(`${UserId}`))
                setKeyValue(tokenKey, encodeText(Token))
                return
            }
            console.log(responseModel.message)
        }
    })
}

const addUser = (user) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/User/AddUser`,
        data: JSON.stringify(user),
        dataType: "json",
        contentType: "application/json",
        error: function(error) {console.log(error.responseText)},
        success: (responseModel) => {
            if (responseModel.success == true) {
                //callback(responseModel)
                isValid = responseModel.success
                console.log(responseModel)
                return
            }
            console.log(responseModel)
        }
    })
}

const updateUser = (userId, user, token) => {
    $.ajax({
        type: 'put',
        url: `${BaseURL}api/User/UpdateUser/${userId}`,
        data: JSON.stringify(user),
        dataType: "json",
        contentType: "application/json",
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        error: function(error) {console.log(error.responseText)},
        success: (responseModel) => {
            if (responseModel.success == true) {
                //callback(responseModel)
                isValid = responseModel.success
                console.log(responseModel)
                return
            }
            console.log(responseModel)
        }
    })
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
            console.log(user)
            getAccountDetail(userId, token)
            getCatalogs(token)
        }
    })
}

const getAccountDetail = (userId, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/AccountDetail/GetAccountDetail?userId=${userId}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (detail) => {
            console.log(detail)
        }
    })
}

const getCatalogs = (token) => {
    $.ajax({
        type: 'get',
        url: `${BaseURL}api/Catalog/GetAllCatalogs`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (catalogs) => {
            console.log(catalogs)
        }
    })
}

const getCatalog = (catalogId, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/Catalog/GetCatalog?id=${catalogId}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (catalog) => {
            console.log(catalog)
        }
    })
}

const addCatalog = (catalog, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/Catalog/AddCatalog`,
        data: `{
			"caption": "${catalog.caption}",
			"description": "${catalog.description}",
			"imgLink": "${catalog.imgLink}",
			"catalogLink": "${catalog.catalog}"
		}`,
        dataType: "json",
        contentType: "application/json",
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
        }
    })
}

const updateCatalog = (catalogId, catalog, token) => {
    $.ajax({
        type: 'put',
        url: `${BaseURL}api/Catalog/UpdateCatalog?id=${catalogId}`,
        data: `{
			"caption": "${catalog.caption}",
			"description": "${catalog.description}",
			"imgLink": "${catalog.imgLink}",
			"catalogLink": "${catalog.catalog}"
		}`,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
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
        success: (catalog) => {
            console.log(catalog);
        },
    });
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
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
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
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (responseModel) => {
            if (responseModel.success == true) {
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
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
        success: (catalog) => {
            console.log(catalog)
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
        success: (catalogs) => {
            console.log(catalogs)
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
        success: (catalog) => {
            console.log(catalog);
        },
    });
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
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
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
                console.log(responseModel.message)
                return
            }
            console.log(responseModel.message)
        }
    })
}

const deleteUserSocial = (id, token) => {
    $.ajax({
        type: 'post',
        url: `${BaseURL}api/UserSocial/DeleteUserSocial?id=${id}`,
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        },
        success: (catalog) => {
            console.log(catalog)
        }
    })
}