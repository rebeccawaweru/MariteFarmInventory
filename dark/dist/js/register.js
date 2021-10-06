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
      firebase.firestore().collection("users")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
            var UserT = doc.data().UserType;

         
                document.getElementById('register').onclick = function (e){
                e.preventDefault();
                if(UserT === "admin"){
                    var name = document.getElementById('name').value;
                    var email = document.getElementById('email').value;
                    var pass1 = document.getElementById('password1').value;
                    var pass2= document.getElementById('password2').value;
                    const Joined = firebase.firestore.Timestamp.fromDate(new Date());
                    if (pass1 === pass2){
                        
                        firebase.auth().createUserWithEmailAndPassword(email, pass1)
                        .then((userCredential) => {
                            // Signed in 
                            var user = userCredential.user;
                            // ...
                            
                            //creating db
                                      
                            firebase.firestore().collection("users").add({
                                Name: name,
                                Email: email,
                                DateJoined: Joined,
                                UserId : user.uid,
                                UserType:"user"
                            })
                            .then(() => {

                                console.log("Document successfully written!");
                                window.location.href="login.html";
                            })
                            .catch((error) => {
                                console.error("Error writing document: ", error);
                            });
                        })
                        .catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            // ..
                        });
                        
                    }else{
                        alert('The passwords you entered do not match');
                        document.getElementById("password1").value = '';
                        document.getElementById("password2").value = '';
                    }

                }else{
              
                    console.log('Only admin can add user')
       
               
                 }
                
                }
          

          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

              
            

} else {
    // User is signed out
    // ...
    window.location.href="login.html";
    
    }
})