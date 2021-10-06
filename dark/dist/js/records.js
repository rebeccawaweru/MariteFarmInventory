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
          
    firebase.firestore().collection("animals").get()
    .then((querySnapshot) => {
        var content = '';
        let capital = 0;
        let totalcapital = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var AnimalId = doc.data(). ItemId;
            var Aml1 = doc.data().AnimalID;
            var Animal1 = doc.data().Animal;
            var Date1 = doc.data().Date;
            var Produce1  =  doc.data().Product;
            var Price1 = doc.data().InitialCost;
            size = querySnapshot.docs.length;
            capital = parseInt(doc.data().InitialCost);
            totalcapital += capital;
            document.getElementById('totalA').innerHTML = size;
            document.getElementById("capital").innerHTML = totalcapital;
          //GETTING NO OF DAYS.

          let today = new Date().toISOString().slice(0, 10)
           //day 
           //get first day pull date                   
          // Here are the two dates to compare
          var date1 = Date1;
          var date2 = today;
          // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
          date1 = date1.split('-');
          date2 = date2.split('-');
          // Now we convert the array to a Date object, which has several helpful methods
          date1 = new Date(date1[0], date1[1], date1[2]);
          date2 = new Date(date2[0], date2[1], date2[2]);
          // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
          date1_unixtime = parseInt(date1.getTime() / 1000);
          date2_unixtime = parseInt(date2.getTime() / 1000);
          // This is the calculated difference in seconds
          var timeDifference = date2_unixtime - date1_unixtime;
          // in Hours
          var timeDifferenceInHours = timeDifference / 60 / 60;
          // and finaly, in days :)
          var timeDifferenceInDays = timeDifferenceInHours  / 24;
          console.log(timeDifferenceInDays);
          if(timeDifferenceInDays === 7){
            var weeklycapital = totalcapital * 7;
            document.getElementById("weeklycapital").innerHTML = weeklycapital;
          }else{
            document.getElementById("weeklycapital").innerHTML = "---";
          }
          if(timeDifferenceInDays === 30){
            var monthlycapital = totalcapital * 30;
            document.getElementById("monthlycapital").innerHTML=monthlycapital;
          }else{
            document.getElementById("monthlycapital").innerHTML = "---";
          }
            //END OF GETTING NUMBER OF DAYS
            
            let pick = 'table-basic.html' + '?' + AnimalId;
            let consumption = 'Addcons.html' + '?' + AnimalId;
            let editanimal = 'EditAnimal.html' + '?' + AnimalId;
            let Add = 'AddEarning.html' + '?' + AnimalId;
            let Sell = 'AddSell.html' + '?' + AnimalId;
           if(doc.data().Sold === false){
            content += '<tr>';
            content += '<td>' + Aml1+ '</td>';
            content += '<td>' + Animal1 + '</td>';
            content += '<td>' + Date1 + '</td>';
            content += '<td>' + Produce1+ '</td>';
            content += '<td>' + Price1 + '</td>';
            content += '<td> <a href="'+editanimal+'">Edit</a> </td>';
            content += '<td> <a href="'+consumption+'">Consumption</a> </td>';
            content += '<td> <a href="'+pick+'">Pick from storage</a> </td>';
            content += '<td> <a href="'+Add+'">Add Earnings</a> </td>';
            content += '<td> <a href="'+Sell+'">Sell</a> </td>';
            content += '</tr>';
           }



        });
        $("#items1").append(content);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    
         
    document.getElementById("search-btn").onclick = function (){
      var search1 = document.getElementById('search').value;
      firebase.firestore().collection("animals")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Aml = doc.data().AnimalID;
            var Id = doc.data().ItemId;

            if(search1 == Aml){
              window.location.href = "search.html" + "?" + Aml ;
            
              search1 = "";
      
            }
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
      
   
    }



    } else {
      // User is signed out
      // ...
      window.location.href="login.html";
    }
  });