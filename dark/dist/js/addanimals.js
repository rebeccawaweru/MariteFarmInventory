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

           
      document.getElementById('create').onclick=()=>{
        var Name = document.getElementById('animal1').value ;
        var Date1 = document.getElementById('date1').value ;
        var Produce = document.getElementById('produce').value ;
        var Cost = document.getElementById('cost').value ;
        var animalsRef = firebase.firestore().collection('animals').doc();
       
        // Add a new document in collection "cities"
      var randomID = Date.now();
        
          animalsRef.set({
            ItemId:animalsRef.id,
            AnimalID : randomID,
            Animal: Name,
            Date: Date1,
            Product: Produce,
            InitialCost: Cost,
            Sold:false,

        })
        .then(() => {
  
            console.log("Document successfully written!");
         
            // alert('animal added');
            window.location.reload();
        

        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
      
      
    }
    } else {
      // User is signed out
      // ...
      window.location.href="login.html";
    }
  });




