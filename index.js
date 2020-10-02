blogs = JSON.parse(localStorage.getItem('blogs'));

var list  = document.querySelector("#blogdisplay");
for(var p in  blogs){
    var newli = document.createElement('li'); 
           newli.className = "classlist"  
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
rem1.addEventListener("click",function(e){
    e.preventDefault();
    var title = this.parentElement.children[1].textContent;
    removeOneBlog(title);
});

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
		if (blog.title === title) {
			console.log("hey");
			console.log(index)
			blogs.splice(index, 1);
		}
	});

	localStorage.setItem('blogs', JSON.stringify(blogs));
}

const tags  = document.querySelectorAll(".chips-placeholder");
   var t = M.Chips.init(tags,{placeholder:'add tag'});
   var tagsdata = t[0].chipsData;
   
var searchbutton = document.querySelector("#search-button");

searchbutton.addEventListener("click",function(e){
    e.preventDefault();
    let pp=document.querySelectorAll("classlist");
    for(let i=0;i<pp.length;i++)
    {
        pp[i].classList.add("hidden");
    }
    tagsdata.forEach(function(tag,index){
        search(tag);
    });
});
  

function  search(tag)
{
    let blogs;
	if (localStorage.getItem('blogs') === null) {
		blogs = [];
	} else {
        blogs = JSON.parse(localStorage.getItem('blogs'));
    }
    
    blogs.forEach(function (blog, index) {
          //console.log(blog);
        blog.tags.forEach(function(elements,index1){
            //console.log(elements.tag);
            //console.log(tag.tag);
            if(elements.tag == tag.tag)
            {
                var newli = document.createElement('li');   
                var del = document.createElement('button');
                del.className = "delete1-from-main";
                newli.appendChild(del)
                     .appendChild(document.createTextNode('X '));

                var sp = document.createElement('span');
                    sp.className = "blogtitle";  
                    sp.textContent = blog.title;
                    newli.appendChild(sp);
                    list.appendChild(newli);  
            }
        });		
    });
};
