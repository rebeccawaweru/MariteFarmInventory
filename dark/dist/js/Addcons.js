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
         var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
  
        document.getElementById('save').onclick = function(){
        var product = document.getElementById('name').value;
        var date1 = document.getElementById('date').value;
        var price = document.getElementById('cost').value;
        var measure = document.getElementById('measurement').value;
        var quantity1 = document.getElementById('quantity').value;
        firebase.firestore().collection("animals").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var AnimalId = doc.data(). ItemId;

            

                if (queryString == AnimalId) {
                    var AddRef = firebase.firestore().collection("consumption").doc();
                    AddRef.set({
                        IdAnimal:AnimalId,
                        ProductId:AddRef.id,
                        Product:product,
                        Date: date1,
                        Price:price,
                        Measure:measure,
                        Quantity:quantity1,
                        Time : myTimestamp,
                  
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        window.location.href="Consumption.html" + "?" + AnimalId;
                      
            
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
            window.location.href="Consumption.html" + "?" + queryString;
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