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
      
 


  document.getElementById("filter").onclick=function(){
    
    var an =  document.getElementById("1").value; 
    var an1 =  document.getElementById("2").value; 
       firebase.firestore().collection("allanimals").where("Animal", "==", an)
       .where("Sold","==",false)
    .where("AnimalType", "==", an1)
       .get().then((querySnapshot) => {
           var content = '';
           let capital = 0;
           let totalcapital = 0;
           querySnapshot.forEach((doc) => {
               var AnimalId = doc.data(). ItemId;
               var Aml1 = doc.data().AnimalID;
               var Animal1 = doc.data().Animal;
               var Date1 = doc.data().Date;
               var type = doc.data().AnimalType;
               var Produce1  =  doc.data().Product;
               var Price1 = doc.data().InitialCost;
               var Initialweight = doc.data().InitialWeight;
               var sold = doc.data().Sold;
               var method = doc.data().Method1;
               size = querySnapshot.docs.length;
               capital = parseInt(doc.data().InitialCost);
               totalcapital += capital;
               document.getElementById('totalA').innerHTML = size;
               document.getElementById("capital").innerHTML = totalcapital;
            
               content += '<tr>';
               content += '<td>' + Aml1+ '</td>';
               content += '<td>' + Animal1 + '</td>';
               content += '<td>' + Date1 + '</td>';
               content += '<td>' + type + '</td>';
               content += '<td>' + Produce1+ '</td>';
               content += '<td>' + Initialweight + 'kg'+ '</td>';
               content += '<td>' + Price1 + '</td>';
               content += '</tr>';
   
           });
           $("#items1").append(content);
           document.getElementById("refresh").onclick =function (){
             window.location.reload();
           }

       
       })
       .catch((error) => {
           console.log("Error getting documents: ", error);
       });
 
   
  }
           



    // firebase.firestore().collection("allanimals").get()
    // .then((querySnapshot) => {
    //     var content = '';
    //     let capital = 0;
    //     let totalcapital = 0;
    //     querySnapshot.forEach((doc) => {
    //         var AnimalId = doc.data(). ItemId;
    //         var Aml1 = doc.data().AnimalID;
    //         var Animal1 = doc.data().Animal;
    //         var Date1 = doc.data().Date;
    //         var type = doc.data().AnimalType;
    //         var Produce1  =  doc.data().Product;
    //         var Price1 = doc.data().InitialCost;
    //         var Initialweight = doc.data().InitialWeight;
    //         var sold = doc.data().Sold;
    //         var method = doc.data().Method1;
    //         size = querySnapshot.docs.length;
    //         capital = parseInt(doc.data().InitialCost);
    //         totalcapital += capital;
    //         document.getElementById('totalA').innerHTML = size;
    //         document.getElementById("capital").innerHTML = totalcapital;
          
    //        if( sold === false){
    //         content += '<tr>';
    //         content += '<td>' + Aml1+ '</td>';
    //         content += '<td>' + Animal1 + '</td>';
    //         content += '<td>' + Date1 + '</td>';
    //         content += '<td>' + type + '</td>';
    //         content += '<td>' + Produce1+ '</td>';
    //         content += '<td>' + Initialweight + 'kg'+ '</td>';
    //         content += '<td>' + Price1 + '</td>';
    //         content += '</tr>';
    //        }

    //     });
    //     $("#items1").append(content);
    // })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });



    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
    }
  });