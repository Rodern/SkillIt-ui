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
    constructor(userId, gender, firstname, lastname, email, password, dob, address, dateCreated, phone, imgBase64, loginInfos, loginAttemps){
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
        this.imgBase64 = imgBase64
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
    constructor(caption, description, imgBase64, catalogLink = 'not set') {
        this.caption = caption
        this.description = description
        this.imgBase64 = imgBase64
        this.catalogLink = catalogLink
    }
}

const Level = [
    'Beginner',
    'Amatuer',
    'Intermediate',
    'Professional',
    'Professional'
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

function toBase64(imglink) {
    var imgSRC = new FileReader();
    imgSRC.readAsDataURL(imglink)//($('.' + tclass + ' > #imageSelect')[0].files[0]);

    imgSRC.onload = function () {
        g_img = imgSRC.result;
    }
    imgSRC.error = function (error) {
        console.log('Error: ', error);
    }
}

const loader = $('.loading-frame')

let cat_template = (catalog) => {
    return `<div class="catalog flex flex-col justify-center shadow-lg rounded-lg w-60 h-auto h-max px-2" id=${catalog.catalogId}>
                <img src="${catalog.imgBase64}" alt="" class="w-full h-40 rounded-md">
                <h4 class="cat-name font-bold text-lg">${catalog.caption}</h4>
                <p class="cat-desc brak-words truncate  pb-4">${catalog.description}</p>
                <a
                    class="view-cat text-md mt-auto text-center text-white bg-blue-600 w-24 hover:shadow-lg hover:bg-blue-700 rounded px-2 py-2" id=${catalog.catalogId}>View</a>
            </div>`
}


let socialTemplate = (socail, img) => {
    return `<div id="${socail.socialId}" class="social w-full flex flex-row h-9 my-1 items-center rounded-md shadow-md">
						<img src="${img}"  alt="" class="ml-1 mr-2 s-img h-8 w-8 ">
						<a href="${socail.link}" class="s-name">${socail.name}</a>
						<button id="sc_del${socail.socialId}" class="sc-del  h-7 w-7 ml-auto mr-1 text-white flex justify-center items-center text-2xl text-center text-white">
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
						<button id="sk_del${skill.skillId}" class="sk-del  h-7 w-7 ml-auto mr-1 text-black flex justify-center items-center text-2xl text-center text-white">
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
                <button id="save-${name}"
                    class="edit-info h-8 w-8 mr-1 hover:bg-blue-600 focus:bg-blue-700 bg-slate-200 p-[.1rem] ml-auto rounded-md flex justify-center items-center">
                    <img class=" h-8 w-8 m-5 " src="assets/icons/save.svg" alt="">
                </button>
            </div>`
    $('.personal').append(t).ready(()=>{
        
    $(`#save-${name}`).click(()=>{
        let val = $('.in input').val()
        if (val == '') {
            popUpBox('info', 'Failed: Input was empty.', 'catAlert')
        }
        callback(val)
        $('.in').remove()
    })
    })
}

$(document).click((e)=>{
    if (e.target.id == 'fl_edit' || e.target.closest('#fl_edit') != null || e.target.id == 'edit-info' || e.target.closest('.edit-info') != null) return
    $('#fl_edit').remove()
    if (e.target.className == 'menu' || e.target.closest('.menu') != null || e.target.id == 'menu_btn' || e.target.closest('#menu_btn') != null) return
    $('.menu').fadeOut(200)
})

const loadLandingPage = () => {
    loader.removeClass('hidden')
    $('.page, .modal').remove();

    $('.pg-section').load('routes/landing.html').ready(() => {
        modalInit()
    })
}

const loadDashbaord = () => {
    loader.removeClass('hidden')
    $('.page, .modal').remove();
    if (_Detail.userId === undefined || _user.userId === undefined) {
        _ROUTER.navigate('/home')
        return
    }
    $('.pg-section').load('routes/dashboard.html').ready(() => {
        modalInit()
    })
}

const loadCatalog = () => {
    loader.removeClass('hidden')
    $('.page, .modal').remove()
    $('.pg-section').load('routes/catalogs.html').ready(() => {
        modalInit()
    })
}

const loadSignup = () => {
    loader.removeClass('hidden')
    $('.modal').remove()
    $('.floating-content-1').load('routes/signup.html').ready(() => {
        modalInit()
    })
}

function clearFlc(s = '.flc'){
    $('.flc').html('')
}

let loadSignin = () => {
    loader.removeClass('hidden')
    $('.modal').remove()
    $('.floating-content-1').load('routes/login.html').ready(() => {
        modalInit()
    })
}

const loadReset = () => {
    loader.removeClass('hidden')
    $('.modal').remove()
    $('.floating-content-2').load('routes/reset.html').ready(() => {
        modalInit()
    })
}

const loadAbout = () => {
    if ('about' == location.href.substring(location.href.lastIndexOf('#') + 1)){
        setTimeout(() => {
            location.href = location.origin+"#about"
        }, 500)
        return
    }
    if ('home' == location.href.substring(location.href.lastIndexOf('#') + 1)){
        setTimeout(() => {
            location.href = location.origin + "#about"
        }, 500)
        return
    }
    _ROUTER.navigate('/home')
    setTimeout(()=> {
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
            sDom.append(skillTemplate(us.skill))
        })
    } catch (error) {
        
    }
}

