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


        var queryString = decodeURIComponent(window.location.search);
        queryString = queryString.substring(1);
        document.getElementById('save').onclick = function(){
        var Date1 = document.getElementById('date').value;
        var Produce1 = document.getElementById('produce').value;
        var Earning = document.getElementById('earn').value;

        firebase.firestore().collection("animals").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var Id = doc.data(). ItemId;
                if (queryString == Id) { 
                  var EarnRef = firebase.firestore().collection('earnings').doc();

                 return EarnRef.set({
                     AnimalId: Id,
                     Date : Date1,
                     Produce: Produce1,
                     Earn: Earning,

                  })
                   .then(() => {
                    console.log("Document successfully written!");
                //    window.setTimeout(()=>{location.reload()},3000) ;
                window.location.href = "Earning.html" + "?" + Id;
                    

      
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

                }
    
            });

            
         
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        }   

        document.getElementById('view').onclick=function(){
            window.location.href="Earning.html" + "?" + queryString;
        }  
        document.getElementById('cancel').onclick = function(){
            window.location.href = "records.html";
        }      
        


    } else {
        // User is signed out
        // ...
        window.location.href="login.html";
        
      }
    });