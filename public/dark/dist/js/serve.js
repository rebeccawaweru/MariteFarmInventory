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

      //select
      firebase.firestore().collection("allanimals")
      .get()
      .then((querySnapshot) => {
          var grouplist = "";
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
            var sold = doc.data().Sold;
            if(sold === false){
              var tag = doc.data().AnimalID;
              grouplist +='  <option value="' + tag + '">' + tag + '</option>'
            }
          }); 
   
          $('#animaltag').append(grouplist); 
      })
      //end


        document.getElementById('save').onclick = function(){
        var animal = document.getElementById('animaltag').value;
        var Date1 = document.getElementById('date').value;
        var description = document.getElementById('description').value;
        var serveRef = firebase.firestore().collection("served").doc();

         serveRef.set({
            ServeID:serveRef.id,
            AnimalID : animal,
            DateServe: Date1,
            Description:description,
        })
        .then(() => {
            console.log("Document successfully written!");
            window.location.href="Servelist.html";
        })
        .catch((error) => {
        console.error("Error writing document: ", error);
          window.alert("error! please refresh");
     
        });
        }   
        document.getElementById('cancel').onclick = function(){
            window.location.href = "Servelist.html";
        }      
    } else {
        // User is signed out
        // ...
        window.location.href="index.html";
        
      }
    });