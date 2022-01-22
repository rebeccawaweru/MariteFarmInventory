
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
    //    document.getElementById('add').onclick = ()=>{
    //     window.location.href = "Addcons.html"  ;
    
    // };
    
    
    
    
               
    
firebase.firestore().collection("users").get()
.then((querySnapshot) => {
    
        var content = "";
        querySnapshot.forEach((doc) => {
        
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Name = doc.data().Name;
            var DateJoined = doc.data().DateJoined.toDate();
            var Email = doc.data().Email;
            var UserT = doc.data().UserType;
            let unix_timestamp = DateJoined;
            var date = new Date(unix_timestamp * 100);
            var date1 = DateJoined;
            // date1 =  date1.split('-');
            date1 = new Date(date1[0], date1[1], date1[2]);
            date1_unixtime = parseInt(date1.getTime() / 1000);

             document.getElementById("users").innerHTML = querySnapshot.docs.length;

                        content+= `<tr>`;
                        content+=`<td>`+ Name + `</td>`;
                        content+=`<td>`+Email  + `</td>`;
                        content+=`<td>`+ DateJoined + `</td>`;
                        content+=`<td>`+ UserT  + `</td>`;
                        content+= `</tr>`;
            
                    
                });
                
                    $("#user").append(content);    
    
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                }); 
 
    
    
    
   
    
    } else {
    // User is signed out
    // ...
    window.location.href="index.html";
    
    }
    });