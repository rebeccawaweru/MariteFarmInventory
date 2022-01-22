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
        var UserType = doc.data().UserType;
          
        if(UserType === "user"){
            document.getElementById("warn").style.display = "block";
        }else if(UserType === "admin"){
            document.getElementById("body").style.display = "block"; 
        }
         
          document.getElementById('displayname').innerHTML= doc.data().Name;
          });
          
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      //getitem
      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);

    firebase.firestore().collection("consumption")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        
            if(doc.data().ConsID === queryString){
             

                document.getElementById("date").value = doc.data().Date;
                document.getElementById("product").value = doc.data().Product;
                document.getElementById("quantity").value = doc.data().Quantity;
                document.getElementById("cost").value = doc.data().Price;
            }
            // document.getElementById("update").onclick = function(){
              
            //     var date1=document.getElementById('date').value;
            //     var produce1=document.getElementById('product').value;
            //     var quantity1= document.getElementById('quantity').value;
            //     var cost1 = document.getElementById('cost').value;

            //     var animalsRef = firebase.firestore().collection('consumption').doc(queryString);
            //     return animalsRef.update({
            //      Date: date1,
            //      Product: produce1,
            //     Quantity: quantity1,
            //      Price:cost1,
            //     })
            //    .then(() => {
            //        console.log("Document successfully written!");
            //    //    window.setTimeout(()=>{location.reload()},3000) ;
               
            //    window.location.href = "Consumption.html" + "?" + queryString;
     
            //    })
            //    .catch((error) => {
            //        console.error("Error writing document: ", error);
            //    });
            // }

        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
 



      

    document.getElementById("delete").onclick=function(){
        firebase.firestore().collection("goods")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var ItemID = doc.data().ItemId;
            var Quantity = parseInt(doc.data().Quantity);
          firebase.firestore().collection("consumption")
          .get()
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  var id = doc.data().ConsID;
                  var ProductID = doc.data().ProductId;
                  var Quantity1 = parseInt(doc.data().Quantity);
                 if(ItemID === ProductID && queryString === id){
                    var newqua = Quantity1 + Quantity;
                    console.log(newqua)
                    var animalsRef = firebase.firestore().collection('goods').doc(ItemID);
                    return animalsRef.update({
                      Quantity: newqua,
                       })
                      .then(() => {
                     console.log("Document successfully written!");
                     firebase.firestore().collection("consumption").doc(queryString).delete().then(() => {
                        console.log("Document successfully deleted!");
                        window.location.href = "Consumptions2.html"
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
            
                      })
                      .catch((error) => {
                          console.error("Error writing document: ", error);
                      });
                 }else if(ItemID !== ProductID && queryString === id){
                    firebase.firestore().collection("consumption").doc(queryString).delete().then(() => {
                        console.log("Document successfully deleted!");
                        window.location.href = "Consumptions2.html"
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                 }
                 
              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
          });
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      }); 
          }


          document.getElementById("cancel").onclick=function(){
            window.location.href="Consumptions2.html";
          }


      


       
     

    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
      
    }
  });

       
      
     
 
    

   



