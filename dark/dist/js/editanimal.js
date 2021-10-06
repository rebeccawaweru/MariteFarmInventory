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
         
          document.getElementById('displayname').innerHTML= doc.data().Name;
          });
          
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      //getitem

      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);

      firebase.firestore().collection("animals")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().ItemId;
          if(queryString == Id ){
            document.getElementById('name').value= doc.data().Animal;
            document.getElementById('date').value= doc.data().Date;
            document.getElementById('product').value= doc.data().Product;
            document.getElementById('cost').value= doc.data().InitialCost;
          

          }
          }); 

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


      document.getElementById('update').onclick = () =>{
        var name1= document.getElementById('name').value;
        var date1=document.getElementById('date').value;
        var product1= document.getElementById('product').value;
        var cost1= document.getElementById('cost').value;
      
        var animalsRef = firebase.firestore().collection('animals').doc(queryString);
           return animalsRef.update({
            Animal: name1,
            Date: date1,
            Product: product1,
           InitialCost: cost1,
           })
          .then(() => {
              console.log("Document successfully written!");
          //    window.setTimeout(()=>{location.reload()},3000) ;
          window.location.href = "records.html";

          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          }

          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("animals").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href="records.html";


              
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });

          firebase.firestore().collection("consumption").where(queryString, '==', C1 ).delete().then(() => {
            var C1 = doc.data().IdAnimal;
          console.log("Document successfully deleted!");
          window.location.href="records.html";

          
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
          }



          document.getElementById("cancel").onclick=function(){
            window.location.href="records.html";
          }
       
     

    } else {
      // User is signed out
      // ...
      window.location.href="login.html";
      
    }
  });

       
      
     
 
    

   



