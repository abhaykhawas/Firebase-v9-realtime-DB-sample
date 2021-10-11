import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB-6hogpdJCD9b2Z9_NemS3fa5Tq70OXmM",
    authDomain: "test2-6cbba.firebaseapp.com",
    databaseURL: "https://test2-6cbba-default-rtdb.firebaseio.com",
    projectId: "test2-6cbba",
    storageBucket: "test2-6cbba.appspot.com",
    messagingSenderId: "936477334038",
    appId: "1:936477334038:web:a916366c5826df99547337"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {getDatabase, ref, set, child, update, remove, onValue} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-database.js";


  const db = getDatabase(app);

  var btn = document.getElementById('btn')
  var inputbox = document.getElementById('inputbox')
  var mob = document.getElementById('mob')
  var li = document.querySelector('li')

  btn.addEventListener("click", callbackfunc)

  function callbackfunc(){


    set(ref(db, "Todos/"+mob.value),{
        todo: inputbox.value
    }).then(()=>{
        
        const c = ref(db, "Todos")
        onValue(c, (snapshot) => {
            let j = 0;
            const data = snapshot.val();
            console.log(data)
            for(let i in data-1){
                console.log("this: ",mob.value)
                if(i === mob.value){
                j = 1
            }
            }
            console.log(j)
            if(j==0){  
                console.log("I am in")
                // var ul = document.querySelector('ul');
                // var li = document.createElement("li");
                // li.appendChild(document.createTextNode(inputbox.value));
                // ul.appendChild(li);
               }
               else{
                   console.log("I am out")
               }  
          });

    }).catch(()=>{
        console.log("Sometghing went wrong")
    })
  }

    window.addEventListener('load', (event) => {
        const c = ref(db, "Todos/")
        onValue(c, (snapshot) => {
            const data = snapshot.val();
            var ul = document.querySelector('ul');
            ul.innerHTML = ''
            for(var i = 0; i<Object.values(data).length; i++){
                // console.log(Object.values(Object.keys(data)[i].toString().split(',')));
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(Object.values(Object.values(data)[i])));
                ul.appendChild(li);
            }   
          });  

          onValue(c, (snapshot)=>{
            const data = snapshot.val();
            var lis = document.querySelectorAll("li")
            var ul = document.querySelector("ul")
            var tab = []
            // console.log(lis)
            // for(var i = 0; i<Object.values(data).length; i++){
            //    // console.log(Object.values(Object.keys(data)[i].toString().split(',')));
            //     lis[i].addEventListener("click",console.log(i))
            // }
            for(var i = 0; i < lis.length; i++){
                tab.push(lis[i].innerHTML);
              }
              console.log(tab)

            ul.addEventListener("click",function(e) {
                if (e.target && e.target.matches("li")) {
                    var index = tab.indexOf(e.target.innerHTML);
                  console.log(index); // new class name here
                }
                var d = "Todos/"+Object.values(Object.keys(data)[index].toString().split(','))
                console.log(d)  
                remove(ref(db,d)).then(()=>{ alert("Successfully removed")})
              });
        })  
    });


