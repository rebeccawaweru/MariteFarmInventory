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
        var Id = doc.data().UserId;
         
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
          var Id2 = doc.data().ItemId;
         var method = doc.data().Method1;
          if(queryString == Id2 ){
            document.getElementById('update').onclick = () =>{
                var weight1 = document.getElementById('weight').value;
                var animalsRef = firebase.firestore().collection('allanimals').doc(queryString);
                   return animalsRef.update({
                    CurrentWeight:weight1
                   })
                  .then(() => {
                      console.log("Document successfully written!");
                  if(method === "Bought"){
                    window.location.href = "records.html";
                  }else if(method === "Born"){
                    window.location.href = "offsprings.html";   
                  }
                 
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
      document.getElementById("cancel").onclick = function(){
          window.location.href = "records.html";
      }

    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
      
    }
  });

       
      
     
 
    

   



