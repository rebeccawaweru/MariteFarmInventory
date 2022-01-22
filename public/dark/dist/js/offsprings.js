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
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var AnimalId = doc.data(). ItemId;
            var parent = doc.data().ParentTag;
            var Aml1 = doc.data().AnimalID;
            var Animal1 = doc.data().Animal;
            var Date1 = doc.data().Date;
            var Date3 = new Date(Date1);
            var type = doc.data().AnimalType;
            var Produce1  =  doc.data().Product;
            var Price1 = doc.data().InitialCost;
            var Initialweight = doc.data().InitialWeight;
            var currentweight = doc.data().CurrentWeight;
            var method = doc.data().Method1;
            var sold = doc.data().Sold;
            capital = parseInt(doc.data().InitialCost);
            totalcapital += capital;
            let pick = 'table-basic.html' + '?' + AnimalId;
            let consumption = 'Addconsoffsprings.html' + '?' + AnimalId;
            let editanimal = 'EditOffspring.html' + '?' + AnimalId;
            let weighanimal = 'Weigh.html' + '?' + AnimalId;
            let Add = 'Offspringearning.html' + '?' + AnimalId;
            let Sell = 'Soldoffspring.html' + '?' + AnimalId;

           if(method =="Born" && sold === false){
       
     

            content += '<tr>';
            content += '<td>' + Aml1+ '</td>';
            content += '<td>' + parent + '</td>';
            content += '<td>' + Animal1 + '</td>';
            content += '<td>' + Date3.toDateString() + '</td>';
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

   firebase.firestore().collection("allanimals").where("Method1", "==", "Born")
   .where("Sold", "==", false)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var k = querySnapshot.docs.length;
            document.getElementById("totalA").innerHTML = k;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    
         
    // document.getElementById("search-btn").onclick = function (){
    //   var search1 = document.getElementById('search').value;
    //   firebase.firestore().collection("offsprings")
    // .get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //         var Aml = doc.data().AnimalID;
    //         var Id = doc.data().ItemId;

    //         if(search1 == Aml){
    //           window.location.href = "search.html" + "?" + Id ;
            
    //           search1 = "";
      
    //         }
            
    //     });
    // })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });
      
   
    // }



    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
    }
  });



//   //GETTING NO OF DAYS.

//   let today = new Date().toISOString().slice(0, 10)
//   //day 
//   //get first day pull date                   
//  // Here are the two dates to compare
//  var date1 = Date1;
//  var date2 = today;
//  // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
//  date1 = date1.split('-');
//  date2 = date2.split('-');
//  // Now we convert the array to a Date object, which has several helpful methods
//  date1 = new Date(date1[0], date1[1], date1[2]);
//  date2 = new Date(date2[0], date2[1], date2[2]);
//  // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
//  date1_unixtime = parseInt(date1.getTime() / 1000);
//  date2_unixtime = parseInt(date2.getTime() / 1000);
//  // This is the calculated difference in seconds
//  var timeDifference = date2_unixtime - date1_unixtime;
//  // in Hours
//  var timeDifferenceInHours = timeDifference / 60 / 60;
//  // and finaly, in days :)
//  var timeDifferenceInDays = timeDifferenceInHours  / 24;
//  console.log(timeDifferenceInDays);

//    //END OF GETTING NUMBER OF DAYS