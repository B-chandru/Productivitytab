
window.onload =()=>{

    function TIME (){
        var time=document.getElementById("t");
        time.innerHTML=`${new Date().toLocaleTimeString()}`;
        }
        setInterval(TIME,1000)
        
        var time=document.getElementById("d")
        time.innerHTML=`${new Date().toLocaleDateString()}`;
        
        document.querySelector(".fa-redo-alt").addEventListener("click",()=>{
            location.reload()})
        
            document.querySelector(".fa-window-maximize").addEventListener("click",()=>{
                window.open()})
        
                document.querySelector(".fa-window-restore").addEventListener("click",()=>{
                    resizeWindow()
                    console.log("clicked")
        
                })
                    function resizeWindow(){ 
                   window.open(" ", "", "width=300, height=200")
                    }
        
        var body = document.querySelector("body")
            const Toggle = document.querySelector(".toggle");

                    
            Toggle.onclick = function (){
                body.classList.toggle("light");
            }

            //   form submit 
            const form = document.querySelector("#todo_form");

            form.addEventListener("submit", e => {
              e.preventDefault();
            
              let task = document.querySelector("#todo_input").value;
            
              if (!task.length) {
                alert("Please add a task to add");
              } else {
                const obj = {
                  task: task,
                  complete: false,
                  date:new Date().toLocaleDateString(),
                  id: Date.now(),
                };
            
                chrome.storage.sync.get("tasks", function (result) {
                  if (result.tasks) {
                    chrome.storage.sync.set({ tasks: [...result.tasks, obj] },()=>{
                        location.reload();
                    });   
                    }
                });
              }
            });
            
            
            
            //check if the list exists
            
            chrome.storage.sync.get("tasks", function (result) {
                if (result.tasks) {
                  result.tasks.map((task) => {
                  console.log(task)
                    addTask(task)
                  });
                } else {
                  chrome.storage.sync.set({ tasks: [] });
                }
              });
              
            
  
            addTask= (task) => {
                const ul = document.querySelector("ul");
                const btn_del = document.createElement("button");
                const li = document.createElement("li");
              
                li.innerHTML = `${task.task}<span style="font-size: 10px; padding: 10px;">(${task.date})</span>`;
                task.complete ? li.classList.add("complete") : "";
                li.dataset.id = task.id;
                btn_del.setAttribute("id", "remove");
                btn_del.innerHTML = `<i class="fas fa-trash" ></i>`;
                li.append(btn_del);
                li.addEventListener("click", () => updateComplete(li), "false");
                btn_del.addEventListener("click", () => removeItem(li));
                ul.append(li);
            }

            // for deleting the element from the list
            const removeItem = (e) => {
                e.parentNode.removeChild(e);
               
                const dataId = e.dataset.id;
               
                chrome.storage.sync.get({ tasks: [] }, function (items) {
                  const updatedList = items.tasks.filter((item) => item.id != dataId);
                  chrome.storage.sync.set({ tasks: updatedList });
                });
               };
            
               const updateComplete = (e) => {
                if (e.tagName === "LI") {
                    e.classList.toggle("complete");
                  const dataId = e.dataset.id;
               
                  chrome.storage.sync.get("tasks", function (items) {
                    let updatedList = items.tasks.map((item) => {
                      if (item.id === dataId) {
                        item["complete"] = !item["complete"];
                      }
                      return item;
                    });
               
                    chrome.storage.sync.set({ tasks: updatedList });
                  });
                }
            };
          //  to get the advice from the advice api
            fetch("https://api.adviceslip.com/advice")
            .then(res=>res.json())
            .then(data=>{
                const info_tab =document.querySelector(".info_tab")
                const blockquote = document.createElement("blockquote");
                if(data){
                    console.log(data);
                  blockquote.innerText = data.slip.advice;
                  info_tab.append(blockquote);
                }

            })
        }
  



















        //     chrome.storage.sync.get("todo", (data) => {
        //         if(data.todo){
        //         data.todo.map((data)=>{
        //     const ul = document.querySelector("ul");
        //     const li = document.createElement("li");
        //     const btn_del = document.createElement("button");
        //     li.dataset.id = data.id;
        //     li.innerHTML=` <input type="checkbox" >${data.todo} <span style="font-size: 10px; padding: 10px;">(${data.date})</span> `
        //      btn_del.innerHTML = `<i class="fas fa-trash" ></i>`
        //     btn_del.setAttribute("id",`${data.id}`)
        //     btn_del.addEventListener("click", () => removeItem(li));
        //     li.append(btn_del);
        //     ul.append(li);
        //    console.log(data.todo);
        //         })
        //     }
        // })

    