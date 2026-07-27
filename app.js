/* ==========================
Daynote V4
Life Planner
========================== */


// ==========================
// 数据
// ==========================


let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];



let focus =
JSON.parse(
localStorage.getItem("focus")
) || [];



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



let diary =
JSON.parse(
localStorage.getItem("diary")
) || {};



let moods =
JSON.parse(
localStorage.getItem("moods")
) || {};



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
}

];



let currentDate =
new Date();



let currentMonth =
currentDate.getMonth();



let currentYear =
currentDate.getFullYear();







// ==========================
// 初始化
// ==========================


document.addEventListener(
"DOMContentLoaded",
()=>{


showGreeting();


renderCalendar();


renderTasks();


renderFocus();


renderRoutines();


renderIdeas();


renderDiary();


renderCategories();


updateStatistics();


loadTheme();


bindEvents();


});









// ==========================
// 时间问候
// ==========================


function showGreeting(){


let hour =
new Date()
.getHours();



let title =
"";


let text =
"";


let icon =
"";



if(hour>=5 && hour<12){


title="Good Morning";

text="今天也慢慢开始吧";

icon="☀️";


}


else if(hour>=12 && hour<18){


title="Good Afternoon";

text="保持一点专注";

icon="🌤";


}


else if(hour>=18 && hour<=23){


title="Good Evening";

text="今天辛苦啦";

icon="🌙";


}


else{


title="Late Night";

text="写下此刻的小心事";

icon="🌌";


}





document
.getElementById("greeting")
.innerText =
title;



document
.getElementById("greetingText")
.innerText =
text;



document
.getElementById("greetingIcon")
.innerText =
icon;



document
.getElementById("todayDate")
.innerText =


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









// ==========================
// 事件
// ==========================


function bindEvents(){



//任务


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







//重点


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







//习惯


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







//灵感


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







//日记


document
.getElementById("addDiaryBtn")
.onclick =
()=>openModal("diaryModal");



document
.getElementById("saveDiary")
.onclick =
saveDiary;



document
.getElementById("closeDiary")
.onclick =
()=>closeModal("diaryModal");








//主题


document
.querySelectorAll(".theme-grid button")
.forEach(btn=>{


btn.onclick=()=>{


changeTheme(
btn.dataset.theme
);


};


});







//月份


document
.getElementById("prevMonth")
.onclick=()=>{


currentMonth--;


if(currentMonth<0){

currentMonth=11;

currentYear--;

}


renderCalendar();


};



document
.getElementById("nextMonth")
.onclick=()=>{


currentMonth++;


if(currentMonth>11){

currentMonth=0;

currentYear++;

}


renderCalendar();


};


}









// ==========================
// 日历
// ==========================


function renderCalendar(){


let grid =
document
.getElementById("calendarGrid");



grid.innerHTML="";



let title =
document
.getElementById("calendarTitle");



title.innerText =


`${currentYear}年 ${currentMonth+1}月`;



let firstDay =
new Date(
currentYear,
currentMonth,
1
)
.getDay();



let days =
new Date(
currentYear,
currentMonth+1,
0
)
.getDate();



for(let i=0;i<firstDay;i++){


grid.innerHTML +=
`
<div></div>
`;


}





for(let d=1;d<=days;d++){



let key =

`${currentYear}-${currentMonth+1}-${d}`;



let hasData =

diary[key] ||
moods[key] ||
tasks.some(
t=>t.date===key
);



grid.innerHTML +=


`

<div class="calendar-day"
data-date="${key}">


${d}



${hasData?

`<span class="dot">🌱</span>`

:""}



</div>


`;



}




document
.querySelectorAll(".calendar-day")
.forEach(day=>{


day.onclick=()=>{


showHistory(
day.dataset.date
);


};


});


}
/* ==========================
历史日期查看
========================== */


function showHistory(date){


let box =
document
.getElementById("historyContent");



let title =
document
.getElementById("historyTitle");



title.innerText =
date;



let dayTasks =
tasks.filter(
task=>task.date===date
);



box.innerHTML =


`

<h3>
⭐ 今日重点
</h3>

<p>

${focus.length?

focus.join("<br>")

:

"暂无记录"}

</p>


<h3>
☁ 完成任务
</h3>

<p>

${dayTasks.length?

dayTasks.map(
t=>"✓ "+t.name
)
.join("<br>")

:

"暂无任务"}

</p>



<h3>
🌱 心情
</h3>


<p>

${moods[date] || "暂无记录"}

</p>



<h3>
📖 今日记录
</h3>


<p>

${diary[date] || "暂无记录"}

</p>

`;



openModal(
"historyModal"
);


}





document
.getElementById("closeHistory")
.onclick =
()=>closeModal("historyModal");









/* ==========================
今日心情
========================== */


document
.querySelectorAll(".mood-list button")
.forEach(btn=>{


btn.onclick=()=>{


let today =
getTodayKey();



moods[today] =
btn.dataset.mood;



localStorage.setItem(
"moods",
JSON.stringify(moods)
);



document
.getElementById("todayMood")
.innerText =
btn.dataset.mood;



};


});









function getTodayKey(){


let d =
new Date();



return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;


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



focus.forEach(
(item,index)=>{


box.innerHTML +=


`

<div class="note">


⭐ ${item}


<button
class="delete-focus"
data-index="${index}"
>

×

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



date:
getTodayKey(),



done:false,


finished:""

};



tasks.unshift(task);



saveData();



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



tasks.forEach(task=>{


box.innerHTML +=


`

<div class="task-item">


<div class="task-main">


<div class="checkbox ${task.done?"done":""}"
data-id="${task.id}">

</div>


<div>


<div class="task-title ${task.done?"task-done":""}">

${task.name}

</div>



<div class="task-meta">

${task.category}

<br>

${task.project || ""}


</div>



<div class="task-detail">


创建：

${task.created}

<br>

完成：

${task.finished || "--"}

<br>

📝

${task.note || "无"}

</div>


</div>


</div>



<button class="delete-task"
data-id="${task.id}">

删除

</button>


</div>

`;



});






document
.querySelectorAll(".checkbox")
.forEach(btn=>{


btn.onclick=()=>{


let task =
tasks.find(
t=>t.id==btn.dataset.id
);



task.done =
!task.done;



task.finished =

task.done?

new Date()
.toLocaleString()

:

"";



saveData();


renderTasks();


};


});





document
.querySelectorAll(".delete-task")
.forEach(btn=>{


btn.onclick=()=>{


tasks =
tasks.filter(
t=>t.id!=btn.dataset.id
);



saveData();


renderTasks();


};


});


}









/* ==========================
每日习惯
========================== */


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


}





function renderRoutines(){


let box =
document
.getElementById("routineList");



box.innerHTML="";



routines.forEach(
(item,index)=>{


box.innerHTML +=


`

<div class="task-item">


<div>

${item.done?"✓":"○"}

${item.name}

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









/* ==========================
灵感
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


}







function renderIdeas(){


let box =
document
.getElementById("ideaList");



box.innerHTML="";



ideas.forEach(item=>{


box.innerHTML +=


`

<div class="note">

💡 ${item.text}

<br>

<small>

${item.time}

</small>

</div>

`;



});


}









/* ==========================
今日记录
========================== */


function saveDiary(){


let text =
document
.getElementById("diaryText")
.value
.trim();



if(!text)
return;



let today =
getTodayKey();



diary[today]=text;



saveData();



renderDiary();



closeModal(
"diaryModal"
);



}



function renderDiary(){


let box =
document
.getElementById("diaryList");



if(!box)
return;



let today =
getTodayKey();



box.innerHTML =



diary[today]?

`

<div class="note">

📷

${diary[today]}

</div>

`

:

"";



}

/* ==========================
分类系统
========================== */


function renderCategories(){


let select =
document.getElementById(
"taskCategory"
);



if(select){


select.innerHTML =
`
<option>
选择分类
</option>
`;



categories.forEach(item=>{


select.innerHTML +=


`

<option>

${item.icon}
${item.name}

</option>

`;



});


}



let box =
document.getElementById(
"categoryList"
);



if(!box)
return;



box.innerHTML="";



categories.forEach(
(item,index)=>{


box.innerHTML +=


`

<div class="note">


${item.icon}

${item.name}



<button
class="delete-category"
data-index="${index}"
>

×

</button>


</div>

`;


});




document
.querySelectorAll(".delete-category")
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
.getElementById(
"categoryIcon"
)
.value
.trim();



let name =
document
.getElementById(
"categoryName"
)
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



}









/* ==========================
统计
========================== */


function updateStatistics(){


let done =
tasks.filter(
item=>item.done
)
.length;



let total =
tasks.length;



let percent =


total ?

Math.round(
done / total * 100
)

:

0;



let progress =
document
.getElementById(
"progressInner"
);



if(progress)

progress.style.width =
percent+"%";



let text =
document
.getElementById(
"progressText"
);



if(text)

text.innerText =
`${done}/${total}`;



let percentText =
document
.getElementById(
"progressPercent"
);



if(percentText)

percentText.innerText =
percent+"%";



let todayDone =
document
.getElementById(
"todayDone"
);



if(todayDone)

todayDone.innerText =
done;



let taskNumber =
document
.getElementById(
"taskNumber"
);



if(taskNumber)

taskNumber.innerText =
total;



let all =
document
.getElementById(
"allDone"
);



if(all)

all.innerText =
localStorage.getItem(
"allDone"
)
||
done;



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



let nameMap={


mint:
"Mint Diary",


sakura:
"Sakura Letter",


lavender:
"Lavender Night",


blue:
"Cloud Blue",


vanilla:
"Vanilla Cream",


aqua:
"Aqua Glass",


peach:
"Peach Soda",


moon:
"Moon Purple",


ice:
"Ice Blue",


lilac:
"Lilac Pink",


pearl:
"Pearl White",


teddy:
"Teddy Cafe"


};



let title =
document
.getElementById(
"themeName"
);



if(title)

title.innerText =
nameMap[theme];


}







function loadTheme(){


let theme =
localStorage.getItem(
"theme"
);



if(theme)

document.body.className =
theme;


}









/* ==========================
弹窗
========================== */


function openModal(id){


let modal =
document
.getElementById(id);



if(modal)

modal.classList.remove(
"hidden"
);


}






function closeModal(id){


let modal =
document
.getElementById(id);



if(modal)

modal.classList.add(
"hidden"
);


}









/* ==========================
保存数据
========================== */


function saveData(){



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



localStorage.setItem(
"focus",
JSON.stringify(focus)
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
"diary",
JSON.stringify(diary)
);



localStorage.setItem(
"moods",
JSON.stringify(moods)
);



localStorage.setItem(
"categories",
JSON.stringify(categories)
);



}









/* ==========================
End Daynote V4
========================== */
