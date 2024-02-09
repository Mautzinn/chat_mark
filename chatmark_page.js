const firebaseConfig = {
    apiKey: "AIzaSyDZq1bjw3KhSv4BdLSi2k4HphIxLfBG9pI",
    authDomain: "chatmark-bd.firebaseapp.com",
    databaseURL: "https://chatmark-bd-default-rtdb.firebaseio.com",
    projectId: "chatmark-bd",
    storageBucket: "chatmark-bd.appspot.com",
    messagingSenderId: "378501168147",
    appId: "1:378501168147:web:7ab2f4b6e85f0247f3d3e6"
  };


  //inicializar o Firebase
  firebaseConfig.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function send()
  {
    msg = document.getElementById("msg").value;
    firebaseConfig.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    })

    document.getElementById("msg").value = "";
  }

  function  getData()
  {
    firebase.database().ref("/"+room_name).on('value', function(snapshot){
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot){
        childKey  = childSnapshot.key;
        if(childKey != "purpose"){
          firebase_message_id = childKey;
         message_data = childData;
          //Inicie a programar aqui
            console.log(firebase_message_id);
            console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
            like = message_data['like'];
            name_with_tag = "<h4> "+ name +"<img class='user_tick' src='src='tick.png'></h4>";
            message_with_tag = "<h4 class='message_h4'>" +message + "</h4>"
            like_button +"<button class='btn btn-warning' id="+firebase_message_id+" value="+ like+" onclick='uptadeLike(this.id)'>";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Curtidas: "+ like +"</span></button><hr>";
            row = name_with_tag + message_with_tag +like_button + span_with_tag;
            document.getElementById("output").innerHTML += row;
          //Programe até aqui
        }
      });
    });
  }
  getData();
  function updateLike(message_id)
  {
    console.log("clicou  no botão curtir - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
      like : updated_likes
    });
  }