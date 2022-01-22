firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
    
        //buttons
      // document.getElementById("animals").onclick = function(){
      //     window.location.href="Animals.html";
      // }
      // document.getElementById("store").onclick = function(){
      //     window.location.href="table-basic.html";
      // }

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

      firebase.firestore().collection("served")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().ServeID;
          var Date1 = doc.data().DateServe;
          if(queryString == Id ){

            document.getElementById('date').value= Date1;
            document.getElementById('description').value= doc.data().Description;

            document.getElementById('update').onclick = () =>{
                var date1= document.getElementById('date').value;
                var description = document.getElementById("description").value;
                var animalsRef = firebase.firestore().collection('served').doc(queryString);
                   return animalsRef.update({
                    DateServe: date1,
                    Description: description,
                   })
                  .then(() => {
                      console.log("Document successfully written!");
                  //    window.setTimeout(()=>{location.reload()},3000) ;
                  
                  window.location.href = "Servelist.html" + "?" + Id;
        
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


          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("served").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href="Servelist.html";
              
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
          }
          document.getElementById("cancel").onclick=function(){
            window.location.href="Servelist.html";
          }

    document.getElementById("calf").onclick = function(){
              window.location.href = "AddAnimal2.html" + "?" + queryString;

    }


       
     

    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
      
    }
  });

       
      
     
 
    

   



