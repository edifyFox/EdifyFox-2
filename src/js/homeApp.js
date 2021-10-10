
$.post("http://localhost/PROJECTFILEPHP/php/home/quoteApi.php", function(data,status){
    document.getElementById("quoteApi").innerHTML = data;
}); 
