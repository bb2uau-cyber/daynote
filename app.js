/* ==========================
Daynote V3.3
Korean Digital Journal UI
========================== */


:root{


--bg:#EDF8F4;

--card:rgba(255,255,255,.85);

--primary:#A8D8C8;

--success:#9CCDB5;

--text:#494643;

--sub:#9B9590;

--line:#EEE8E2;


}




*{

box-sizing:border-box;

}



body{


margin:0;


min-height:100vh;


background:var(--bg);


color:var(--text);


font-family:

"PingFang SC",
"Microsoft YaHei",
sans-serif;



transition:.4s;


}




.app{


max-width:900px;


margin:auto;


padding:

35px 22px 80px;


}








/* 顶部 */


.top{


display:flex;


justify-content:space-between;


align-items:center;


margin-bottom:25px;


}



.top h1{


font-size:32px;


margin:0;


font-weight:600;


}



.top p{


color:var(--sub);


}



.mood{


background:var(--card);


padding:

12px 20px;


border-radius:30px;


box-shadow:

0 10px 30px rgba(0,0,0,.05);


}










/* 卡片 */


.card{


background:var(--card);


backdrop-filter:blur(20px);


border-radius:30px;


padding:25px;


margin-bottom:18px;


box-shadow:

0 15px 40px rgba(0,0,0,.05);


border:

1px solid rgba(255,255,255,.5);


}





h2{


font-size:18px;


margin:0;


}








.section-header{


display:flex;


justify-content:space-between;


align-items:center;


margin-bottom:15px;


}







button{


border:none;


cursor:pointer;


font-family:inherit;


}








.section-header button{


background:var(--primary);


color:white;


padding:

10px 18px;


border-radius:25px;


font-size:14px;


transition:.3s;


}



.section-header button:hover{


transform:translateY(-2px);


}









/* 完成度 */


.progress-info{


display:flex;


justify-content:space-between;


color:var(--sub);


}



.progress-bar{


height:12px;


background:#eee;


border-radius:20px;


overflow:hidden;


margin-top:12px;


}



#progressInner{


height:100%;


width:0;


background:

linear-gradient(

90deg,

var(--primary),

var(--success)

);


transition:.5s;


}









/* 任务 */


.task-item{


padding:

16px 0;


border-bottom:

1px solid var(--line);


display:flex;


justify-content:space-between;


align-items:flex-start;


}



.task-main{


display:flex;


gap:14px;


flex:1;


}



.task-content{


cursor:pointer;


}



.checkbox{


width:22px;


height:22px;


border-radius:50%;


border:

2px solid var(--primary);


flex:none;


cursor:pointer;


}



.checkbox.done{


background:var(--success);


border-color:var(--success);


}



.task-title{


font-size:15px;


}



.task-done{


text-decoration:line-through;


color:#aaa;


}



.task-meta{


font-size:12px;


color:var(--sub);


line-height:1.8;


margin-top:8px;


}



.task-detail{


display:none;


margin-top:12px;


padding:15px;


background:

rgba(255,255,255,.55);


border-radius:18px;


font-size:13px;


line-height:1.8;


}



.task-detail.show{


display:block;


}









.delete-task,

.delete-routine,

.delete-focus,

.delete-idea,


.remove-category{


background:none;


color:#aaa;


font-size:13px;


padding:5px;


}









/* 备注 */


.note{


background:

rgba(255,255,255,.65);


padding:14px;


border-radius:18px;


margin-top:10px;


font-size:14px;


line-height:1.6;


}









/* 统计 */


.statistics{


display:flex;


justify-content:space-around;


text-align:center;


}



.statistics p{


color:var(--sub);


font-size:13px;


}



.statistics strong{


font-size:26px;


}









/* 分类 */


.category-tag{


display:inline-flex;


align-items:center;


background:

rgba(255,255,255,.7);


padding:

8px 14px;


border-radius:20px;


margin:

5px;


gap:5px;


}









/* 主题 */


.theme-grid{


display:grid;


grid-template-columns:

repeat(3,1fr);


gap:12px;


}



