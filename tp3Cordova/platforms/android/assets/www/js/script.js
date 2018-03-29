$(document).ready(function(){

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
     checkConnection();
     deviceInfo();
     window.addEventListener("batterycritical", onBatteryCritical, false);
     window.addEventListener("batterystatus", onBatteryStatus, false);
     var fields = ["displayName", "name", "phoneNumbers"];
     navigator.contacts.find(fields, onSuccess);
  }

  function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
  }

  function createContact(){
    var contact = navigator.contacts.create();
    contact.displayName = "Plumber";
    contact.nickname = "Plumber";
    var name = new ContactName();
    name.givenName = "Jane";
    name.familyName = "Doe";
    contact.name = name;
    contact.save(contactSuccess, contactError);
  }

  function contactSuccess(){
    alert("Contact crée");
  }

  function contactError(){
    alert("Contact non crée");
  }

  function deviceInfo(){
    var model = device.model;
    var platform = device.platform;
    var uuid = device.uuid;
    var version = device.version;

    navigator.globalization.getPreferredLanguage(
      function (language) {alert("Model : "+model+" \nPlatforme : "+platform+" \nUUID : "+uuid+" \nVersion : "+version+" \nLangue : "+language.value);}
    );
  }

  function onBatteryStatus(status){
    alert("La Batterie mon Khey : "+status.level+"%");
  }

  function onBatteryCritical(){
    alert("Batterie faible frr! "+status.level+"%");
  }

  function onSuccess(contacts) {
    for (var i = 0; i < contacts.length; i++) {
      for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
        $("#contact ul").append("<li class='contact'><p>"+contacts[i].name.formatted+"</p><a href='#'><img src='img/supprimer.png' alt='supprimer contact'></a><a href='tel:"+contacts[i].phoneNumbers[j].value+"'><img src='img/tel2.png'></a></li>");
      }
    }
  }

    var open=false;
    $(".burger").click(function(){
    if(open == false){
      $("#menu").css("display", "block");
      $("#menu").css("margin-top", "2%");
      $("#menu").css("float", "none");
      $("#menu").addClass("menu");
      $("#menu li").addClass("menuli");
      $(this).html("#menu");
      open=true;
  }else{
      $("#menu").css("display", "none");
      open=false;
  }
  });

  $(".envoyer").click(function(){
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("prenom", $(".prenom").val());
      localStorage.setItem("nom", $(".nom").val());
      localStorage.setItem("date", $(".date").val());
      localStorage.setItem("naissance", $(".naissance").val());
      localStorage.setItem("mail", $(".mail").val());
      localStorage.setItem("message", $(".message").val());
    } else {
      alert("marche pas");
    }
  });

  $(".afficher").click(function(){
    $(".resprenom").html(localStorage.getItem("prenom"));
    $(".resnom").html(localStorage.getItem("nom"));
    $(".resdate").html(localStorage.getItem("date"));
    $(".resnaissance").html(localStorage.getItem("naissance"));
    $(".resmail").html(localStorage.getItem("mail"));
    $(".resmessage").html(localStorage.getItem("message"));
  });

  $(".effacer").click(function(){
    localStorage.clear();
    $(".resprenom").html(localStorage.getItem("prenom"));
    $(".resnom").html(localStorage.getItem("nom"));
    $(".resdate").html(localStorage.getItem("date"));
    $(".resnaissance").html(localStorage.getItem("naissance"));
    $(".resmail").html(localStorage.getItem("mail"));
    $(".resmessage").html(localStorage.getItem("message"));
  });

  $(".ajoutcontact").click(function(event){
    event.preventDefault();
    $("#pop").fadeIn();
    $("#voile").fadeIn();
  });

  $("#voile").click(function(){
		$(this).fadeOut();
		$("#pop").fadeOut();
	});

  $(".ajouter").click(function(){
    createContact();
  });

});
