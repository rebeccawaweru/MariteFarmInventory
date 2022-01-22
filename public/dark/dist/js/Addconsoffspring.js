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
        var description = document.getElementById('description').value;
        var date1 = document.getElementById('date').value;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(date1);
        var name1 = month[d.getMonth()];

        var price = document.getElementById('cost').value;
        var measure = document.getElementById('measurement').value;
        var quantity1 = document.getElementById('quantity').value;
        firebase.firestore().collection("allanimals").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var AnimalId = doc.data(). ItemId;
                var Tag = doc.data().AnimalID;
                var Animalname = doc.data().Animal;
                var type = doc.data().AnimalType;
                var t = "animals";
                if (queryString == AnimalId) {
                    var AddRef = firebase.firestore().collection("consumption").doc();

                    AddRef.set({
                        ConsID:AddRef.id,
                        IdAnimal:AnimalId,
                        AnimalTag:Tag,
                        Name:Animalname,
                        Type:type,
                        ProductId:AddRef.id,
                        Product:product,
                        Description:description,
                        Date: date1,
                        Month:name1,
                        Price:price,
                        Measure:measure,
                        Quantity:quantity1,
                        Time : myTimestamp,
                        ConsType:t,
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
        window.location.href="index.html";
        
      }
    });