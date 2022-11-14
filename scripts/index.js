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
}

class ResponseModel {
    constructor(status, message) {
        this.status = status
        this.message = message
    }
}

class LoginInfo {
    constructor(longitude, latitude, dateTime, isOnline, isLoggedOut, ip) {
        this.longitude = longitude
        this.latitude = latitude
        this.dateTime = dateTime
        this.isOnline = isOnline
        this.isLoggedOut = isLoggedOut
        this.ip = ip
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
    constructor(userId, gender, firstname, lastname, email, password, dob, address, dateCreated, phone, image, loginInfos, loginAttemps){
        this.userId = userId
        this.gender = gender
        this.firstName = firstname
        this.lastName = lastname
        this.email = email
        this.password = password
        this.dob = dob
        this.address = address
        this.dateCreated = dateCreated
        this.phone = phone
        this.image = image
        this.loginInfos = loginInfos
        this.loginAttemps = loginAttemps
    }
}

class AccountDetail {
    constructor(acId, userId, lastLogin, accountType, loginInfos, accountStatus, loginAttemps) {
        this.acId = acId
        this.userId = userId
        this.lastLogin = lastLogin
        this.accountType = accountType
        this.loginInfo = loginInfos
        this.accountStatus = accountStatus
        this.loginAttemp = loginAttemps
        this.user = null
    }
}

class Catalog {
    constructor(caption, description, image, catalogLink = 'not set') {
        this.catalogId = 0
        this.caption = caption
        this.description = description
        this.image = image
        this.catalogLink = catalogLink
    }
}

const Level = [
    'Beginner',
    'Amateur',
    'Intermediate',
    'Professional',
    'GodLevel &#128516'
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


const loader = $('.loading-frame')

let cat_template = (catalog) => {
    return `<div class="catalog flex flex-col justify-center shadow-lg rounded-lg w-60 h-auto h-max px-2" id=${catalog.catalogId}>
                <img src="data:image/png;base64,${catalog.image}" alt="" class="w-full h-40 rounded-md">
                <h4 class="cat-name font-bold text-lg">${catalog.caption}</h4>
                <p class="cat-desc brak-words truncate  pb-4" title="${catalog.description}">${catalog.description}</p>
                <a href="${catalog.catalogLink}" target="_blank"
                    class="view-cat text-md mt-auto text-center text-white bg-blue-600 w-24 hover:shadow-lg hover:bg-blue-700 rounded px-2 py-2" id=${catalog.catalogId}>View</a>
            </div>`
}


let socialTemplate = (socail, img) => {
    return `<div id="${socail.socialId}" class="social w-full flex flex-row h-9 my-1 items-center rounded-md shadow-md">
						<img src="${img}"  alt="" class="ml-1 mr-2 s-img h-8 w-8 ">
						<a href="${socail.link}" target="_blank" rel="noreferrer noopener" class="s-name">${socail.name}</a>
						<button id="sc_del${socail.socialId}" title="Delete" class="sc-del  h-7 w-7 ml-auto mr-1 text-white flex justify-center items-center text-2xl text-center text-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
								class="w-6 h-6">
								<path stroke-linecap="round" fill="black" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>`
}

let skillTemplate = (skill) => {
    return `<div id="skill${skill.skillId}" class="skill text-slate-800 bg-white w-full flex flex-row h-auto my-1 pl-2 pb-1 items-center rounded-md shadow-md">
                <p class="sk-name font-bold">${skill.name}&nbsp;|</p>
                <p class="sk-level">&nbsp;${skill.level}</p>
                <button id="sk_del${skill.skillId}" title="Delete" class="sk-del  h-7 w-7 ml-auto mr-1 text-black flex justify-center items-center text-2xl text-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        class="w-6 h-6">
                        <path stroke-linecap="round" fill="black" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>`
}

const info_edit_template = (name, type, max, placeholder, callback) => {
    $('.in').remove()
    let t = `<div id="fl_edit" class="in  absolute bg-white  flex flex-row h-10 rounded-lg border shadow-2xl w-60 justify-center items-center">
                <input  type="${type}" maxlength="${max}" placeholder="${placeholder}" class="w-full px-1 mx-1">
                <button id="save-${name}" title="save change"
                    class="edit-info h-8 w-8 mr-1 hover:bg-blue-600 focus:bg-blue-700 bg-slate-200 p-[.1rem] ml-auto rounded-md flex justify-center items-center">
                    <img class=" h-8 w-8 m-5 " src="assets/icons/save.svg" alt="">
                </button>
            </div>`
    $('.personal').append(t).ready(() => {
        $('.in input').keyup(function (e) {
            e.preventDefault();
            if(e.which === 13) {
                //$(`#${e.target.nextElementSibling.id}`);
            }
        })
        $(`#save-${name}`).click(()=>{
            let val = $('.in input').val()
            if (val == '') {
                popUpBox('fail', 'Input was empty.', 'catAlert')
                return
            }
            loader.removeClass('hidden')
            callback(val)
            updateUser(
                UserId,
                new User(UserId, _user.gender, _user.firstName, _user.lastName, _user.email, decodeText(getKeyValue('pass')), _user.dob, _user.address, _user.dateCreated, _user.phone, '', JSON.parse(_Detail.loginInfo), JSON.parse(_Detail.loginAttemp)),
                dataURLtoFile(_user.image, 'userImage'),
                Token
            )

            $('.in').remove()
        })
    })
}

const info_img_template = (name, accept = '') => {
    $('.in').remove()
    let t = '';
    t = `<div id="fl_edit" class="in  absolute bg-white  flex flex-row h-10 rounded-lg border shadow-2xl w-60 justify-center items-center">
                <input  type="file"  accept="${accept}" class="w-full px-1 mx-1">
                <button id="save-${name}" title="save change"
                    class="edit-info h-8 w-8 mr-1 hover:bg-blue-600 focus:bg-blue-700 bg-slate-200 p-[.1rem] ml-auto rounded-md flex justify-center items-center">
                    <img class=" h-8 w-8 m-5 " src="assets/icons/save.svg" alt="">
                </button>
            </div>`
    $('.avt').append(t);
    $('.avt').append(t).ready(()=>{
        $('.in input').focus(function (e) { 
            e.preventDefault();
            
        })
        $(`#save-${name}`).click(()=>{
            let file = $('.in input')
            if (file[0].files[0] === undefined) {
                popUpBox('fail', 'No img selected.', 'catAlert')
                return
            }
            loader.removeClass('hidden')
            updateUser(
                UserId,
                new User(UserId, _user.gender, _user.firstName, _user.lastName, _user.email, decodeText(getKeyValue('pass')), _user.dob, _user.address, _user.dateCreated, _user.phone, '', JSON.parse(_Detail.loginInfo), JSON.parse(_Detail.loginAttemp)),
                file[0].files[0],
                Token
            )
            
            $('.in').remove()
        })
    })
}

let isMenuOpen = false

$(document).click((e)=>{
    if (e.target.id == 'fl_edit' || e.target.closest('#fl_edit') != null || e.target.id == 'edit-info' || e.target.closest('.edit-info') != null) return
    $('#fl_edit').remove()
    if (e.target.className == 'menu' || e.target.closest('.menu') != null || e.target.id == 'menu_btn' || e.target.closest('#menu_btn') != null) return
    $('.menu').fadeOut(200)
})

const loadLandingPage = () => {
    $('title').text('SkillIT - Home')
    loader.removeClass('hidden')
    $('.page, .modal').remove();

    $('.pg-section').load('routes/landing.html').ready(() => {
        setEventHandlers()
    })
}

const loadDashbaord = () => {
    $('title').text('SkillIT - Dashbaord')
    loader.removeClass('hidden')
    $('.page, .modal').remove();
    if (KeyExists(tokenKey) == false) {
        _ROUTER.navigate('/home')
        return
    }
    function cb(){
        $('.pg-section').load('routes/dashboard.html').ready(() => {
            setEventHandlers()
        })
    }
    if (_Detail.userId !== undefined || _user.userId !== undefined){
        cb()
        return
    }
    initiateUser(cb)
}

const loadCatalog = () => {
    $('title').text('SkillIT - Catalog')
    loader.removeClass('hidden')
    $('.page, .modal').remove()
    $('.pg-section').load('routes/catalogs.html').ready(() => {
        setEventHandlers()
    })
}

const loadSignup = () => {
    $('title').text('SkillIT - Sign Up')
    loader.removeClass('hidden')
    $('.modal').remove()
    $('.floating-content-1').load('routes/signup.html').ready(() => {
        setEventHandlers()
    })
}

function clearFlc(s = '.flc'){
    $('.flc').html('')
}

let loadSignin = () => {
    $('title').text('SkillIT - Sign In')
    loader.removeClass('hidden')
    $('.modal').remove()
    $('.floating-content-1').load('routes/login.html').ready(() => {
        setEventHandlers()
    })
}

const loadReset = () => {
    loader.removeClass('hidden')
    $('.modal').remove()
    $('.floating-content-2').load('routes/reset.html').ready(() => {
        setEventHandlers()
    })
}

const loadAbout = () => {
    if ('home' == location.href.substring(location.href.lastIndexOf('#') + 1)){
        setTimeout(() => {
            location.href = location.origin + "#about"
        }, 500)
        return
    }
    _ROUTER.navigate('/home')
    setTimeout(()=> {
        $('title').text('SkillIT - About')
        location.href = location.origin + "#about"
    }, 500)
}

const loadSocials = () => {
    try {
        let sDom = $('.socials')
        sDom.html('')
        userSocials.forEach(us => {
            let img = '';
            //console.log(us.social)
            if (us.social.name.toLowerCase().includes('facebook') || us.social.link.toLowerCase().includes('facebook'))
                img = 'assets/icons/fb.png'
            if (us.social.name.toLowerCase().includes('github') || us.social.link.toLowerCase().includes('github'))
                img = 'assets/icons/github.png'
            if (us.social.name.toLowerCase().includes('twitter') || us.social.link.toLowerCase().includes('twitter'))
                img = 'assets/icons/twitter.png'
            if (us.social.name.toLowerCase().includes('linkedin') || us.social.link.toLowerCase().includes('linkedin'))
                img = 'assets/icons/linkedin.png'
            if (us.social.name.toLowerCase().includes('whatsapp') || us.social.link.toLowerCase().includes('whatsapp'))
                img = 'assets/icons/whatsapp.png'
            sDom.append(socialTemplate(us.social, img))
        })
    } catch (error) {
        
    }
}

const loadSkills = () => {
    try {
        let sDom = $('.skills')
        sDom.html('')
        userSkills.forEach(us => {
            if (us.skill.level == "GodLevel") us.skill.level = Level[4]
            sDom.append(skillTemplate(us.skill))
        })
    } catch (error) {
        
    }
}

const initPage = () => {
    /* let page = location.href.substring(location.href.lastIndexOf('#') + 1)
    if((page.substring(location.href.lastIndexOf('#') + 1).substring(0, page.substring(location.href.lastIndexOf('#') + 1).lastIndexOf('/')) == location.origin || page == 'home')){
        _ROUTER.navigate('/home')
    }
    if (page == 'about') {
        _ROUTER.navigate('/home')
        setTimeout(() => {
            location.href = location.origin + "#about"
        }, 500)
    }
    if(page == 'catalogs'){
        _ROUTER.navigate('/catalogs')
    }
    if(page == 'dashboard'){
        _ROUTER.navigate('/dashboard')
    } */
    routeToPath(getRouteName());
    setEventHandlers()
    chAuth()
}


let getRouteName = (url = location.href) => {
    return location.href.substring(url.lastIndexOf('#') + 1)
}

let IsLoggedIn = (callback) => {
    let IsLoggedIn = getKeyValue(IsLoggedInKeyName);
    if (IsLoggedIn != 'true') {
        _ROUTER.navigate('/welcome')
        return
    }
    callback()
}

const routeToPath = (name) => {
    /* if (name == 'welcome' && GetKeyValue(IsLoggedInKeyName) == 'true'){
        history.back()
        return
    }
    IsLoggedIn(() => {
    }) */
    _ROUTER.navigate(`/${name}`)
}
const pageRoute = (event) => {
    event = event || window.event
    event.preventDefault()
    console.count('RouteCount')
    routeToPath(getRouteName())
}


window.onload = (e) => {
    e.preventDefault()
    let page = location.href.substring(location.href.lastIndexOf('#') + 1)
    if((page.substring(location.href.lastIndexOf('#') + 1).substring(0, page.substring(location.href.lastIndexOf('#') + 1).lastIndexOf('/')) == location.origin || page == 'home' || page == '')){
        _ROUTER.navigate('/home')
        return
    }
    initPage();
}

window.pageRoute = pageRoute

window.onpopstate = ()=>{
    //routeToPath(getRouteName())
}

window.onhashchange = (e) => {
    e.preventDefault()
    _RouteChanged = true
    routeToPath(getRouteName(e.newURL))
}

window.onpageshow = function name(params) {
    //alert("params")
}


const list1 = ".ms-btn, .ns-btn, .bs-btn, .ml-btn, .nl-btn, .bl-btn, .for-o, .p-avt"
const list2 = ".m-usr, .n-usr, .for-l, .mlg-btn"
function chAuth(){
    if (_Detail.userId === undefined || _user.userId === undefined) {
        //console.log(true)
        $("" + list2 + "").hide()
        $("" + list1 + "").show()
    }
    else {
        //console.log(false)
        //$(' .m-usr > span, .n-usr > span').text(_user.firstName + " " + _user.lastName);
        //$(' .m-usr > span, .n-usr').append(``)
        $('.user-svg').remove()
        $('.nav-links.n-usr').append(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-5 h-5 ml-1 user-svg">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>`)
        if (_user.image.length != 0)
            $('.u-img').attr('src', 'data:image/png;base64,'+_user.image)
        $("" + list1 + "").hide()
        $("" + list2 + "").show()
    }
}



window.addEventListener("popstate", function (e) {
    let v = location.href.substring(location.href.lastIndexOf('#') + 1)
    //initPage()
});


const exitModal = (callback = () => {}) => {
    $('.modal').remove();
    callback();
}

function setEventHandlers() {
    $(`
        .org-info, .home-btn, .menu ul li, 
        .about, #menu_btn, .ml-btn, 
        .nl-btn, .bl-btn, .ms-btn, .ns-btn, 
        .bs-btn, .bc-btn, .nc-btn, .mc-btn, 
        .exit, .to-login, .to-signup, .forgot, 
        .mlg-btn, .nlg-btn, .ds-btn, .m-usr, 
        .n-usr, .code-submit, .email-submit, 
        .submit-email-btn, .code-send-btn, 
        #reset_email
    `).unbind('click')
    //$('.pg-section *').unbind('click')
    $('.org-info, .home-btn').click((e)=>{
        _ROUTER.navigate('/home')
    })
    $('.menu ul li').click(()=>{
        $('.menu').fadeOut(200)
    })
    $('.about').click((e)=>{
        loadAbout()
    })
    
    $('#menu_btn').click(() => {
        $('.menu').fadeToggle(200)
    })
    
    try {
        $('nav.menu').css({
        'top': getComputedStyle(document.querySelector('header')).height,
        height: innerHeight - parseInt(getComputedStyle(document.querySelector('header')).height.replace('px', '')) + 'px'
    })
    } catch (error) {
        
    }

    $('.ml-btn, .nl-btn, .bl-btn, .p-avt').click((e) => {
        e.preventDefault()
        loadSignin()
    })
    $('.ms-btn, .ns-btn, .bs-btn').click((e)=>{
        e.preventDefault()
        loadSignup()
    })

    $('.bc-btn, .nc-btn, .mc-btn').click((e) => {
        e.preventDefault()
        _ROUTER.navigate('/catalogs')
        $('.page, .modal').remove();
    })

    $('.exit').click((e) => {
        e.preventDefault()
        exitModal()
    })

    //Login and signup
    const toggleEye = document.querySelectorAll(".toggleLock");

    toggleEye.forEach(e => {
        const password = e.nextElementSibling;
        e.addEventListener("click", function () {
            //toggle the type attribute
            let type = "";
            let src = "";
            type = password.getAttribute("type", type) === "password" ? "text" : "password";
            password.setAttribute("type", type);

            //toggle icon
            src = password.getAttribute("type", src) === "password" ? "../assets/icons/locked.svg" : "../assets/icons/unlocked.svg";
            e.children[0].setAttribute("src", src);
        });
    });

    $('.to-signup').click(()=>{
        loadSignup()
    })

    $('.to-login').click(()=>{
        loadSignin()
    })

    $('.submit-email-btn').click((e)=>{
        let email = $('#reset_email').val()
        if(email == '' || email == null){
            popUpBox('alert', 'Enter your email!')
            return
        }
        function callback(){
            clearPopUpBox()
            loader.removeClass('hidden')
            getResetCode(email, (msg) => {
                popUpBox('notify', msg)
                $('.email-submit').fadeOut(100)
                $('.code-submit').fadeIn(100)
            })
        }
        popUpBox('warn', 'Complete this process in one session or you will lose your reset code.', 'confirmWarning', '', callback)
    })

    $('.code-send-btn').click((e)=>{
        let code = $('#code').val()
        if(code == '') {
            popUpBox('alert', 'No code provided, enter the code sent your email.')
            return
        }
        if(code != getKeyValue('reset-code')){
            popUpBox('error', 'Wrong Code: Do copy and paste the code exact else restart the process.')
            return
        }
        $('.code-submit').fadeOut(100)
        $('.pass-reset').fadeIn(100)
    })

    $('.pass-reset-btn').click((e)=>{
        let pass1 = $('#password').val()
        let pass2 = $('#cpassword').val()
        pass1 = TrimSpace(pass1)
        pass2 = TrimSpace(pass2)
        if(pass1 == '' || pass2 == '') {
            popUpBox('alert', 'Enter and confirm your new password!')
            return
        }
        if(pass1 != pass2){
            popUpBox('error', 'Password does not match, kindly check again.')
            return
        }
        loader.removeClass('hidden')
        resetPassword(new UserCredential(getKeyValue('reset-email'), pass1, false, getKeyValue('reset-code')), function(){
                    //clearFlc('floating-content-2')
                    deleteKey('reset-email')
                    deleteKey('reset-code')
                    exitModal(()=>{
                        loadSignin()
                        clearPopUpBox()
                    })
                })
    })

    $('.forgot').click(()=>{
        loadReset()
    })

    $('.mlg-btn, .nlg-btn').click((e)=>{
        logout()
    })

    //Dashboard
    $('.ds-btn, .m-usr, .n-usr').click(()=>{
        _ROUTER.navigate('/dashboard')
    })
}

