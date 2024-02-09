//adicione o código do seu banco de dados
const firebaseConfig = {
    apiKey: "AIzaSyDZq1bjw3KhSv4BdLSi2k4HphIxLfBG9pI",
    authDomain: "chatmark-bd.firebaseapp.com",
    databaseURL: "https://chatmark-bd-default-rtdb.firebaseio.com",
    projectId: "chatmark-bd",
    storageBucket: "chatmark-bd.appspot.com",
    messagingSenderId: "378501168147",
    appId: "1:378501168147:web:7ab2f4b6e85f0247f3d3e6"
  };

//// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "bem vindo(a) " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionando nome da sala"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "chatmark_page.html";
}

function getData()
{
  firebase.database().ref("/").on('value' , function(snapshot)
  {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
    {
      childKey  = childSnapshot.key;
      Room_names = childKey;
      //começe a programar
      console.log("nome da sala: " + Room_names);
      row = "<div class='room_name' id="+Room_names+"onclick='redirectToRoomName(this.is)' >#"+Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
      //programe até aqui
    });
  });
}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "chatmark_page.html"
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}