blogs = JSON.parse(localStorage.getItem('blogs'));

var list = document.querySelector('#blogdisplay');
for (var p in blogs) {
	var newli = document.createElement('li');
	var del = document.createElement('button');
	del.className = 'delete1-from-main';
	newli.appendChild(del).appendChild(document.createTextNode('X '));

	var sp = document.createElement('span');
	sp.className = 'blogtitle';
	sp.textContent = blogs[p].title;
	newli.appendChild(sp);
	list.appendChild(newli);
}
// console.log(blogs.length);
if (blogs != undefined && blogs.length > 0) {
	var rem1 = document.querySelectorAll('.delete1-from-main');
	for (let i = 0; i < rem1.length; i++) {
		rem1[i].addEventListener('click', function () {
			console.log('hel');
			var title = this.parentElement.children[1].textContent;
			this.parentElement.remove();
			removeOneBlog(title);
		});
	}

	function removeOneBlog(title) {
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
			console.log(title);
			if (blog.title === title) {
				console.log('hey');
				console.log(index);
				blogs.splice(index, 1);
			}
		});
		console.log(blogs);

		localStorage.setItem('blogs', JSON.stringify(blogs));

		const tags = document.querySelectorAll('.chips-placeholder');
		var t = M.Chips.init(tags, { placeholder: 'add tag' });
		var tagsdata = t[0].chipsData;

		var searchbutton = document.querySelector('#search-button');

		searchbutton.addEventListener('click', function (e) {
			e.preventDefault();
			let pp = document.querySelectorAll('classlist');
			for (let i = 0; i < pp.length; i++) {
				pp[i].classList.add('hidden');
			}
			tagsdata.forEach(function (tag, index) {
				search(tag);
			});
		});

		function search(tag) {
			let blogs;
			if (localStorage.getItem('blogs') === null) {
				blogs = [];
			} else {
				blogs = JSON.parse(localStorage.getItem('blogs'));
			}

			blogs.forEach(function (blog, index) {
				//console.log(blog);
				blog.tags.forEach(function (elements, index1) {
					//console.log(elements.tag);
					//console.log(tag.tag);
					if (elements.tag == tag.tag) {
						var newli = document.createElement('li');
						var del = document.createElement('button');
						del.className = 'delete1-from-main';
						newli.appendChild(del).appendChild(document.createTextNode('X '));

						var sp = document.createElement('span');
						sp.className = 'blogtitle';
						sp.textContent = blog.title;
						newli.appendChild(sp);
						list.appendChild(newli);
					}
				});
			});
		}
	}
}

let date123 = new Date();
let time123 = date123.getHours() + ':' + date123.getMinutes();
// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const timeInput = document.querySelector('#time');
const startBtn = document.querySelector('.start-tasks');
const schedule_display = document.querySelector('.schedule');
const schedule_table = document.querySelector('.schedule_table');
const add_tasks_schedule = document.querySelector('.add_tasks_ples');
const loader = document.querySelector('.progress');
// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
	// Start tasks
	startBtn.addEventListener('click', startTasks);
}

