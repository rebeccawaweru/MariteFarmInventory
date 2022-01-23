firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...

        //logout
        document.getElementById('logout').onclick = ()=>{
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                window.location.href="login.html";
              }).catch((error) => {
                // An error happened.
              });
           }

    document.getElementById("add").onclick = function(){
        window.location.href= "Serve.html";
    }
          
    firebase.firestore().collection("served").get()
    .then((querySnapshot) => {
        var content = '';
        querySnapshot.forEach((doc) => {
            var Id = doc.data().ServeID;
            var tag = doc.data().AnimalID;
            var Date1 = doc.data().DateServe;
            var description = doc.data().Description;
           document.getElementById("totalA").innerHTML = querySnapshot.docs.length;
            var Date3 = new Date(Date1)
           const date = new Date(Date1);
           date.setDate(date.getDate() + 283);      
           let editanimal = 'EditServe.html' + '?' + Id;
      

            content += '<tr>';
            content += '<td>' + tag + '</td>';
            content += '<td>' + Date3.toDateString() + '</td>';
            content += '<td>' + date.toDateString() + '</td>';
            content += '<td>' + description + '</td>';
            content += '<td id="edit2"> <a href="'+editanimal+'">Edit</a> </td>';
      
            content += '</tr>';

        });
        $("#items1").append(content);
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