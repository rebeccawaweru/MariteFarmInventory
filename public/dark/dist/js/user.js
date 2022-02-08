
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
    console.log(uid);
    firebase.firestore().collection("users").where('UserId', '==', uid)
    .get(user)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

      var Id = doc.data().UserId;
      var UserType = doc.data().UserType; 
      var email = doc.data().Email;
      if(UserType === "user"){
          document.getElementById("warn").style.display = "block";

      }else if(UserType === "admin" && email === "maritepltd@gmail.com"){
          document.getElementById("body").style.display = "block"; 
      }else{
        document.getElementById("warn").style.display = "block"; 
      }
       
        });
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
       
firebase.firestore().collection("users").get()
.then((querySnapshot) => {
    
        var content = "";
        querySnapshot.forEach((doc) => {
            var Name = doc.data().Name;
            var DateJoined = doc.data().DateJoined.toDate();
            var Email = doc.data().Email;
            var UserT = doc.data().UserType;
            var Id = doc.data().ID;
            let unix_timestamp = DateJoined;
            var date = new Date(unix_timestamp * 100);
            var date1 = DateJoined;
            // date1 =  date1.split('-');
            date1 = new Date(date1[0], date1[1], date1[2]);
            date1_unixtime = parseInt(date1.getTime() / 1000);

             document.getElementById("users").innerHTML = querySnapshot.docs.length;
             let editanimal = 'EditUser.html' + '?' + Id;

                        content+= `<tr>`;
                        content+=`<td>`+ Name + `</td>`;
                        content+=`<td>`+Email  + `</td>`;
                        content+=`<td>`+ DateJoined + `</td>`;
                        content+=`<td>`+ UserT  + `</td>`;
                        content += '<td id="edit2"> <a href="'+editanimal+'">Edit</a> </td>';
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