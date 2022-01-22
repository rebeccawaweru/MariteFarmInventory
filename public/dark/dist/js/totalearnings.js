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
   
                // }

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
                        
                      total = parseInt(doc.data().Earning);
                      totalearning +=total;


                  

                        document.getElementById("totalearning").innerHTML = totalearning;
                        
                        window.localStorage.setItem("Earning",totalearning);

                               




                         content+= `<tr>`;
                         content+=`<td>`+ Tag + `</td>`;
                         content+=`<td>`+ Date1 + `</td>`;
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
            
          
            

          

            

    } else {
        // User is signed out
        // ...
        window.location.href="index.html";
        
      }
    });