// Get Tasks from Local Storage
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		let p = document.createElement('p');
		p.innerHTML = `${task.time}`;
		// Create text node and append to li
		li.appendChild(document.createTextNode(task.task));
		li.appendChild(p);
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html

		link.innerHTML = `<img src="img/ant-design_close-circle-twotone.svg" alt="">`;

		// Append the link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	if (taskInput.value === '' || timeInput.value === '') {
		alert('Add a task');
	} else {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		let p = document.createElement('p');
		p.innerHTML = `${timeInput.value}`;
		li.appendChild(document.createTextNode(taskInput.value));
		li.appendChild(p);
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = `<img src="img/ant-design_close-circle-twotone.svg" alt="">`;
		// Append the link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);

		// Store in LS
		storeTaskInLocalStorage(taskInput.value, timeInput.value);

		// Clear input
		taskInput.value = '';
		timeInput.value = '';
	}
	e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task, time) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	let duu = time / 30;
	duu = duu * 5;
	duu = Math.floor(duu);
	tasks.push({ task, time, time123 });
	time123 = convertko(time123, parseInt(time) + duu);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			console.log(e.target.parentElement.parentElement.firstChild);
			removeTaskFromLocalStorage(
				e.target.parentElement.parentElement.firstChild
			);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	//   console.log(tasks);
	tasks.forEach(function (task, index) {
		console.log(taskItem.textContent + 's');
		//   console.log(task,typeof(task))
		if (taskItem.textContent === task.task) {
			console.log(task);
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// taskList.innerHTML = '';

	// Faster
	if (confirm('This will erase all tasks')) {
		while (taskList.firstChild) {
			taskList.removeChild(taskList.firstChild);
		}

		// https://jsperf.com/innerhtml-vs-removechild

		// Clear from LS
		clearTasksFromLocalStorage();
	}
}

// Clear Tasks from LS

function clearTasksFromLocalStorage() {
	let tasks1 = [];
	localStorage.setItem('tasks', JSON.stringify(tasks1));
}

// Filter Tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}

// Start Tasks
function startTasks(e) {
	if (taskList.childElementCount) {
		let tasks;
		tasks = JSON.parse(localStorage.getItem('tasks'));
		adjust_time(tasks);
		console.log(tasks);
		display_schedule(tasks);
		let j = 0;
		let LALA = window.setInterval(function () {
			let kk = 1;
			let date = new Date();
			let curr_time = date.getHours() + ':' + date.getMinutes();
			let st_time = tasks[j].time123;
			console.log(st_time);
			console.log(curr_time);
			if (st_time === curr_time) {
				if (kk) {
					let duu = tasks[j].time;

					let tuu = 5;
					duu = 30;
					let str = `So, what you are waiting for? Your task is to complete what you assigned to yourself ${tasks[j].task}. You have ${tasks[j].time} minutes to complete it
					)}. I will remind you every ${duu} minutes to have a break of 5 minutes and every ${tuu} minutes, I would give you a powerful quote. `;
					speak_out(str);

					kk = 0;

					check_for_single(tasks, j);
					j++;
					if (j == tasks.length) {
						clearInterval(LALA);
					}
				}
			}
		}, 3000);
	} else {
		alert('There should be atleast one task.');
	}
	e.preventDefault();
}

function speak_out(str) {
	var synth = window.speechSynthesis;
	var inputTxt = str;
	var pitchValue = 1;
	var rateValue = 1;
	var utterThis = new SpeechSynthesisUtterance(inputTxt);
	utterThis.pitch = pitchValue;
	utterThis.rate = rateValue;
	synth.speak(utterThis);
}
// For Quotes
function check_for_single(tasks, j) {
	let duu = 5;
	let tl = tasks[j].time;
	var chale_chalo = window.setInterval(() => {
		let rand = Math.floor(Math.random() * 1600);
		let str = `${quotes[rand].text}`;
		str += ` 
		You got ${tl} minutes left bro. Come on let's try to do it faster`;
		speak_out(str);
		console.log(tl);
		console.log(duu);
		tl -= duu;
		if (tl <= 0) {
			let str = `Time is up.`;
			// make_messages(str);
			clearInterval(chale_chalo);
		}
	}, duu * 60 * 1000);
	// let end_time=
}

// for quotes

let quotes = [];
fetch('https://type.fit/api/quotes')
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		quotes = data;

		console.log(data);
	});

function convertko(hours, duu) {
	let hour = '';
	let min = '';
	for (let i = 0; i < hours.length; i++) {
		if (hours[i] === ':') {
			hour = hours.slice(0, i);
			min = hours.slice(i + 1, hours.length);
			break;
		}
	}
	console.log(hour, min);
	let hr = parseInt(hour);
	let mn = parseInt(min);
	console.log(duu);
	hr += Math.floor(duu / 60);
	mn += duu % 60;
	if (mn > 60) {
		mn -= 60;
		hr++;
	}
	let fr = hr.toString();
	let fp = mn.toString();
	return fr + ':' + fp;
}
function display_schedule(tasks) {
	loader.classList.remove('hidden');
	setTimeout(() => {
		loader.classList.add('disapper');
		schedule_display.classList.remove('hidden');
		add_tasks_schedule.classList.add('disapper');
		add_tasks_schedule.remove();
		for (let i = 0; i < tasks.length; i++) {
			let title = tasks[i].task;
			let st_time = tasks[i].time123;
			let duu = tasks[i].time / 30;
			duu = duu * 5;
			duu = Math.floor(duu);
			let end_time = convertko(st_time, parseInt(tasks[i].time) + duu);

			let tr = document.createElement('tr');
			let td1 = document.createElement('td');
			let td2 = document.createElement('td');
			let td3 = document.createElement('td');
			td1.innerHTML = title;
			td2.innerHTML = st_time;
			td3.innerHTML = end_time;
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			schedule_table.appendChild(tr);
			console.log(title, st_time, end_time);
		}
	}, 1500);
}
function adjust_time(tasks) {
	let date = new Date();
	let cur_time = date.getHours() + ':' + date.getMinutes();
	tasks[0].time123 = cur_time;
	for (let i = 1; i < tasks.length; i++) {
		let duu = tasks[i].time / 30;
		duu = duu * 5;
		duu = Math.floor(duu);
		tasks[i].time123 = convertko(
			tasks[i - 1].time123,
			parseInt(tasks[i].time) + duu
		);
	}
}
