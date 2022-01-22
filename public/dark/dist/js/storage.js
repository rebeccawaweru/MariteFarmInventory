firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...

           //collect data
           firebase.firestore().collection("users").where('UserId', '==', uid)
           .get(user)
           .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                   // doc.data() is never undefined for query doc snapshots
             console.log(doc.id, " => ", doc.data());
             var Id = doc.data().UserId;
             document.getElementById('displayname').innerHTML= doc.data().Name;
     
               });
           })
           .catch((error) => {
               console.log("Error getting documents: ", error);
           });


      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);

      window.localStorage.setItem("Animalid",queryString);

    firebase.firestore().collection("goods").get()
    .then((querySnapshot) => {
        var content = '';
        let expenditure = 0;
        let totalexpenditure = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
         
            var ItemId = doc.data(). ItemId;
            var ItemName = doc.data().name;
            var Date1 = doc.data().Date;
            var Purpose  =  doc.data().Use;
            var Remark = doc.data().Comment;
            var Measurement = doc.data().Measure;
            var Quantity1 = doc.data().Quantity;

            var Quantity2 = doc.data().QuantityI;//original
            var Price = doc.data().Price;
            var PP = Price/Quantity2;

            size = querySnapshot.docs.length;
            // document.getElementById('NoItems').innerHTML = size;
            expenditure = parseInt(doc.data().Price);
            totalexpenditure += expenditure;
            document.getElementById("totalexpenditure").innerHTML = totalexpenditure;
            // let today = new Date().toISOString().slice(0, 10);
            // if (Date1 === today){
            //   expenditure = parseInt(doc.data().Price);
            //   totalexpenditure += expenditure;
            //   document.getElementById("todayexpenditure").innerHTML = totalexpenditure;
            
            // }
        
       

            let edit = 'editgood.html'+ '?'+ ItemId;
            let use = 'Addcons2.html' + '?'+ ItemId ;
             
            
          
            if (Quantity1 > 0 ){
             //GETTING NO OF DAYS.

          let today = new Date().toISOString().slice(0, 10)
                              
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
         
         
            //END OF GETTING NUMBER OF DAYS
              content += '<tr>';
              // content += '<td>' + ItemId+ '</td>';
              content += '<td>' + ItemName + '</td>';
              content += '<td>' + Date1 + '</td>';
              content += '<td>' + Remark + '</td>';
              content += '<td>' + Quantity2 + '</td>';
              content += '<td>' + Quantity1 + Measurement + '</td>';
           
              content += '<td>' + PP + "/" + Measurement +  '</td>';
              content += '<td>' + Price + '</td>';
              content += '<td id="edit2"> <a href="'+ edit +'">Edit</a> </td>';
              content += '<td id="edit2"> <a href="'+ use +'">Use</a> </td>';
              content += '</tr>';
            }else {

            }
          

        });
        $("#items").append(content);

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
    firebase.firestore().collection("goods")
              .get()
              .then((querySnapshot) => {
                let expenditure = 0;
                let totalexpenditure = 0;
                let today = new Date().toISOString().slice(0, 10)
                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                 
                      var Date1 = doc.data().Date;

                      if (Date1 === today){
                        expenditure = parseInt(doc.data().Price);
                        totalexpenditure += expenditure;
                        // document.getElementById("todayexpenditure").innerHTML = totalexpenditure;
                      }
                    
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