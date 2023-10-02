const simpleSto =document.querySelector(".simple-storage input")
const textSto=document.getElementById("texts")
let tasks,deleteT,editT;
let updateNote="";
let count;


window.onload=() =>{
    update="";
    count=Object.keys(localStorage).length
    displayText();
}
const displayText =()=>{

if (Object.keys(localStorage).length>0){
  textSto.style.display="inline-block"
}
else{
    textSto.style.display="none" 
}

textSto.innerHTML="";
let tasks=Object.keys(localStorage)
tasks =tasks.sort();
for( let key of tasks ){
    let  classvalue ="";


let value=localStorage.getItem(key)
let  taskInnerDiv=document.createElement("div")
 taskInnerDiv.classList.add("task")
 taskInnerDiv.setAttribute("id",key)
 taskInnerDiv.innerHTML=`<span id="taskname">${key.split("_")[1]} </span> `;

let editButton=document.createElement("button")

editButton.classList.add("edit")
editButton.innerHTML=`<i class="fa-regular fa-pen-to-square"></i>`
if (!JSON.parse(value)){
    editButton.style.visibility="visable"   
}
else{
    editButton.style.visibility="hidden"  
    taskInnerDiv.classList.add("completed")


}
taskInnerDiv.appendChild(editButton)
taskInnerDiv.innerHTML+=`<button class="delete"><i class="fa-solid fa-trash"></i></button`
textSto.appendChild(taskInnerDiv)
}

tasks=document.querySelectorAll(".task")
tasks.forEach((element,index)=>{
    element.onclick=()=>{
        if(element.classList.contains("completed")){
            updateStorage(element.id.split("_")[0],
            element.innerText,false)
        }
        else{
            updateStorage(element.id.split("_")[0],
            element.innerText,true)

        }
    };
});

editT=document.getElementsByClassName("edit");
Array.from(editT).forEach((element,index)=>{
    element.addEventListener("click",(e)=>{
        e.stopPropagation();
        disableButton(true)
        let parent=element.parentElement;
        simpleSto.value=parent.querySelector("#taskname").innerText
        updateNote=parent.id;
        parent.remove();
    })
}
)

deleteT=document.getElementsByClassName("delete")
Array.from(deleteT).forEach((element,index)=>{
    element.addEventListener("click",(e)=>{
        e.stopPropagation()
        let parent=element.parentElement
        removetask(parent.id);
        parent.remove()
        count-=1;

    })
})


};
const disableButton=(bool)=>{
    let editButton =document.getElementsByClassName("edit")
    Array.from(editButton).forEach((element)=>{
        element.disabled=bool;
    })
}



const removetask=(taskvalue)=>{
    localStorage.removeItem(taskvalue);
    displayText();
}
const updateStorage=(index,taskvalue,completed)=>{
  localStorage.setItem(`${index}_${taskvalue}`,completed)  
  displayText();
}
document.querySelector("#add").addEventListener
("click",()=>{
    disableButton(false);
    if(simpleSto.value.length== 0){
        alert("please Enter A Text");

    }
    else{

    if(updateNote==""){
        updateStorage(count,simpleSto.value,false);
    }
    else{
        let exitingcount=updateNote.split("_")[0]
        removetask(updateNote)
        updateStorage(exitingcount,simpleSto.value,false)
        updateNote="";
    }
   count += 1;
   simpleSto.value="";

    }
})





