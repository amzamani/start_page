blogs = JSON.parse(localStorage.getItem('blogs'));

var list  = document.querySelector("#blogdisplay");
for(var p in  blogs){
    var newli = document.createElement('li');   
    var del = document.createElement('button');
    del.className = "delete1-from-main";
            newli.appendChild(del)
                 .appendChild(document.createTextNode('X '));

    var sp = document.createElement('span');
    sp.className = "blogtitle";  
        sp.textContent = blogs[p].title
        newli.appendChild(sp);
        list.appendChild(newli);      
};

var rem1 = document.querySelector(".delete1-from-main");
rem1.addEventListener("click",function(){
    var title = this.parentElement.children[1].textContent;
    removeOneBlog(title);
})

function removeOneBlog(title)
{
	let blogs;
	if (localStorage.getItem('blogs') === null) {
		blogs = [];
	} else {
		blogs = JSON.parse(localStorage.getItem('blogs'));
	}
	//   console.log(tasks);
	blogs.forEach(function (blog, index) {
		// console.log(title.textContent + 's');
		//   console.log(task,typeof(task))
		console.log(blog);
		console.log(title)
		if (blog.title === title) {
			console.log("hey");
			console.log(index)
			blogs.splice(index, 1);
		}
	});
	console.log(blogs);

	localStorage.setItem('blogs', JSON.stringify(blogs));
}