.theme-grid button{


background:

rgba(255,255,255,.75);


padding:

14px 8px;


border-radius:22px;


color:var(--text);


transition:.3s;


}



.theme-grid button:hover{


transform:translateY(-3px);


}









/* 弹窗 */


.modal{


position:fixed;


inset:0;


background:

rgba(0,0,0,.25);


display:flex;


align-items:center;


justify-content:center;


z-index:999;


}



.hidden{


display:none;


}




.modal-box{


width:90%;


max-width:420px;


background:white;


border-radius:32px;


padding:30px;


animation:

popup .25s;


}



.modal-box h2{


margin-bottom:20px;


}




.modal-box input,

.modal-box textarea,

.modal-box select{


width:100%;


padding:14px;


border:none;


outline:none;


background:#F8F5F1;


border-radius:18px;


margin-bottom:12px;


font-size:14px;


}




.modal-box textarea{


height:110px;


resize:none;


}




.time-row{


display:flex;


gap:10px;


}



.time-row input{


flex:1;


}



.modal-buttons{


display:flex;


gap:12px;


margin-top:15px;


}



.modal-buttons button{


flex:1;


padding:14px;


border-radius:22px;


background:#eee;


}



.modal-buttons button:last-child{


background:var(--primary);


color:white;


}






@keyframes popup{


from{


opacity:0;


transform:scale(.9);


}


to{


opacity:1;


transform:scale(1);


}


}









/* ==========================
主题
========================== */



body.mint{

--bg:#EDF8F4;

--primary:#A8D8C8;

}


body.sakura{

--bg:#FFF4F6;

--primary:#EAB6C7;

}



body.lavender{

--bg:#F6F1FA;

--primary:#C6B5E5;

}



body.blue{

--bg:#F1F7FC;

--primary:#A8CDE8;

}



body.vanilla{

--bg:#FCF7EF;

--primary:#E8D2AE;

}



body.aqua{

--bg:#EFFAF8;

--primary:#B5E2DC;

}



body.peach{

--bg:#FFF5F0;

--primary:#F3B8A6;

}



body.moon{

--bg:#F3F0F8;

--primary:#B7A8D0;

}



body.ice{

--bg:#F3FAFC;

--primary:#B7DDE8;

}



body.lilac{

--bg:#FAF2FA;

--primary:#D2B7D9;

}



body.pearl{

--bg:#F7F7F3;

--primary:#D8D5CE;

}



body.teddy{

--bg:#F8F0E7;

--primary:#D8BFA8;

}









@media(max-width:600px){


.app{


padding:

20px 15px;


}



.top h1{


font-size:26px;


}



.theme-grid{


grid-template-columns:

repeat(2,1fr);


}



.card{


padding:20px;


}



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



categories.forEach(item=>{


select.innerHTML +=

`
<option>

${item.icon} ${item.name}

</option>

`;

});


}



let box =
document.getElementById("categoryList");


if(!box)
return;



box.innerHTML="";



categories.forEach((item,index)=>{


box.innerHTML +=


`

<div class="category-tag">

${item.icon}

${item.name}


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



routines.forEach((item,index)=>{


box.innerHTML +=


`

<div class="task-item">


<div class="task-main">


<div class="checkbox ${item.done?"done":""}"
data-index="${index}">

</div>


<div>

${item.name}

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
.querySelectorAll("#routineList .checkbox")
.forEach(btn=>{


btn.onclick=()=>{


let index =
btn.dataset.index;



routines[index].done =
!routines[index].done;



saveData();


renderRoutines();


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

<div class="note">


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



ideas.forEach((item,index)=>{


box.innerHTML +=


`

<div class="note">


💡 ${item.text}


<br>


<small>

${item.time}

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
item=>item.done
)
.length;



let total =
tasks.length;



let percent =

total ?

Math.round(
done / total *100
)

:

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





let today =
document
.getElementById("todayDone");



if(today)

today.innerText =
done;



let number =
document
.getElementById("taskNumber");



if(number)

number.innerText =
total;



let all =
document
.getElementById("allDone");



if(all)

all.innerText =

localStorage.getItem("allDone")
||

done;


}









/* ==========================
 主题
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
 保存
========================== */


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
