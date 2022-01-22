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

      firebase.firestore().collection("earnings")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().EarnID;
          var Id2 = doc.data().AnimalId;
          if(queryString == Id ){
            document.getElementById('date').value= doc.data().Date;
            document.getElementById('product').value= doc.data().Produce;
            document.getElementById('quantity').value= doc.data().Quantity1;
            document.getElementById('cost').value= doc.data().Pricepermeasure;
            var animalTag = doc.data().AnimalID;

            document.getElementById('update').onclick = () =>{
                var date1=document.getElementById('date').value;
                var produce1=document.getElementById('product').value;
                var quantity1= document.getElementById('quantity').value;
                var unit1= document.getElementById('cost').value;
                var total1 = unit1*quantity1;
                var animalsRef = firebase.firestore().collection('earnings').doc(queryString);
        
                   return animalsRef.update({
                    Date: date1,
                    Produce: produce1,
                   Quantity1: quantity1,
                   Pricepermeasure:unit1,
                   Earning:total1,
                   })
                  .then(() => {
                      console.log("Document successfully written!");
                  //    window.setTimeout(()=>{location.reload()},3000) ;
                  
                  window.location.href = "Earning.html" + "?" + Id2;
        
                  })
                  .catch((error) => {
                      console.error("Error writing document: ", error);
                  });
                  }

          }
          }); 

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("earnings").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href="Earning.html";
              
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
          }
          document.getElementById("cancel").onclick=function(){
            window.location.href="Earning.html";
          }


      


       
     

    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
      
    }
  });

       
      
     
 
    

   



