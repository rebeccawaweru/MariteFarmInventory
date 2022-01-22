firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
          //logout
          document.getElementById('logout').onclick = ()=>{
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                window.location.href="login.html";
              }).catch((error) => {
                // An error happened.
              });
           }
       //collect data
      firebase.firestore().collection("users").where('UserId', '==', uid)
      .get(user)
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var Id = doc.data().UserId;
          var UserType = doc.data().UserType;
        if(UserType === "user"){
            document.getElementById("warn").style.display = "block";
        }else if(UserType === "admin"){
            document.getElementById("body").style.display = "block"; 
        }
          document.getElementById('displayname').innerHTML= doc.data().Name;
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
      //getitem

      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);

      firebase.firestore().collection("allanimals")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().ItemId;
          if(queryString == Id ){
            document.getElementById('parenttag').value= doc.data().ParentTag;
            document.getElementById('animaltag').value= doc.data().AnimalID;
            document.getElementById('name').value= doc.data().Animal;
            document.getElementById('date').value= doc.data().Date;
            document.getElementById('animaltype').value= doc.data().AnimalType;
            document.getElementById('product').value= doc.data().Product;
            document.getElementById('weight').value= doc.data().InitialWeight;
            var animalTag = doc.data().AnimalID;
            var name = doc.data().Animal;
            var cost = doc.data().InitialCost;
            document.getElementById("done").onclick=function(){
              var deathDate = document.getElementById("deathdate").value;
              var causeDeath = document.getElementById("cause").value;
              var deathRef = firebase.firestore().collection("Deaths").doc();
                deathRef.set({
                DeathId:deathRef.id,
                AnimalId:Id,
                AnimalTag:animalTag,
                AnimalName:name,
                InitalCost:cost,
                DateofDeath:deathDate,
                CauseofDeath:causeDeath,

                  })
                  .then(() => {
                      console.log("Document successfully written!");
                      firebase.firestore().collection("allanimals").doc(queryString).delete().then(() => {
                        console.log("Document successfully deleted!");
                        window.location.href="Death.html";
                        
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });

          
                  })
                  .catch((error) => {
                      console.error("Error writing document: ", error);
                  });
            }
          

          }
          }); 

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


      document.getElementById('update').onclick = () =>{
        var ptag1 = document.getElementById('parenttag').value;  
        var tag1 = document.getElementById('animaltag').value;
        var name1= document.getElementById('name').value;
        var date1=document.getElementById('date').value;
        var type1=document.getElementById('animaltype').value;
        var product1= document.getElementById('product').value;
        var weight1= document.getElementById('weight').value;
    
      
        var animalsRef = firebase.firestore().collection('allanimals').doc(queryString);
           return animalsRef.update({
            ParentTag:ptag1,
            AnimalID:tag1,
            Animal: name1,
            Date: date1,
            AnimalType:type1,
            Product: product1,
            InitialWeight:weight1,
        
    
           })
          .then(() => {
              console.log("Document successfully written!");
          //    window.setTimeout(()=>{location.reload()},3000) ;
          window.location.href = "offsprings.html";

          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          }

          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("allanimals").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href="offsprings.html";
              
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });

          firebase.firestore().collection("consumption").where(queryString, '==', C1 ).delete().then(() => {
            var C1 = doc.data().IdAnimal;
          console.log("Document successfully deleted!");
          window.location.href="offspring.html";

          
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
          }



          document.getElementById("cancel").onclick=function(){
            window.location.href="offsprings.html";
          }

          document.getElementById("death").onclick=function(){
            document.getElementById("death1").style.display = "block";
          }

          document.getElementById("cancel1").onclick=function(){
            document.getElementById("death1").style.display = "none";
          }

    } else {
      // User is signed out
      // ...
      window.location.href= "index.html";
      
    }
  });

       
      
     
 
    

   



