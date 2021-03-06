class User {
	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	constructor() {
		this.id = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.pwd = '';
		this.ddn = '';
		this.sclevel = '';
		this.branche = '';
		this.sec = '';
		this.grp = '';
		this.sgrp = '';
		this.ddc = '';
		this.imgSrc = '';
		this.adresse = '';
		this.sessionid = '';
		this.session = false;
		this.modification = false;
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
		return `${dDate.getDate()} ${this.monthNames[dDate.getMonth()]} ${dDate.getFullYear()}`;
	}
	getSubsDay() {
		let cDate = new Date(this.ddc);
		return `${this.monthNames[cDate.getMonth()]} ${cDate.getFullYear()}`;
	}
	getLevel() {
		switch (parseInt(this.sclevel)) {
			case 1:
				return "1st year student";
				break;
			case 2:
				return "2nd year student";
				break;
			case 3:
				return "3rd year student";
				break;
			case 4:
				return "4th year student";
				break;
			case 5:
				return "5th year student";
				break;			
			default:
				return "student";
				break;
		}
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
		ajax.open("POST", "https://edifyfox.com/php/chkedlogin.php");
		ajax.send(formdata);
	}
	authenticate(root) {
		this.id = root.id;
		this.firstname = root.firstname;
		this.lastname = root.lastname;
		this.email = root.email;
		this.pwd = root.pwd;
		this.ddn = root.ddn;
		this.sclevel = root.sclevel;
		this.branche = root.branche;
		this.sec = root.sec;
		this.grp = root.grp;
		this.sgrp = root.sgrp;
		this.ddc = root.ddc;
		this.imgSrc = root.ip;
		this.adresse = root.adresse;
		this.session = true;
		this.modification = (root.modification == "1") ? true : false;
	}
	logout() {
		console.log('Logout ...');
		this.id = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.pwd = '';
		this.ddn = '';
		this.sclevel = '';
		this.branche = '';
		this.sec = '';
		this.grp = '';
		this.sgrp = '';
		this.ddc = '';
		this.imgSrc = '';
		this.adresse = '';
		this.sessionid = '';
		this.session = false;
		this.modification = false;
		console.log('see you later ...');
	}

}

module.exports = User;