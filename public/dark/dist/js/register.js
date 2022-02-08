

      
                //collect data
     document.getElementById('register').onclick = function (){
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
                              var userRef = firebase.firestore().collection("users").doc();       
                            userRef.set({
                                ID:userRef.id,
                                UserId:user.uid,
                                Name: name,
                                Email: email,
                                DateJoined: Joined,
                                UserType:"user"
                            })
                            .then(() => {

                                console.log("Document successfully written!");
                                window.location.href="index.html";
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
                }
          


              
            

