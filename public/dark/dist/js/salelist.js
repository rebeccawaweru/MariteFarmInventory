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
           firebase.firestore().collection("users").where('UserId', '==', uid)
           .get(user)
           .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
             var Id = doc.data().UserId;
             var UserType = doc.data().UserType; 
             var email = doc.data().Email;
       
              if(UserType === "admin" && email === "maritepltd@gmail.com"){
                 document.getElementById("body").style.display = "block"; 
              
             }
              
               });
               
           })
           .catch((error) => {
               console.log("Error getting documents: ", error);
           });

    document.getElementById("print").onclick = function(){
        window.print();
    }
          
    firebase.firestore().collection("sales").get()
    .then((querySnapshot) => {
        var content = '';
        let s = 0;
        let s1 = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            var Id = doc.data().SaleId;
            var tag = doc.data().AnimalID;
            var Date1 = doc.data().Date1;
            var month = doc.data().Month;
            var weight = doc.data().Weight;
            s = parseInt(doc.data().Price);
            s1 += s;
            document.getElementById("totalA").innerHTML = s1;
            var p1 = s/weight;
            var p2 = Math.round(p1 * 10)/10;
           
            var Date3 = new Date(Date1)
           const date = new Date(Date1);
           date.setDate(date.getDate() + 31);      
           let editanimal = 'EditSale.html' + '?' + Id;
      

            content += '<tr>';
            content += '<td>' + tag + '</td>';
            content += '<td>' + Date3.toDateString() + '</td>';
            content += '<td>' + s + '</td>';
            content += '<td>' + weight + "kg"+ '</td>';
            content += '<td>' + p2  + "/"+ "kg"+ '</td>';
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