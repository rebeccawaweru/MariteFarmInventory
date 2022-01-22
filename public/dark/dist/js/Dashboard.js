firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;

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

    document.getElementById("animals").onclick = function(){
        window.location.href="Animals.html";
    }
    document.getElementById("store").onclick = function(){
        window.location.href="table-basic.html";
    }
   
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

    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
      
    }
  });

       
      
     

    

   



