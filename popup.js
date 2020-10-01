var send = document.getElementById("send1")

send.addEventListener("click",function(e){
    e.preventDefault();
    var title = document.querySelector(".title").value;
    console.log(title);
});