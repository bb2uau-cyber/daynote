/* =========================
 Daynote V4.2
 App Logic
========================= */



// =====================
// 数据
// =====================


let tasks =
JSON.parse(
localStorage.getItem("tasks")
)
||
[];



let focus =
JSON.parse(
localStorage.getItem("focus")
)
||
[];



let ideas =
JSON.parse(
localStorage.getItem("ideas")
)
||
[];



let diary =
localStorage.getItem("diary")
||
"";



let projects =
JSON.parse(
localStorage.getItem("projects")
)
||
[];





let week =
localStorage.getItem("week")
||
"";







// =====================
// 初始化
// =====================


window.onload=function(){


showGreeting();


renderTasks();


renderFocus();


renderIdeas();


renderDiary();


renderProjects();


renderWeek();


loadTheme();


};









// =====================
// 时间
// =====================


function showGreeting(){


let hour =
new Date()
.getHours();



let title =
document
.getElementById("greeting");



let sub =
document
.getElementById("subtitle");



if(hour>=5 && hour<12){


title.innerHTML="☀️ Good Morning";


sub.innerHTML="今天也慢慢开始吧";


}

else if(hour>=12 && hour<18){


title.innerHTML="🌤 Good Afternoon";


sub.innerHTML="保持一点专注";


}

else{


title.innerHTML="🌙 Good Evening";


sub.innerHTML="今天辛苦啦";


}



document
.getElementById("date")
.innerHTML=


new Date()
.toLocaleDateString(
"zh-CN",
{

year:"numeric",

month:"long",

day:"numeric",

weekday:"long"

}

);


}









// =====================
// 心情
// =====================


function setMood(value){


document
.getElementById("moodText")
.innerHTML=

"今天："+value;



localStorage.setItem(
"mood",
value
);


}









// =====================
// 弹窗
// =====================


function openModal(id){


document
.getElementById(id)
.classList
.remove("hidden");


}



function closeModal(id){


document
.getElementById(id)
.classList
.add("hidden");


}



function openFocus(){

openModal(
"focusModal"
);

}



function openTask(){

openModal(
"taskModal"
);

}



function openIdea(){

openModal(
"ideaModal"
);

}



function openDiary(){

openModal(
"diaryModal"
);

}



function openProject(){

openModal(
"projectModal"
);

}



function openWeek(){

openModal(
"weekModal"
);

}









// =====================
// 今日重点
// =====================


function saveFocus(){


let value =
document
.getElementById("focusInput")
.value
.trim();



if(!value)
return;



focus.push(value);



localStorage.setItem(
"focus",
JSON.stringify(focus)
);



renderFocus();



closeModal(
"focusModal"
);


}




function renderFocus(){


let box =
document
.getElementById("focusList");



box.innerHTML="";



focus.forEach(
(item,index)=>{


box.innerHTML +=


`

<div class="focus-item">


⭐ ${item}


<button onclick="deleteFocus(${index})">

×

</button>


</div>


`;


});


}





function deleteFocus(index){


focus.splice(
index,
1
);


localStorage.setItem(
"focus",
JSON.stringify(focus)
);



renderFocus();


}









// =====================
// Todo
// =====================


function saveTask(){


let name =
document
.getElementById("taskInput")
.value
.trim();



let note =
document
.getElementById("taskNote")
.value;



if(!name)
return;



tasks.push({

name:name,

note:note,

done:false

});



saveTasks();



renderTasks();



closeModal(
"taskModal"
);


}







function renderTasks(){


let box =
document
.getElementById("taskList");



box.innerHTML="";



tasks.forEach(
(task,index)=>{


box.innerHTML +=


`

<div class="task-item">


<span onclick="finishTask(${index})"

class="${task.done?"complete":""}">


${task.done?"✓":"□"}

${task.name}


</span>



<button onclick="deleteTask(${index})">

删除

</button>


</div>

`;



});


}







function finishTask(index){


tasks[index].done =
!tasks[index].done;



saveTasks();


renderTasks();


}





function deleteTask(index){


tasks.splice(
index,
1
);


saveTasks();


renderTasks();


}





function saveTasks(){


localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);


}









// =====================
// 灵感
// =====================


function saveIdea(){


let value =
document
.getElementById("ideaInput")
.value
.trim();



if(!value)
return;



ideas.push(value);



localStorage.setItem(

"ideas",

JSON.stringify(ideas)

);



renderIdeas();



closeModal(
"ideaModal"
);


}




function renderIdeas(){


let box =
document
.getElementById("ideaList");



box.innerHTML="";



ideas.forEach(
item=>{


box.innerHTML +=


`

<div class="idea-item">

💡 ${item}

</div>

`;



});


}









// =====================
// 今日记录
// =====================


function saveDiary(){


diary =
document
.getElementById("diaryInput")
.value;



localStorage.setItem(
"diary",
diary
);



renderDiary();



closeModal(
"diaryModal"
);



}





function renderDiary(){


let box =
document
.getElementById("diaryList");



if(diary){


box.innerHTML =


`

<div class="idea-item">

📖 ${diary}

</div>

`;


}


}









// =====================
// 项目看板
// =====================


function saveProject(){


let name =
document
.getElementById("projectName")
.value
.trim();



let status =
document
.getElementById("projectStatus")
.value;



if(!name)
return;



projects.push({

name:name,

status:status

});



localStorage.setItem(

"projects",

JSON.stringify(projects)

);



renderProjects();



closeModal(
"projectModal"
);


}




function renderProjects(){


let ideaBox =
document
.getElementById("ideaBoard");


let doingBox =
document
.getElementById("doingBoard");


let doneBox =
document
.getElementById("doneBoard");



if(!ideaBox)
return;



ideaBox.innerHTML="";

doingBox.innerHTML="";

doneBox.innerHTML="";




projects.forEach(
item=>{


let html=

`

<div class="project-card">

${item.name}

</div>

`;



if(item.status==="idea")

ideaBox.innerHTML+=html;



if(item.status==="doing")

doingBox.innerHTML+=html;



if(item.status==="done")

doneBox.innerHTML+=html;



});


}









// =====================
// 周计划
// =====================


function saveWeek(){


week =
document
.getElementById("weekInput")
.value;



localStorage.setItem(
"week",
week
);



renderWeek();



closeModal(
"weekModal"
);


}




function renderWeek(){


let box =
document
.querySelector(".week-grid");



if(week && box){


box.innerHTML +=


`

<div class="idea-item">

${week}

</div>

`;

}


}









// =====================
// 主题
// =====================


function changeTheme(theme){


document.body.className=
theme;



localStorage.setItem(
"theme",
theme
);


}




function loadTheme(){


let theme =
localStorage.getItem(
"theme"
);



if(theme)

document.body.className=
theme;


}
