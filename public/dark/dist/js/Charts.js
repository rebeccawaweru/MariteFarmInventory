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
        document.getElementById('displayname').innerHTML= doc.data().Name;

          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });





firebase.firestore().collection("consumption")
    .get()
    .then((querySnapshot) => {
        let consumption = 0;
        let totalconsumption = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            consumption = parseInt(doc.data().Price);
            totalconsumption += consumption;


        });

        console.log(totalconsumption)

        firebase.firestore().collection("earnings").get().then((querySnapshot) => {
            let earnings = 0;
            let totalearnings = 0;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots

               earnings = parseInt(doc.data().Earning);
              totalearnings += earnings;
           
            });

            console.log(totalearnings);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
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