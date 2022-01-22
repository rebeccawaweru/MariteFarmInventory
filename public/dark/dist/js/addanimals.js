firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

      // ...

        //logout
        document.getElementById('logout').onclick = ()=>{
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                window.location.href="login.html";
              }).catch((error) => {
                // An error happened.
              });
           }
           
           $("select").change(function() {
            if ($(this).val() == "Bought") {
              $(".xyz").attr("disabled", "disabled");
             
            } else {
              $(".xyz").removeAttr("disabled");
           
            }
          }).trigger("change");
               //select
      firebase.firestore().collection("allanimals")
      .get()
      .then((querySnapshot) => {
          var grouplist = "";
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
             var tag = doc.data().AnimalID;
             var sold = doc.data().Sold;
             if(sold === false){
              grouplist +='  <option value="' + tag + '">' + tag + '</option>'
             }
          }); 
   
          $('#parenttag').append(grouplist); 
      })
      //end
      document.getElementById('create').onclick=()=>{
        var Name = document.getElementById('animal1').value ;
        var Date1 = document.getElementById('date1').value ;
        var AType = document.getElementById('animaltype').value ;
        var Produce = document.getElementById('produce').value ;
        var Cost = document.getElementById('cost').value ;
        var Tag = document.getElementById("animaltag").value;
        var Tag2 = document.getElementById("parenttag").value;
        var Method =  document.getElementById("method").value;
        var Weight = document.getElementById("initalweight").value;
        var animalsRef = firebase.firestore().collection('animals').doc();
       var offspringsRef =  firebase.firestore().collection('offsprings').doc();
       var allanimalsRef = firebase.firestore().collection('allanimals').doc();
        // Add a new document in collection "cities"
      // var randomID = Date.now();
          if(Tag == ""){
            window.alert("Please enter the animal tag")
          }else if (Cost == ""){
            window.alert("Please enter the inital cost") 
          }else if (AType == ""){
            window.alert("Please enter the animal category") 
          }else if (Method == "Bought"){
            animalsRef.set({
              ItemId:animalsRef.id,
              AnimalID : Tag.toUpperCase(),
              Animal: Name,
              Date: Date1,
              AnimalType:AType,
              Product: Produce,
              Method1:Method,
              InitialCost: Cost,
              InitialWeight:Weight,
              Sold:false,
  
          })
          .then(() => {
    
              console.log("Document successfully written!");
              window.location.reload();
          
  
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });

          }else if(Method == "Born"){ 
            offspringsRef.set({
              ItemId:offspringsRef.id,
              AnimalID:Tag.toUpperCase(),
              Animal: Name,
              Date: Date1,
              ParentTag:Tag2,
              AnimalType:AType,
              Product: Produce,
              Method1:Method,
              InitialCost: Cost,
              InitialWeight:Weight,
              Sold:false,
  
          })
          .then(() => {
    
              console.log("Document successfully written!");
              window.location.reload();
          
  
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });

          }
            allanimalsRef.set({
              ItemId:allanimalsRef.id,
              ParentTag:Tag2,
              AnimalID : Tag.toUpperCase(),
              Animal: Name,
              Date: Date1,
              AnimalType:AType,
              Product: Produce,
              Method1:Method,
              InitialCost: Cost,
              InitialWeight:Weight,
              CurrentWeight:Weight,
              Sold:false,
  
          })
          .then(() => {
    
              console.log("Document successfully written!");
              window.location.reload();
          
  
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });


          
    }
    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
    }
  });




