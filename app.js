/* ==========================
 Daynote V3.2
 Personal Work OS
 Stable Version
========================== */


/* ==========================
 数据
========================== */


let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];



let categories =
JSON.parse(
localStorage.getItem("categories")
) || [

{
icon:"🎨",
name:"视觉设计"
},

{
icon:"📦",
name:"产品开发"
},

{
icon:"💡",
name:"AI灵感"
},

{
icon:"📊",
name:"数据分析"
}

];



let routines =
JSON.parse(
localStorage.getItem("routines")
) || [

{
name:"查看店铺数据",
done:false
},

{
name:"整理今日素材",
done:false
}

];



let ideas =
JSON.parse(
localStorage.getItem("ideas")
) || [];



let focus =
JSON.parse(
localStorage.getItem("focus")
) || [];






/* ==========================
 初始化
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


initDate();


loadTheme();


renderTasks();


renderCategories();


renderRoutines();


renderIdeas();


renderFocus();


updateStatistics();


bindEvents();


});







/* ==========================
 日期
========================== */


function initDate(){


let date =
new Date();


document
.getElementById("todayDate")
.innerText =


date.toLocaleDateString(
"zh-CN",
{

year:"numeric",

month:"long",

day:"numeric",

weekday:"long"

}

);


}









/* ==========================
 事件绑定
========================== */


function bindEvents(){



// 今日待办


document
.getElementById("addTaskBtn")
.onclick =
()=>openModal("taskModal");



document
.getElementById("saveTask")
.onclick =
saveTask;



document
.getElementById("closeTask")
.onclick =
()=>closeModal("taskModal");






// 每日习惯


document
.getElementById("addRoutineBtn")
.onclick =
()=>openModal("routineModal");



document
.getElementById("saveRoutine")
.onclick =
saveRoutine;



document
.getElementById("closeRoutine")
.onclick =
()=>closeModal("routineModal");






// 分类


document
.getElementById("addCategoryBtn")
.onclick =
()=>openModal("categoryModal");



document
.getElementById("saveCategory")
.onclick =
saveCategory;



document
.getElementById("closeCategory")
.onclick =
()=>closeModal("categoryModal");







// 灵感


document
.getElementById("addIdeaBtn")
.onclick =
()=>openModal("ideaModal");



document
.getElementById("saveIdea")
.onclick =
saveIdea;



document
.getElementById("closeIdea")
.onclick =
()=>closeModal("ideaModal");







// 今日重点


document
.getElementById("addFocusBtn")
.onclick =
()=>openModal("focusModal");



document
.getElementById("saveFocus")
.onclick =
saveFocus;



document
.getElementById("closeFocus")
.onclick =
()=>closeModal("focusModal");








// 主题


document
.querySelectorAll(".theme-grid button")
.forEach(button=>{


button.onclick =
()=>{


changeTheme(
button.dataset.theme
);


};


});



}









/* ==========================
 任务系统
========================== */



function saveTask(){



let name =
document
.getElementById("taskName")
.value
.trim();



if(!name)
return;



let task={


id:
Date.now(),



name:name,



project:

document
.getElementById("taskProject")
.value,



category:

document
.getElementById("taskCategory")
.value,



priority:

document
.getElementById("taskPriority")
.value,



start:

document
.getElementById("taskStart")
.value,



end:

document
.getElementById("taskEnd")
.value,



repeat:

document
.getElementById("taskRepeat")
.value,



note:

document
.getElementById("taskNote")
.value,



created:

new Date()
.toLocaleString(),



finished:"",



done:false,



open:false


};





tasks.unshift(task);



saveData();



renderTasks();



closeModal("taskModal");



clearTaskForm();



}









