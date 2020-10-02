
var send = document.getElementById("send1");

// var tag = document.addEventListener('keypress', function() {
//     var elems = document.querySelectorAll('.chip');
//     M.Chips.init(tags,{});
//   });

const tags  = document.querySelectorAll(".chips-placeholder");
   var t = M.Chips.init(tags,{placeholder:'add tag'});

   
send.addEventListener("click", function (e) {
    e.preventDefault();
    var title = document.querySelector(".title").value;
    var url = document.querySelector(".url").value;
    var desc = document.querySelector(".description").value;
    var tags = t[0].chipsData;
    // popup();
    store(title, desc, url,tags);
});

function store(title, desc, url,tags) {
    let blogs;
    if (localStorage.getItem('blogs') == null) {
        blogs = [];
    }
    else {
        blogs = JSON.parse(localStorage.getItem('blogs'));
    }

    blogs.push({ title, desc, url,tags});

    localStorage.setItem('blogs', JSON.stringify(blogs));


};