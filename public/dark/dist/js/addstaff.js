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
        document.getElementById('add').onclick = function (){
            var Date1 = document.getElementById("date").value;
            var name = document.getElementById('name').value;
            var phone = document.getElementById('phone').value;
            var ID = document.getElementById('idnumber').value;
            var position= document.getElementById('position').value;
            var salary= document.getElementById('salary').value;
            var kra= document.getElementById('kra').value;
            var t = "others";
            const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const d = new Date(Date1);
            var name1 = month[d.getMonth()];

            const Joined = firebase.firestore.Timestamp.fromDate(new Date());
                             
            var staffRef= firebase.firestore().collection("staff").doc()
            staffRef.set({
                StaffId:staffRef.id,
                Name: name,
                StaffID: ID,
                KRA:kra,
                Phone: phone,
                Position:position,
                Salary:salary,
                DateJoined: Date1,
            })
            .then(() => {

                console.log("Document successfully written!");
                window.location.href="Staff.html";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                window.location.reload();
            });

            firebase.firestore().collection("consumption").add({
                Date: Date1,
                Month:name1,
                Name: name,
                Price:salary,
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
            window.location.href="Staff.html";
        }

} else {
    // User is signed out
    // ...
    window.location.href="index.html";
    
    }
})