function renderTasks(){


let box =
document
.getElementById("taskList");



box.innerHTML="";



tasks.forEach(task=>{


let item =
document
.createElement("div");



item.className="task-item";



item.innerHTML =


`

<div class="task-main">


<div class="checkbox ${task.done?"done":""}"></div>



<div class="task-content">


<div class="task-title ${task.done?"task-done":""}">

${task.name}

</div>



<div class="task-meta">

${task.category || "未分类"}

<br>

📌 ${task.project || "无项目"}

</div>




<div class="task-detail ${task.open?"show":""}">


创建：

${task.created}



<br>


⏰

${task.start || "--"}

-

${task.end || "--"}



<br>


🔁

${repeatText(task.repeat)}



<br>


${task.finished?

"完成："+task.finished:""
}



<br>



📝

${task.note || "无备注"}



</div>



</div>



</div>



<button class="delete-task">

删除

</button>


`;





item
.querySelector(".checkbox")
.onclick =
()=>toggleTask(task.id);



item
.querySelector(".task-content")
.onclick =
()=>toggleDetail(task.id);



item
.querySelector(".delete-task")
.onclick =
()=>deleteTask(task.id);



box.appendChild(item);



});



updateStatistics();


}








function toggleDetail(id){


let task =
tasks.find(
t=>t.id===id
);



if(task){


task.open =
!task.open;


renderTasks();


}


}






function toggleTask(id){


let task =
tasks.find(
t=>t.id===id
);



if(!task)
return;



task.done =
!task.done;



if(task.done){


task.finished =
new Date()
.toLocaleString();


}

else{


task.finished="";


}



saveData();



renderTasks();


}






function deleteTask(id){


tasks =
tasks.filter(
t=>t.id!==id
);



saveData();


renderTasks();


}






function repeatText(type){


let map={


none:"不循环",

daily:"每天",

workday:"工作日",

weekly:"每周",

monthly:"每月"


};


return map[type] || "";

}








function clearTaskForm(){


[

"taskName",

"taskProject",

"taskStart",

"taskEnd",

"taskNote"

]

.forEach(id=>{


let el =
document.getElementById(id);



if(el)

el.value="";


});


}
/* ==========================
 分类系统
========================== */


function renderCategories(){


let select =
document.getElementById("taskCategory");



if(select){


select.innerHTML =
`
<option>
选择分类
</option>
`;



categories.forEach(c=>{


select.innerHTML +=

`

<option>

${c.icon} ${c.name}

</option>

`;


});


}



let box =
document.getElementById("categoryList");



if(!box)
return;



box.innerHTML="";



categories.forEach((c,index)=>{


box.innerHTML +=


`

<div class="category-tag">


${c.icon}

${c.name}


<button 
class="remove-category"
data-index="${index}"
>

×

</button>


</div>


`;



});





document
.querySelectorAll(".remove-category")
.forEach(btn=>{


btn.onclick=()=>{


categories.splice(
btn.dataset.index,
1
);



saveData();


renderCategories();


};


});


}








function saveCategory(){



let icon =
document
.getElementById("categoryIcon")
.value
.trim();



let name =
document
.getElementById("categoryName")
.value
.trim();



if(!name)
return;



categories.push({

icon:
icon || "📌",

name:name

});



saveData();


renderCategories();


closeModal(
"categoryModal"
);



document
.getElementById("categoryIcon")
.value="";

document
.getElementById("categoryName")
.value="";


}









/* ==========================
 每日习惯
========================== */


function renderRoutines(){


let box =
document
.getElementById("routineList");



if(!box)
return;



box.innerHTML="";



routines.forEach((routine,index)=>{


box.innerHTML +=


`

<div class="task-item">


<div class="task-main">


<div 
class="checkbox ${routine.done?"done":""}"
data-index="${index}"
>

</div>



<div>

${routine.name}

</div>


</div>



<button
class="delete-routine"
data-index="${index}"
>

删除

</button>



</div>

`;



});






document
.querySelectorAll(".checkbox")
.forEach(box=>{


box.onclick=()=>{


let index =
box.dataset.index;



if(index!==undefined){


routines[index].done =
!routines[index].done;



saveData();


renderRoutines();


}


};


});






document
.querySelectorAll(".delete-routine")
.forEach(btn=>{


btn.onclick=()=>{


routines.splice(
btn.dataset.index,
1
);



saveData();


renderRoutines();


};


});


}








function saveRoutine(){



let name =
document
.getElementById("routineName")
.value
.trim();



if(!name)
return;



routines.push({

name:name,

done:false

});



saveData();


renderRoutines();


closeModal(
"routineModal"
);



document
.getElementById("routineName")
.value="";


}









