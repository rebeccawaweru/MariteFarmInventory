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
                         
                               var Id = doc.data().UserId;
                               var UserType = doc.data().UserType; 
                               var email = doc.data().Email;
                               if(UserType === "user"){
                                   document.getElementById("warn").style.display = "block";
                         
                               }else if(UserType === "admin" && email === "maritepltd@gmail.com"){
                                   document.getElementById("body").style.display = "block"; 
                               }else{
                                 document.getElementById("warn").style.display = "block"; 
                               }
                                
                                 });
                                 
                             })
                             .catch((error) => {
                                 console.log("Error getting documents: ", error);
                             });

                firebase.firestore().collection("earnings").get()
                .then((querySnapshot) => {
                    var content = "";
                    let total = 0;
                    let totalearning = 0;
                    querySnapshot.forEach((doc) => {
                        var Animal = doc.data().AnimalId;
                      
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
                        var Date3 = new Date(Date1);
                      total = parseInt(doc.data().Earning);
                      totalearning +=total;


                  

                        document.getElementById("totalearning").innerHTML = totalearning;
                        
                        window.localStorage.setItem("Earning",totalearning);

                               




                         content+= `<tr>`;
                         content+=`<td>`+ Tag + `</td>`;
                         content+=`<td>`+ Date3.toDateString() + `</td>`;
                         content+=`<td>`+ Product + `</td>`;
                         content+=`<td>`+ Quantity + measure+ `</td>`;
                         content+=`<td>`+  pp + "ksh" + "/"+measure + `</td>`;
                         content+=`<td>`+ earning + "ksh"+ `</td>`;
                       
                         
                         content+= `</tr>`;

                        
                        
                       
                       
                    });
                   
                        $("#earnings").append(content);     
                
                } )
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            
                firebase.firestore().collection("earnings")
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