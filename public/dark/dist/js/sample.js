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
    document.getElementById("print").onclick = function(){
        window.print();
    }
   
    var month1 = document.getElementById("month").value;
    var cat = document.getElementById("category").value;
    var animal = document.getElementById("animal").value;
    var product = document.getElementById("product").value;

    firebase.firestore().collection("consumption").where("Month", "==", month1)
       .where("ConsType","==","animals").get()
       .then((querySnapshot) => {
        var content = '';
        let cons = 0;
        let cons2 = 0;
        querySnapshot.forEach((doc) => {
            var month = doc.data().Month;
            var date1 = doc.data().Date;
            cons = parseInt(doc.data().Price);
            cons2 += cons;
        });
        //earning
        firebase.firestore().collection("earnings").where("Month", "==", month1)
        .get()
        .then((querySnapshot) => {
            let earn = 0;
            let earn1 = 0;
            let diff = 0;
            let diff2 = 0;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                var m1 = doc.data().Month;
                earn = doc.data().Earning;
                earn1 += earn;
        });
        if(cons2 > earn1){
            diff = cons2 - earn1;
            var a = "-";
        }else if(earn1 > cons2){
            diff = earn1-cons2
            var a = "+";
        }


        content += '<tr>';
        content += '<td>' + "January" + '</td>';
        content += '<td>' +  + '</td>';
        content += '<td>' +  + '</td>';
        content += '<td>' +  + '</td>';
        content+=`<td id="ex">`+ cons2 + `</td>`;
       content += '<td id="edit2">' + earn1 + '</td>';
        content += '<td>'+ a+ diff + '</td>';
        content += '</tr>';
           $("#items1").append(content);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
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