/* ==========================
 今日重点
========================== */


function saveFocus(){


let text =
document
.getElementById("focusText")
.value
.trim();



if(!text)
return;



focus.push(text);



saveData();


renderFocus();


document
.getElementById("focusText")
.value="";



closeModal(
"focusModal"
);


}






function renderFocus(){


let box =
document
.getElementById("focusList");



if(!box)
return;



box.innerHTML="";



focus.forEach((item,index)=>{


box.innerHTML +=


`

<div class="note focus-item">


⭐ ${item}



<button
class="delete-focus"
data-index="${index}"
>

删除

</button>



</div>


`;



});




document
.querySelectorAll(".delete-focus")
.forEach(btn=>{


btn.onclick=()=>{


focus.splice(
btn.dataset.index,
1
);



saveData();


renderFocus();


};


});



}









/* ==========================
 灵感收集
========================== */


function saveIdea(){


let text =
document
.getElementById("ideaText")
.value
.trim();



if(!text)
return;



ideas.unshift({

text:text,

time:
new Date()
.toLocaleString()


});



saveData();


renderIdeas();


closeModal(
"ideaModal"
);



document
.getElementById("ideaText")
.value="";


}







function renderIdeas(){



let box =
document
.getElementById("ideaList");



if(!box)
return;



box.innerHTML="";



ideas.forEach((idea,index)=>{


box.innerHTML +=


`

<div class="note">


💡 ${idea.text}



<br>


<small>

${idea.time}

</small>



<button
class="delete-idea"
data-index="${index}"
>

删除

</button>



</div>


`;



});




document
.querySelectorAll(".delete-idea")
.forEach(btn=>{


btn.onclick=()=>{


ideas.splice(
btn.dataset.index,
1
);



saveData();


renderIdeas();


};


});



}









/* ==========================
 数据统计
========================== */


function updateStatistics(){


let done =

tasks.filter(
task=>task.done
)
.length;



let total =
tasks.length;



let percent =

total?

Math.round(
done / total *100
):

0;



let progressText =
document
.getElementById("progressText");



if(progressText)

progressText.innerText =

`${done} / ${total}`;




let progressPercent =
document
.getElementById("progressPercent");



if(progressPercent)

progressPercent.innerText =

percent+"%";




let progressInner =
document
.getElementById("progressInner");



if(progressInner)

progressInner.style.width =

percent+"%";






document
.getElementById("todayDone")
.innerText =
done;



document
.getElementById("taskNumber")
.innerText =
total;



document
.getElementById("allDone")
.innerText =

localStorage.getItem("allDone")
|| done;



}









/* ==========================
 主题系统
========================== */


function changeTheme(theme){


document.body.className =
theme;



localStorage.setItem(
"theme",
theme
);



let names={


mint:"Mint Cloud",

sakura:"Sakura Milk",

lavender:"Lavender Mist",

blue:"Baby Blue",

vanilla:"Vanilla Cream",

aqua:"Aqua Glass",

peach:"Peach Soda",

moon:"Moon Purple",

ice:"Ice Blue",

lilac:"Lilac Pink",

pearl:"Pearl White",

teddy:"Teddy Beige"


};



let title =
document
.getElementById("themeName");



if(title)

title.innerText =
names[theme];


}







function loadTheme(){


let theme =
localStorage.getItem(
"theme"
);



if(theme){

document.body.className =
theme;


}



}









/* ==========================
 工具
========================== */


function openModal(id){


let modal =
document
.getElementById(id);



if(modal)

modal.classList
.remove("hidden");


}






function closeModal(id){


let modal =
document
.getElementById(id);



if(modal)

modal.classList
.add("hidden");


}






function saveData(){


localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



localStorage.setItem(
"categories",
JSON.stringify(categories)
);



localStorage.setItem(
"routines",
JSON.stringify(routines)
);



localStorage.setItem(
"ideas",
JSON.stringify(ideas)
);



localStorage.setItem(
"focus",
JSON.stringify(focus)
);



}



// ==========================
// End
// ==========================
