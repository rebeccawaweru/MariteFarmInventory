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

      firebase.firestore().collection("otherexpenses")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().ExpenseId;
          if(queryString == Id ){
            document.getElementById('date').value= doc.data().Date1;
            document.getElementById('purpose').value= doc.data().Purpose;
            document.getElementById('cost').value= doc.data().Cost;

          }
          }); 

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


      document.getElementById('update').onclick = () =>{
        var date = document.getElementById('date').value;  
        var purpose = document.getElementById('purpose').value;
        var cost = document.getElementById('cost').value;
    
      
        var animalsRef = firebase.firestore().collection("otherexpenses").doc(queryString);
           return animalsRef.update({
            Date1: date,
            Purpose: purpose,
           Cost:cost,
    
           })
          .then(() => {
              console.log("Document successfully written!");
          //    window.setTimeout(()=>{location.reload()},3000) ;
          window.location.href = "Expenditure.html";

          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          }

          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("otherexpenses").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href="Expenditure.html";
              
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
          }



          document.getElementById("cancel").onclick=function(){
            window.location.href="Expenditure.html";
          }

    } else {
      // User is signed out
      // ...
      window.location.href= "index.html";
      
    }
  });

       
      
     
 
    

   



 