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

      // ...
      document.getElementById('add').onclick=()=>{
        var ItemName = document.getElementById('name').value ;
        var Date1 = document.getElementById('date1').value ;
      
        var Remarks = document.getElementById('shortDescription1').value ;
        var Measurement = document.getElementById('measurement').value ;
        var Quantity1 = document.getElementById('quantity').value ;
        var TotalPrice = document.getElementById('totalprice').value ;
        // var PriceMeasure = document.getElementById('pricepermeasure').value ;
        
         var goodsRef = firebase.firestore().collection("goods").doc();
        // Add a new document in collection "cities"
            goodsRef.set({
                ItemId:goodsRef.id,
                name: ItemName,
                Date: Date1,
                Comment: Remarks,
               Measure: Measurement,
               Quantity:Quantity1,
               QuantityI:Quantity1, //original
               Price:TotalPrice,
               
          
    
            })
            .then(() => {
                console.log("Document successfully written!");
                window.location.reload();
    
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    
    }
    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
    }
  });




