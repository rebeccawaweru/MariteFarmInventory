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
        document.getElementById("add").onclick=function(){
            window.location.href="AddExpense.html";
        }

     
          
    firebase.firestore().collection("otherexpenses").get()
    .then((querySnapshot) => {
        var content = '';
        let capital = 0;
        let totalcapital = 0;
        let cap = 0;
        let cap1 = 0;
        let today = new Date().toISOString().slice(0, 10)
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Id = doc.data().ExpenseId;
            var date = doc.data().Date1;
            var Date3 = new Date(date);
            var purpose = doc.data().Purpose;
            var cost =  doc.data().Cost;
            
            cap = parseInt(doc.data().Cost);
             cap1 += cap;
            // totalcapital += capital;
            document.getElementById("capital").innerHTML = cap1;

            if (date === today){
              capital = parseInt(doc.data().Cost);
              totalcapital += capital;
              document.getElementById("totalA").innerHTML = totalcapital;
            }
        
      
            let editanimal = 'EditExpense.html' + '?' + Id;
            content += '<tr>';
            content += '<td>' + Date3.toDateString() + '</td>';
            content += '<td>' + purpose + '</td>';
            content += '<td>' + cost + '</td>';
          
            content += '<td id="edit2"> <a href="'+editanimal+'" >Edit</a> </td>';
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