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

      firebase.firestore().collection("weights")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().WeightID;
          var Id2 = doc.data().ItemId;
          var Date1 = doc.data().Date1;
          var weight = doc.data().Weight;
          if(queryString == Id ){

            document.getElementById('date').value= Date1;
            document.getElementById('weight').value= weight;

            document.getElementById('update').onclick = () =>{
                var date1= document.getElementById('date').value;
                var weight = document.getElementById("weight").value;
                var animalsRef = firebase.firestore().collection('weights').doc(queryString);
                   return animalsRef.update({
                    Date1: date1,
                    Weight: weight,
                   })
                  .then(() => {
                      console.log("Document successfully written!");
                  
                  window.location.href = "Weigh.html" + "?" + Id2;
        
                  })
                  .catch((error) => {
                      console.error("Error writing document: ", error);
                  });
                  }

          }
          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("weights").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href = "records.html";
              
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
          }

          document.getElementById("cancel").onclick=function(){
            window.location.href = "records.html";
          }

          }); 

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


         

    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
      
    }
  });

       
      
     
 
    

   



