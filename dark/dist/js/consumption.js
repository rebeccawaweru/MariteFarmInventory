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
  var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  window.localStorage.setItem("Animalid",queryString);

              firebase.firestore().collection("animals").get()
              .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      var Anim = doc.data().AnimalID;
                      var Id = doc.data().ItemId;

              
                firebase.firestore().collection("consumption").where("IdAnimal", "==", queryString).get()
                .then((querySnapshot) => {
                  let consumption = 0;
                  let totalconsumption = 0;
                    var content = "";
                    querySnapshot.forEach((doc) => {
                    
                           var Animal = doc.data().IdAnimal;
                      if(Id === queryString){
                       
                         // doc.data() is never undefined for query doc snapshots
                         console.log(doc.id, " => ", doc.data());
                         var ProductId = doc.data().ProductId;
                         var Date1 = doc.data().Date;
                         var Product = doc.data().Product;
                         var Cost = doc.data().Price;
                         var qua = doc.data().Quantity;
                         var measure = doc.data().Measure;
                        var Timestamp = doc.data().Time;
                  
                        let today = new Date().toISOString().slice(0, 10)
                        
                         consumption = parseInt(doc.data().Price);
                        totalconsumption += consumption;
                       
                  //   var consRef = firebase.firestore().collection('consumption').doc(queryString);
                  //   return consRef.update({
                  //    TotalCons: totalconsumption
                  //   })
                  //  .then(() => {
                  //      console.log("Document successfully written!");
                  //  //    window.setTimeout(()=>{location.reload()},3000) ;
                 
         
                  //  })
                  //  .catch((error) => {
                  //      console.error("Error writing document: ", error);
                  //  });

                                document.getElementById("totalconsumption").innerHTML = totalconsumption;
                           
                            
                            
          //get today's date        
          // // Here are the two dates to compare
          // var date1 = Date1;
          // var date2 = today;
          // // First we split the values to arrays date1[0] is the year, [1] the month and [2] the day
          // date1 = date1.split('-');
          // date2 = date2.split('-');
          // // Now we convert the array to a Date object, which has several helpful methods
          // date1 = new Date(date1[0], date1[1], date1[2]);
          // date2 = new Date(date2[0], date2[1], date2[2]);
          // // We use the getTime() method and get the unixtime (in milliseconds, but we want seconds, therefore we divide it through 1000)
          // date1_unixtime = parseInt(date1.getTime() / 1000);
          // date2_unixtime = parseInt(date2.getTime() / 1000);
          // // This is the calculated difference in seconds
          // var timeDifference = date2_unixtime - date1_unixtime;
          // // in Hours
          // var timeDifferenceInHours = timeDifference / 60 / 60;
          // // and finaly, in days :)
          // var timeDifferenceInDays = timeDifferenceInHours  / 24;
          // console.log(timeDifferenceInDays);
          // if(timeDifferenceInDays === 7){
          //   var weeklyconsumption = totalconsumption * 7;
          //   document.getElementById("weeklyconsumption").innerHTML = weeklyconsumption;
          // }else{
          //   document.getElementById("weeklyconsumption").innerHTML = "---";
          // }
          // if(timeDifferenceInDays === 30){
          //   var monthlyconsumption = totalconsumption * 30;
          //   document.getElementById("monthlyconsumption").innerHTML=monthlyconsumption;
          // }else{
          //   document.getElementById("monthlyconsumption").innerHTML = "---";
          // }
            //END OF GETTING NUMBER OF DAYS
                        

                       
                          content+= `<tr>`;
                          content+=`<td>`+ Anim + `</td>`;
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
          
             
              firebase.firestore().collection("consumption").where("IdAnimal", "==", queryString)
              .get()
              .then((querySnapshot) => {
              
                let today = new Date().toISOString().slice(0, 10);

                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                   console.log(today)
                      var Date1 = doc.data().Date;
                      
                      var Animal = doc.data().IdAnimal;

                      let consumption = 0;
                      let totalconsumption = 0;
                   
                      let Day = new Date().getDay();
                      let today2 = new Date().getDate();
                      console.log(today2);
                      var Sunday = today2 - Day ;
                      console.log(Sunday);
                      var DD = new Date().getMonth();
                      var DD2 = parseInt(DD);
                      var One = 1 + DD2;
                      var zero = 0;
                      var SundayFullDate = new Date().getFullYear() + "-" +  zero + One + "-" + Sunday ;
                      console.log(SundayFullDate);
                    var End = Sunday + 6 ;
                    console.log(End)
                      console.log(Day);
                       if (End > 30){
                         var EndDate = End - 30 ;
                        //  var EndDate2 = new Date().getFullYear() + "-"+new Date().getMonth() + "-" + EndDate ;
                          var Month = DD2 + 2 ;
                          console.log(Month);
                          var Full = new Date().getFullYear() + "-"+Month + "-" + EndDate ;
                          console.log(Full);
                       } 
                        
                         var One2 = One -30 ;
                         var Monday = Sunday + 1;
                         console.log(Monday);
                         var MondayFullDate = new Date().getFullYear() + "-"+ zero + One+ "-" + Monday ;
                         console.log(MondayFullDate)
                         var Tuesday = Sunday + 2;
                         console.log (Tuesday);
                         var TuesdayFullDate = new Date().getFullYear() + "-"+ zero + One+ "-" + Tuesday ;
                         console.log(TuesdayFullDate);
                         var Wednesday = Sunday + 3;
                         console.log (Wednesday);
                         var WednesdayFullDate = new Date().getFullYear() + "-"+ zero + One+ "-" + Wednesday ;
                         console.log(WednesdayFullDate);
                         var finalWednesday = WednesdayFullDate+ "";
                         
                         var Thursday = Sunday + 4;
                         console.log (Thursday);
                         var ThursdayFullDate = new Date().getFullYear() + "-"+ zero + One+ "-" + Thursday ;
                         console.log(ThursdayFullDate);
                         var Friday = Sunday + 5;
                         console.log (Thursday);
                         var FridayFullDate = new Date().getFullYear() + "-"+ zero + One+ "-" + Friday ; 
                         console.log(FridayFullDate);
                         var Saturday = Sunday + 6;
                         var SaturdayFullDate = new Date().getFullYear() + "-"+ zero + One+ "-" + Saturday;
                         console.log(SaturdayFullDate);
                         
                         console.log(doc.data());
                         console.log(TuesdayFullDate === doc.data().Date);
                         let array1  = 0;
                         let array2 = 0;
                         let array3 = 0;

                      if (Date1 === today){
                        consumption = parseInt(doc.data().Price);
                        totalconsumption += consumption;
                        document.getElementById("todayconsumption").innerHTML = totalconsumption;

                      }

                     if (Date1 == MondayFullDate){
                       var MondayConsumption = parseInt(doc.data().Price);
                         array1 += MondayConsumption;
                         console.log(MondayConsumption)
                        // array1.push(MondayConsumption);
                      }else{
                           MondayConsumption = 0;
                      } if(Date1 === TuesdayFullDate){
                        var TuesdayConsumption = parseInt(doc.data().Price);
                         array2 += TuesdayConsumption;
                        console.log(TuesdayConsumption);
                        // array1.push(TuesdayConsumption);
                      }else{
                        TuesdayConsumption = 0;
                      }
                       if(Date1 == WednesdayFullDate){
                        var WednesdayConsumption = parseInt(doc.data().Price);
                        array3 = WednesdayConsumption;
                            console.log(WednesdayConsumption);
                            array2 +=WednesdayConsumption;
                            // array1.push(WednesdayConsumption);
                      }else{
                        WednesdayConsumption = 0;
                      }
                      if(Date1 === ThursdayFullDate){
                        var ThursdayConsumption = parseInt(doc.data().Price);
                          WednesdayConsumption = 0;
                       }else if(Date1 === FridayFullDate){
                        var FridayConsumption = parseInt(doc.data().Price);
                        ThursdayConsumption = 0;
                        WednesdayConsumption = 0;
                      }else if(Date1 === SaturdayFullDate){
                        var SaturdayConsumption = parseInt(doc.data().Price);
                        FridayConsumption = 0;
                        WednesdayConsumption = 0;
                      }else{
                        SaturdayConsumption = 0;
                        WednesdayConsumption = 0;
                      }

                      let weeklyconsumption=0;
                      let week = 0;
                      let week1 = 0;
                      let week3 = 0;
                      let week4 = 0;
                      let week5 = 0;
                      week1 += parseInt(MondayConsumption);
                    
                      week += parseInt(TuesdayConsumption);
                 
                      week3 += parseInt(WednesdayConsumption);
                     let array=[week1, week, week3]
                      week4 = week3;
                      week5 = week1 + week;
                      let week6 = 0;
                      week6 = week5 + week3;
                      
                      // week += ThursdayConsumption;
                      // week += FridayConsumption;
                      // week += SaturdayConsumption;
                      console.log(WednesdayConsumption);
                      weeklyconsumption += week;
                 
                      console.log(array);
                      console.log(array3)
                      console.log(array3+array2);

                    
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