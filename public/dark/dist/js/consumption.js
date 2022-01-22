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

 

              // firebase.firestore().collection("allanimals").get()
              // .then((querySnapshot) => {
              //     querySnapshot.forEach((doc) => {
              //         // doc.data() is never undefined for query doc snapshots
              //         console.log(doc.id, " => ", doc.data());
              //         var Anim = doc.data().AnimalID;
              //         var Id = doc.data().ItemId;


              
                firebase.firestore().collection("consumption").where("IdAnimal", "==", queryString).get()
                .then((querySnapshot) => {
                  let consumption = 0;
                  let totalconsumption = 0;
                    var content = "";
                    querySnapshot.forEach((doc) => {
                      var ID = doc.data().ConsID;
                        var Tag = doc.data().AnimalTag;
                           var Animal = doc.data().IdAnimal;
                         var ProductId = doc.data().ProductId;
                         var Date1 = doc.data().Date;
                         var Product = doc.data().Product;
                         var Cost = doc.data().Price;
                         var qua = doc.data().Quantity;
                         var measure = doc.data().Measure;
                         var description = doc.data().Description;
                        var Timestamp = doc.data().Time;
                        var Date3 = new Date(Date1)
                        let today = new Date().toISOString().slice(0, 10)
                        
                         consumption = parseInt(doc.data().Price);
                        totalconsumption += consumption;
                       
                        document.getElementById("totalconsumption").innerHTML = totalconsumption;
                        // if(Animal === queryString){
                       
                        
                      // }
                      let edit = 'EditCons.html' + '?' + ID;

                      content+= `<tr>`;
                      content+=`<td>`+ Tag + `</td>`;
                      content+=`<td>`+ Date3.toDateString() + `</td>`;
                      content+=`<td>`+ Product + `</td>`;
                      content+=`<td>`+ Cost + `</td>`;
                     
                      content+=`<td>`+ qua +measure + `</td>`;
                      content+=`<td>`+ description + `</td>`;
                      content += '<td id="edit2"> <a href="'+edit+'" >Edit</a> </td>';
                      content+= `</tr>`;
                    });
                   
                   
                        $("#items").append(content);     
                  
                } )
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        
            // });  
            //   })
            //   .catch((error) => {
            //       console.log("Error getting documents: ", error);
            //   });
          
             
              firebase.firestore().collection("consumption").where("IdAnimal", "==", queryString)
              .get()
              .then((querySnapshot) => {
                let consumption = 0;
                let totalconsumption = 0;
                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                  
                    let today = new Date().toISOString().slice(0, 10);
                      var Date1 = doc.data().Date;
                      var Animal = doc.data().IdAnimal;
                
                      if (Date1 === today){
                        consumption = parseInt(doc.data().Price);
                        totalconsumption += consumption;
                        document.getElementById("todayconsumption").innerHTML = totalconsumption;
                        console.log(totalconsumption);
                      }
                   
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
      window.location.href="index.html";
      
    }
  });