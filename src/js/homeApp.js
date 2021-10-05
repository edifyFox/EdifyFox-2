// const {TOPOLOGY} = require('vanta/src/vanta.topology');

$.post("http://localhost/PROJECTFILEPHP/php/home/quoteApi.php", function(data,status){
    document.getElementById("quoteApi").innerHTML = data;
}); 

$.post("http://localhost/PROJECTFILEPHP/php/home/announcements.php", function(data,status){
    document.getElementById("announcmentWrapper").innerHTML = data;
});

var backEffect = null;

function launchEffect() {

}
function stopEffect() {
    
}