const initPage = () => {
    let page = location.href.substring(location.href.lastIndexOf('#') + 1)
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
        if (_Detail.userId === undefined || _user.userId === undefined){
            _ROUTER.navigate('/home')
            return
        }
        _ROUTER.navigate('/dashboard')
    }
    modalInit()
    chAuth()
}

const list1 = ".ms-btn, .ns-btn, .bs-btn, .ml-btn, .nl-btn, .bl-btn, .for-o"
const list2 = ".m-usr, .n-usr, .for-l"
function chAuth(){
    if (_Detail.userId === undefined || _user.userId === undefined) {
        console.log(true)
        $("" + list2 + "").hide()
        $("" + list1 + "").show()
    }
    else {
        console.log(false)
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


function modalInit() {
    console.log('yes')
    $('.org-info').click((e)=>{
        loadLandingPage()
    })
    $('.menu ul li').click(()=>{
        $('.menu').fadeOut(200)
    })
    $('.about').click((e)=>{
        loadAbout()
    })
    $('#menu_btn').click(() => {
        $('.menu').fadeIn(200)
    })
    $('.ml-btn, .nl-btn, .bl-btn').click((e) => {
        e.preventDefault()
        loadSignin()
    })
    $('.ms-btn, .ns-btn, .bs-btn').click((e)=>{
        e.preventDefault()
        loadSignup()
    })

    $('.bc-btn, .mc-btn').click((e) => {
        e.preventDefault()
        _ROUTER.navigate('/catalogs')
        $('.page, .modal').remove();
    })

    let c_img = $('#catImg')
    $(c_img).on('change', () => {
        if (c_img[0].files[0] === undefined) return
        toBase64(c_img[0].files[0])
    })
    $('.save-cat-btn').click(function(){
        loader.removeClass('hidden')
        catalog = new Catalog($('#catCaption').val(), $('#catDesc').val(), g_img, "link")
        if ((catalog.caption == null || catalog.caption == "") || (catalog.description == null || catalog.description == "") || c_img[0].files[0] === undefined){
            popUpBox('info', 'There are empty field(s), please check again!', 'catAlert')
            loader.addClass('hidden')
            return
        }
        console.log(catalog)
        addCatalog(catalog, Token)
        catalog = new Catalog();
        g_img = ''
        $('input').val('')
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

    $('.forgot').click(()=>{
        loadReset()
    })

    $('.login-btn').click((e)=>{
        let cred = new UserCredential($('#email').val(), $('#password').val(), false, "");
        if (cred.email == '' || cred.password == '') {
            popUpBox('info', 'There are empty field(s), please check again!', 'catAlert')
        }
        AuthenticateUser(cred, ()=>{
            _ROUTER.navigate('/dashboard')
        })
        
        $('input').val('')
    })

    $('.signup-btn').click((e)=>{
        let password = $('#password').val()
        let cpassword = $('#cpassword').val()
        if(password != cpassword){
            console.log('No password match')
            return
        }
        let this_user = new User(newUserId(), 'm', TrimSpace($('#firstname').val()), TrimSpace($('#lastname').val()), TrimSpace($('#user_email').val()), TrimSpace(cpassword), new Date(), 'Address', new Date(), $('#phone').val(), "img")
        if (this_user.firstName == '' || this_user.lastName == '' || this_user.email == '' || this_user.password == '' || this_user.phone == '') {
            popUpBox('info', 'There are empty field(s), please check again!', 'catAlert')
            return
        }
        let this_lgs = Array()
        let this_lgas = Array()
        this_lgs.push(new LoginInfo(`${newUserId()}`, `${newUserId()}`, new Date(), false, true, ip_address.ip))
        this_lgas.push(new LoginAttemp(new Date(), 'Justified', 'success'))
        this_user.loginAttemps = this_lgas
        this_user.loginInfos = this_lgs
        console.log(this_user)
        checkEmail(this_user.email, ()=>{
            addUser(this_user, () => {
                AuthenticateUser(new UserCredential(this_user.email, this_user.password, false, ''), () => {
                    _ROUTER.navigate('/dashboard')
                })
            })
            
            chAuth()
        })
        //addUser(this_user)
        $('input').val('')
    })

    $('.mlg-btn, .nlg-btn').click((e)=>{
        logout()
    })

    //Dashboard
    $('.ds-btn, .m-usr, .n-usr').click(()=>{
        _ROUTER.navigate('/dashboard')
    })
    $('.save-social-btn').click((e) => {
        social = new Social(0, $('#nscn').val(), $('#nscp').val())
        if (social.name == '' || social.link == '') {
            popUpBox('info', 'There are empty field(s), please check again!', 'catAlert')
        }
        userSocial = new UserSocial(0, 0, UserId, social)
        addUserSocial(userSocial, Token)
        $('input').val('')
    })

    $('.save-skill-btn').click((e) => {
        skill = new Skill(0, $('#nskn').val(), $('#nskp').val())
        if (skill.name == '' || skill.level == '') {
            popUpBox('info', 'There are empty field(s), please check again!', 'catAlert')
        }
        let us = new UserSkill(0, 0, UserId, skill)
        let skills = new Array()
        skills.push(us)
        console.log(skills)
        addUserSkills(skills, Token)
        $('input').val('')
    })

    $('#d_phone').click((e) => {
        function cb(val) {
            user.phone = val;
            user.username = 'undefined';
            updateUser(UserId, _user, Token)
            $('.u-phone').text(val)
        }
        info_edit_template('phone', 'tel', 9, 'Enter phone number', cb)
    })

    $('#u_dob').click((e) => {
        function cb(val) {
            user.dob = val;
            user.username = 'undefined';
            updateUser(UserId, _user, Token)
            $('.u-dob').text(val)
        }
        info_edit_template('dob', 'date', 100, 'Date', cb)
    })

    $('#u_g').click((e) => {
        function cb(val) {
            if (val.toLowerCase() == 'm')
                user.userSKillId = 0;
            else user.userSKillId = 1;
            user.username = 'undefined';
            updateUser(UserId, _user, Token)
            $('.u-g').text(val)
        }
        info_edit_template('g', 'text', 1, 'M or F', cb)
    })

    $('#u_address').click((e) => {
        function cb(val) {
            user.address = val;
            user.username = 'undefined';
            updateUser(UserId, _user, Token)
            $('.u-address').text(val)
        }
        info_edit_template('add', 'text', 100, 'Address', cb)
    })
}

