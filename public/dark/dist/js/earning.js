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
                    //collect data
      firebase.firestore().collection("users").where('UserId', '==', uid)
      .get(user)
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var Id = doc.data().UserId;
          var UserType = doc.data().UserType;
          
        if(UserType === "user"){
            document.getElementById("warn").style.display = "block";
        }else if(UserType === "admin"){
            document.getElementById("body").style.display = "block"; 
        }
         
          document.getElementById('displayname').innerHTML= doc.data().Name;
          });
          
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

            var queryString = decodeURIComponent(window.location.search);
            queryString = queryString.substring(1);
                firebase.firestore().collection("earnings").get()
                .then((querySnapshot) => {
                    var content = "";
                    let total = 0;
                    let totalearning = 0;
                    querySnapshot.forEach((doc) => {
                        var Animal = doc.data().AnimalId;
                        if(queryString == Animal){
                         // doc.data() is never undefined for query doc snapshots
                         console.log(doc.id, " => ", doc.data());
                         var Id2 = doc.data().EarnID;
                         var Tag = doc.data().AnimalID;
                         var Date1 = doc.data().Date;
                         var Product = doc.data().Produce;
                         var Quantity = doc.data().Quantity1;
                         var measure = doc.data().Measure;
                        var pp = doc.data().Pricepermeasure;
                        var earning = doc.data().Earning;
                        
                      total = parseInt(doc.data().Earning);
                      totalearning +=total;


                       

                        document.getElementById("totalearning").innerHTML = totalearning;
                        
                        window.localStorage.setItem("Earning",totalearning);

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

            let editanimal = 'EditEarning.html' + '?' + Id2;



                         content+= `<tr>`;
                         content+=`<td>`+ Tag + `</td>`;
                         content+=`<td>`+ Date1 + `</td>`;
                         content+=`<td>`+ Product + `</td>`;
                         content+=`<td>`+ Quantity + measure+ `</td>`;
                         content+=`<td>`+  pp + "ksh" + "/"+measure + `</td>`;
                         content+=`<td>`+ earning + "ksh"+ `</td>`;
                         content += '<td id="edit2"> <a href="'+editanimal+'">Edit</a> </td>';
                         
                         content+= `</tr>`;

                        
                        }
                       
                       
                    });
                   
                        $("#earnings").append(content);     
                
                } )
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            
                firebase.firestore().collection("earnings").where("AnimalId","==",queryString)
                .get()
                .then((querySnapshot) => {
                  let earn = 0;
                  let earn1 = 0;
                  let today = new Date().toISOString().slice(0, 10)
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        var Date1 = doc.data().Date;
                        if (Date1 === today){
                         earn = parseInt(doc.data().Earning);
                          earn1 += earn;
                      document.getElementById("todayearning").innerHTML = earn1;
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