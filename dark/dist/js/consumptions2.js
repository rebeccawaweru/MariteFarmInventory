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
                //    document.getElementById('add').onclick = ()=>{
                //     window.location.href = "Addcons.html"  ;
   
                // };
             
                firebase.firestore().collection("animals").get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        var Anime = doc.data().Animal;
                        var Id = doc.data().ItemId;

                        firebase.firestore().collection("consumption").get()
                        .then((querySnapshot) => {
                            let consumption = 0;
                            let totalconsumption = 0;
                            var content = "";
                            querySnapshot.forEach((doc) => {
                               
                          
                                 // doc.data() is never undefined for query doc snapshots
                                 console.log(doc.id, " => ", doc.data());
                           
                                 var Animal = doc.data().IdAnimal;
                                 var ProductId = doc.data().ProductId;
                                 var Date1 = doc.data().Date;
                                 var Product = doc.data().Product;
                                 var Cost = doc.data().Price;
                                 var qua = doc.data().Quantity;
                                 var measure = doc.data().Measure;
                                consumption = parseInt(doc.data().Price);
                                totalconsumption += consumption;
                         
                                document.getElementById("totalconsumption").innerHTML = totalconsumption;
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
          if(timeDifferenceInDays === 7){
            var weeklyconsumption = totalconsumption * 7;
            document.getElementById("weeklyconsumption").innerHTML = weeklyconsumption;
          }else{
            document.getElementById("weeklyconsumption").innerHTML = "---";
          }
          if(timeDifferenceInDays === 30){
            var monthlyconsumption = totalconsumption * 30;
            document.getElementById("monthlyconsumption").innerHTML=monthlyconsumption;
          }else{
            document.getElementById("monthlyconsumption").innerHTML = "---";
          }
            //END OF GETTING NUMBER OF DAYS

                                if(Id == Animal){
                                  content+= `<tr>`;
                                  content+=`<td>`+ Anime + `</td>`;
                                  content+=`<td>`+ ProductId + `</td>`;
                                  content+=`<td>`+ Date1 + `</td>`;
                                  content+=`<td>`+ Product + `</td>`;
                                  content+=`<td>`+ Cost + `</td>`;
                                  content+=`<td>`+ qua +measure + `</td>`;
                                  content+= `</tr>`;
                                }
                               
                            });
                           
                                $("#items").append(content);     
                        
                        } )
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                    });

                   
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            
               
              firebase.firestore().collection("consumption")
              .get()
              .then((querySnapshot) => {
                let consumption = 0;
                let totalconsumption = 0;
                let today = new Date().toISOString().slice(0, 10)
                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                 
                      var Date1 = doc.data().Date;

                      if (Date1 === today){
                        consumption = parseInt(doc.data().Price);
                        totalconsumption += consumption;
                        document.getElementById("todayconsumption").innerHTML = totalconsumption;
                      }
                    
                  });
              })
              .catch((error) => {
                  console.log("Error getting documents: ", error);
              });
          
            

          

            

    } else {
        // User is signed out
        // ...
        window.location.href="login.html";
        
      }
    });