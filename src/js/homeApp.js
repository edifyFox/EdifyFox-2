
$.post("http://localhost/PROJECTFILEPHP/php/home/quoteApi.php", function(data,status){
    document.getElementById("quoteApi").innerHTML = data;
}); 


$.post("http://localhost/PROJECTFILEPHP/php/adsServices/sponsoredHome.php", function(data,status){
    document.getElementById("sponsoredHomeWrapper").innerHTML = data;
});


function setWishPerTime() {
    if (user.session) {
        var day = new Date();
        var hr = day.getHours();
        if (hr >= 0 && hr < 12) {
            document.getElementById("shname").innerHTML = `Good Morning ${user.firstname} !`;
        } else if (hr == 12) {
            document.getElementById("shname").innerHTML = `Good Noon ${user.firstname} !`;
        } else if (hr >= 12 && hr <= 17) {
            document.getElementById("shname").innerHTML = `Good Afternoon ${user.firstname} !`;
        } else {
            document.getElementById("shname").innerHTML = `Good Evening ${user.firstname} !`;
        }
    }
}
