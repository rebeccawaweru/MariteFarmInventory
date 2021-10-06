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
        document.getElementById('use').onclick = function(){
        var Amount = document.getElementById('amount').value;
        var Date1 = document.getElementById('date').value;
        var KeyName = window.localStorage.getItem("Animalid");

        firebase.firestore().collection("goods").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var UseId = doc.data(). ItemId;
                if (queryString == UseId) {
                  var qua = doc.data().Quantity;
                  var name = doc.data().name;
                  var pricep = doc.data().PriceperMeasure;
                  var measure1 = doc.data().Measure;
                  var cost1 = pricep * Amount ;
                 var newqua = (qua - Amount );
                  
                  var NewRef = firebase.firestore().collection('goods').doc(queryString);

                 return NewRef.update({
                      Quantity : newqua
                  })
                   .then(() => {
                    console.log("Document successfully written!");
                //    window.setTimeout(()=>{location.reload()},3000) ;
                // window.location.href = "table-basic.html";
              

               firebase.firestore().collection("consumption").add({
                    IdAnimal:KeyName, 
                    ProductId: queryString,
                    Date: Date1,
                    Product: name,
                    Price:cost1,
                    Quantity: Amount,
                    Measure: measure1,

                })
                .then((docRef) => {
                 
                    window.location.href="Consumption.html" + "?" + KeyName;

                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

      
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