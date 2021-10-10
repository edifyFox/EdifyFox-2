monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function ordinal_suffix_of(i) {
	let j = i % 10;
	let k = i % 100;
	if (j == 1 && k != 11) {
		return i+"st";
	}
	if (j == 2 && k != 12) {
		return i+"nd";
	}
	if (j == 3 && k != 13) {
		return i+"rd";
	}
	return i+"th";
}

class User {
	constructor() {
		console.log('Iniating ...');
		this.id = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.pwd = '';
		this.ddn = '';
		this.gender = '';
		this.country = '';
		this.verified = false;
		this.imgSrc = '';
		this.ddc = '';
		this.accType = '';
		this.sessionid = '';
		this.session = false;
		this.sObj = null;
	}
	getName() {
		return `${this.firstname} ${this.lastname}`;
	}
	getAge() {
    	let dDate = new Date(this.ddn);
		let ageDifMs = Date.now() - dDate.getTime();
		let ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
	getBirthday() {
		let dDate = new Date(this.ddn);
		return `${dDate.getDate()} ${monthNames[dDate.getMonth()]} ${dDate.getFullYear()}`;
	}
	getSubsDay() {
		let cDate = new Date(this.ddc);
		return `${monthNames[cDate.getMonth()]} ${cDate.getFullYear()}`;
	}
	getPdp() {
		if (this.imgSrc != "") {
			return `https://edifyfox.com/php/${this.imgSrc}`;
		} else {
			return "img/defaultprf.jpg";
		}
	}
	setSessionId(id) {
		this.sessionid = id;
	}
	getSessionId() {
		return this.sessionid;
	}
	login(nmusr,pscod,checked,callBack) {
		var formdata = new FormData();
		formdata.append("login", nmusr);
		formdata.append("pwd", pscod);
		var ajax = new XMLHttpRequest();
		ajax.addEventListener("load", (event) => {
			var root = JSON.parse(event.target.response);
			if(root.id == "nan") {
				this.logout();
				console.log('Password or email incorrect try again ...');
				callBack(null,this.session);
			} else if (root.id == "verifcation") {
				this.logout();
				console.log(root.msg);
				callBack("Email Verification is required.\n An email was sent to you please check your primary inbox or Junk emails",null);
			}
			else if (root.id == "other") {
				this.logout();
				console.log(root.msg);
				callBack(root.msg,null);
			} else {
				this.authenticate(root);
				if (checked) {
					localStorage.setItem('chkedlgn', JSON.stringify({"username" : nmusr,"password" : pscod}));
					console.log('Login saved ...');
				}
				console.log('Login successful ...');
				callBack(null,this.session);
			}
		}, true);
		ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/loginsAndSignUps/logger.php");
		ajax.send(formdata);
	}
	authenticate(root) {
		this.id = root.id;
		this.firstname = root.firstname;
		this.lastname = root.lastname;
		this.email = root.email;
		this.pwd = root.pwd;	
		this.ddn = root.ddn;
		this.gender = root.gender;
		this.country = root.country;
		this.verified = (root.verified == "1") ? true : false;
		this.ddc = root.ddc;
		this.imgSrc = root.imgSrc;
		this.session = true;
		this.accType = root.type;
		if (root.type == "student") this.sObj = new Student(root);
		else if (root.type == "laureate") this.sObj = new Laureat(root);
	}
	logout() {
		console.log('Logout ...');
		this.id = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.pwd = '';
		this.ddn = '';
		this.gender = '';
		this.country = '';
		this.verified = false;
		this.ddc = '';
		this.imgSrc = '';
		this.sessionid = '';
		this.accType = '';
		this.session = false;
		this.sObj = null;
		console.log('see you later ...');
	}
}

class Student {
	constructor(root) {
		this.modification = (root.modification == "1") ? true : false;
		this.school = root.school;
		this.schoolId = root.schoolId;
		this.sclevel = root.sclevel;
		this.branche = root.branche;
		this.branchId = root.branchId;
		this.sec = root.sec;
		this.grp = root.grp;
		this.sgrp = root.sgrp;
	}
	getLevel() {
		return ordinal_suffix_of(parseInt(this.sclevel)) + " year student";
	}
}

class Laureat {
	constructor(root) {
		this.modification = (root.modification == "1") ? true : false;
		this.school = root.school;
		this.schoolId = root.schoolId;
		this.branche = root.branche;
		this.branchId = root.branchId;
	}
}

module.exports = {User, Student, Laureat};