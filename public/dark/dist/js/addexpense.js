firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
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

      
        document.getElementById('save').onclick = function (){
            
            var date = document.getElementById('date').value;
            var purpose = document.getElementById('purpose').value;
            var cost = document.getElementById('cost').value;
            const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const d = new Date(date);
            var name1 = month[d.getMonth()];
            var t = "others";               
            var expenseRef= firebase.firestore().collection("otherexpenses").doc()
            expenseRef.set({
                ExpenseId:expenseRef.id,
               Date1:date,
               Purpose: purpose,
                Cost:cost,

            })
            .then(() => {

                console.log("Document successfully written!");
                window.location.href="Expenditure.html";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                window.location.reload();
            });

            firebase.firestore().collection("consumption").add({
                Date: date,
                Month:name1,
                Price:cost,
                ConsType:t,
                
            })
            .then((docRef) => {
             
                console.log('Success');

            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });




                }

        document.getElementById("cancel").onclick=function(){
            window.location.href="Expenditure.html";
        }

} else {
    // User is signed out
    // ...
    window.location.href="index.html";
    
    }
})