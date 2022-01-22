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
        var description = document.getElementById("description").value;
        var Date1 = document.getElementById('date').value;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date1);
        var name1 = month[d.getMonth()];
        var KeyName = window.localStorage.getItem("Animalid");

        firebase.firestore().collection("goods").get()
        .then((querySnapshot) => {
       
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var UseId = doc.data(). ItemId;
                if (queryString == UseId) {
                  var qua = doc.data().QuantityI;
                  var qua2 = doc.data().Quantity;
                  var name = doc.data().name;
                  var pricep = doc.data().Price;
                  var measure1 = doc.data().Measure;
                var cost1 = pricep/qua;
                if(qua2 >= Amount){
                    var newqua = (qua2 - Amount );
                    var  cost2 = cost1 * Amount;
                }else if(Amount > qua2){
                   alert('The quantity you entered is higher than the available amount')
                   window.location.reload();
                }
                
                  var NewRef = firebase.firestore().collection('goods').doc(queryString);

                 return NewRef.update({
                      Quantity : newqua
                  })
                   .then(() => {
                    console.log("Document successfully written!");
                //    window.setTimeout(()=>{location.reload()},3000) ;
                // window.location.href = "table-basic.html";
              
                firebase.firestore().collection("allanimals")
                .get()
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var Id = doc.data().ItemId;
                    var t = "animals";
                    if(KeyName == Id){
                        var Tag = doc.data().AnimalID;
                        var type = doc.data().AnimalType;
                        var Animalname = doc.data().Animal;

                        var AddRef = firebase.firestore().collection("consumption").doc();
                    AddRef.set({
                    ConsID:AddRef.id,
                    IdAnimal:KeyName, 
                    AnimalTag:Tag,
                    Name:Animalname,
                    Type:type,
                    ProductId: queryString,
                    Date: Date1,
                    Month:name1,
                    Product: name,
                    Description:description,
                    Price:cost2,
                    Quantity: Amount,
                    Measure: measure1,
                    ConsType:t,

                })
                .then((docRef) => {
                 
                    window.location.href="Consumption.html" + "?" + KeyName;

                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

            }


            });
        })
        .catch((error) => {
        console.log("Error getting documents: ", error);
        });
              
                
      
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

                // }else{
                //     alert("Amount you entered is higher than the available amount");
                //     window.location.href = "records.html"
                // }
            }
    
            });

            
         
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

        }   

       
        document.getElementById('cancel').onclick = function(){
            window.location.href = "offsprings.html";
        }      
        


    } else {
        // User is signed out
        // ...
        window.location.href="index.html";
        
      }
    });