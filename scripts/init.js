//const BaseURL = 'http://localhost:5000/'
const BaseURL = 'https://localhost:5001/'
//const BaseURL = 'https://localhost:7165/'
//const BaseURL = 'https://skillitapi.herokuapp.com/'
const ipAddressKey = 'ip_address'
const tokenKey = 'skillit-user-token'
const userIdKey = 'userId'
let ip_address = {
	ip: ''
};
let UserId = ''
let Token = ''
let skill = new Skill()//(9, 'Xamarin.Forms', Level[1])
let userSkill = new UserSkill()//(9, 9, UserId, skill)
let userSkills = new Array();
//userSkills.push(userSkill)

var globalAlertCancel = document.getElementById('cancelHandler');
var globalAlertConfirm = document.getElementById('alertBtnHandler');

let userLocation
getGeoLoc()

let loginInfos = new Array()
let loginAttemps = new Array()

let loginInfo = new LoginInfo()//('userLocation.coords.latitude', 'userLocation.coords.longitude', new Date(), false, true, ip_address.ip)
let loginAttemp = new LoginAttemp()//(new Date(), 'Justified', 'success')

//let user = new User(newUserId(), 'T-Rex', 'M', 'Tekoh', 't.rex@outlook.com', 't#rex', new Date(), 'Fundong', new Date(), '679097623', "", loginInfos, loginAttemps)


let social = new Social()//(9, 'Twitter', 'https://twitter/profile');
let userSocial = new UserSocial()//(8, 9, UserId, social)
let userSocials = new Array()


let _Detail = new AccountDetail()
let _user = new User();

let userCredential = new UserCredential()
/* new UserCredential(
	email = "k.n.alain@gmail.com",
	password = "kimbudfgchjvbk",
	rememberMe = false,
	code = "105f3921-3f54-4354-b440-7211d77c84c5"
) */

setInterval(()=>{
	chAuth()
}, 5000)

let catalog = new Catalog()//('New version of Jetbrains', 'Have you tried out the new version of JetBrains', 'https://learners.jetbrains.space/d/3MniFw3UDJQg?f=0.jpg', 'learners.jetbrains.space')

let Catalogs = new Array()

window.addEventListener("DOMContentLoaded", () => {
	if ('serviceWorker' in navigator) {
		try {
			//navigator.serviceWorker.register('serviceWorker.js');
			console.info("Succesfully registered Service Worker");
		} catch (error) {
			console.info("Service worker registration failed" + error);
		}
	}
})


if(KeyExists("ip_address")){
	try {
		ip_address = JSON.parse(getKeyValue('ip_address'))
	} catch (error) {
		console.info(error)
	}
}

getIP();




//initPage()
setEventHandlers()
