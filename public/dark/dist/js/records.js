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

           var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
          
         
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
        var content = '';
        let capital = 0;
        let totalcapital = 0;
        let size = 0;
        querySnapshot.forEach((doc) => {
            var AnimalId = doc.data(). ItemId;
            var Aml1 = doc.data().AnimalID;
            var Animal1 = doc.data().Animal;
            var Date1 = doc.data().Date;
            var type = doc.data().AnimalType;
            var Produce1  =  doc.data().Product;
            var Price1 = doc.data().InitialCost;
            var Initialweight = doc.data().InitialWeight;
            var currentweight = doc.data().CurrentWeight;
            var sold = doc.data().Sold;
            var method = doc.data().Method1;
            let pick = 'table-basic.html' + '?' + AnimalId;
            let consumption = 'Addcons.html' + '?' + AnimalId;
            let editanimal = 'EditAnimal.html' + '?' + AnimalId;
            let weighanimal = 'Weigh.html' + '?' + AnimalId;
            let Add = 'AddEarning.html' + '?' + AnimalId;
            let Sell = 'AddSell.html' + '?' + AnimalId;
           if( method === "Bought" && sold === false){
          
            
            content += '<tr>';
            content += '<td>' + Aml1+ '</td>';
            content += '<td>' + Animal1 + '</td>';
            content += '<td>' + Date1 + '</td>';
            content += '<td>' + type + '</td>';
            content += '<td>' + Produce1+ '</td>';
            content += '<td>' + Initialweight + 'kg'+ '</td>';
            content += '<td>' + currentweight + 'kg'+'<a href="'+weighanimal+'" id="edit4">Weigh</a></td>';
            content += '<td>' + Price1 + '</td>';
            content += '<td id="edit2"> <a href="'+editanimal+'" id="edit3">Edit</a> </td>';
            content += '<td id="edit2"> <a href="'+consumption+'" id="consumption">Consumption</a> </td>';
            content += '<td id="edit2"> <a href="'+pick+'" id="pick">Pick from storage</a> </td>';
            content += '<td id="edit2"> <a href="'+Add+'">Add Earnings</a> </td>';
            content += '<td id="edit2"> <a href="'+Sell+'" id="sell">Sell</a> </td>';
            content += '</tr>';
           }

        });
        $("#items1").append(content);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

  firebase.firestore().collection("allanimals").where("Method1", "==", "Bought")
  .where("Sold", "==", false)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          document.getElementById("totalA").innerHTML = querySnapshot.docs.length;
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