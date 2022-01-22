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

      firebase.firestore().collection("staff")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().StaffId;
          if(queryString == Id ){
            document.getElementById('name').value= doc.data().Name;
            document.getElementById('idnumber').value= doc.data().StaffID;
            document.getElementById('kra').value= doc.data().KRA;
            document.getElementById('phone').value= doc.data().Phone;
            document.getElementById('position').value= doc.data().Position;
            document.getElementById('salary').value= doc.data().Salary;

          }
          }); 

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


      document.getElementById('update').onclick = () =>{
        var name = document.getElementById('name').value;  
        var ID = document.getElementById('idnumber').value;
        var kra= document.getElementById('kra').value;
        var phone =document.getElementById('phone').value;
        var position= document.getElementById('position').value;
        var salary= document.getElementById('salary').value;
    
      
        var animalsRef = firebase.firestore().collection("staff").doc(queryString);
           return animalsRef.update({
            Name: name,
            StaffID: ID,
            KRA:kra,
            Phone: phone,
            Position:position,
            Salary:salary,
    
           })
          .then(() => {
              console.log("Document successfully written!");
          //    window.setTimeout(()=>{location.reload()},3000) ;
          window.location.href = "Staff.html";

          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          }

          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("staff").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href="Staff.html";
              
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
          }



          document.getElementById("cancel").onclick=function(){
            window.location.href="Staff.html";
          }

    } else {
      // User is signed out
      // ...
      window.location.href= "index.html";
      
    }
  });

       
      
     
 
    

   



 