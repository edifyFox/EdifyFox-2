class User {
	monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	constructor() {
		this.id = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.pwd = '';
		this.ddn = '';
		this.gender = '';
		this.country = '';
		this.sclevel = '';
		this.sec = '';
		this.grp = '';
		this.sgrp = '';
		this.ddc = '';
		this.imgSrc = '';
		this.session = false;
	}
	authenticate(ss) {
		this.id = ss.id;
		this.firstname = ss.firstname;
		this.lastname = ss.lastname;
		this.email = ss.email;
		this.pwd = ss.pwd;
		this.ddn = ss.ddn;
		this.country = ss.country;
		this.gender = ss.gender;
		this.sclevel = ss.sclevel;
		this.sec = ss.sec;
		this.grp = ss.grp;
		this.sgrp = ss.sgrp;
		this.ddc = ss.ddc;
		this.imgSrc = ss.ip;
		this.session = true;
	}
	login(nmusr,pscod,checked) {
		var status = false;
		$.ajax({
			url: 'https://edifyfox.com/php/chkedlogin.php',
			method: 'POST',
			data: {
				login: nmusr,
				pwd: pscod
			},
			dataType: 'json',
			success: function(root) {
				 if(root.id!="nan"){
					this.authenticate(root);
					if (checked) {
						localStorage.setItem('chkedlgn', JSON.stringify({"username" : nmusr,"password" : pscod}));
					}
					console.log("this is root ;",root);
					console.log('Login successful');
					status = true;
				} else {
					console.log('Password or email incorrect try again');
					status = false;
				}
			}
		});
		return status;
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
		let cDate = new Date(ddc);
		return `${monthNames[cDate.getMonth()]} ${cDate.getFullYear()}`;
	}
	getLevel() {
		switch (this.sclevel) {
			case 1:
				return "1st year student";
				break;
			case 2:
				return "1st year student";
				break;
			case 3:
				return "1st year student";
				break;
			case 4:
				return "1st year student";
				break;
			case 5:
				return "1st year student";
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
	logout() {
		this.id = '';
		this.firstname = '';
		this.lastname = '';
		this.email = '';
		this.ddn = '';
		this.country = '';
		this.gender = '';
		this.sclevel = '';
		this.sec = '';
		this.grp = '';
		this.sgrp = '';
		this.ddc = '';
		this.imgSrc = '';
		this.session = false;
	}

}

module.exports = User;