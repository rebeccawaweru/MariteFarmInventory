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
             
        firebase.firestore().collection("consumption").where("ConsType", "==", "animals").get()
        .then((querySnapshot) => {
            let consumption = 0;
            let totalconsumption = 0;
            var content = "";
            querySnapshot.forEach((doc) => {
          var ID = doc.data().ConsID;  
          var Animal = doc.data().IdAnimal;
          var Anime = doc.data().AnimalTag;
          var ProductId = doc.data().ProductId;
          var Date1 = doc.data().Date;
          var Product = doc.data().Product;
          var Cost = doc.data().Price;
          var qua = doc.data().Quantity;
          var measure = doc.data().Measure;
        consumption = parseInt(doc.data().Price);
        totalconsumption += consumption;
        document.getElementById("totalconsumption").innerHTML = totalconsumption;
        var Date3 = new Date(Date1)
            //animals
    // firebase.firestore().collection("animals").where("ItemId", "==", Animal)
    // .get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       var Id = doc.data().ItemId;
    //       var name = doc.data().Animal;
         
   

    //     //offsprings
    //     firebase.firestore().collection("offsprings").where("ItemId", "==", Animal)
    //     .get()
    //     .then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             console.log(doc.id, " => ", doc.data());
    //             var Id2 = doc.data().ItemId;
    //             var name = doc.data().Animal;
       
       
           let edit = 'EditCons.html' + '?' + ID;
     
            content+= `<tr>`;
            content+=`<td>`+ Anime + `</td>`;
            // content+=`<td>`+ name + `</td>`;
            content+=`<td>`+ Date3.toDateString() + `</td>`;
            content+=`<td>`+ Product + `</td>`;
            content+=`<td>`+ Cost + `</td>`;
            content+=`<td>`+ qua +measure + `</td>`;
            content += '<td id="edit2"> <a href="'+edit+'" >Edit</a> </td>';
            content+= `</tr>`;
            
          
      //   });
      // })
      // .catch((error) => {
      //     console.log("Error getting documents: ", error);
      // });
          
      //   });
      // })
      // .catch((error) => {
      //     console.log("Error getting documents: ", error);
      // });

      });
      
          $("#items").append(content);   
  } )
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
                
               
              firebase.firestore().collection("consumption").where("ConsType","==","animals")
              .get()
              .then((querySnapshot) => {
                let consumption = 0;
                let totalconsumption = 0;
                let today = new Date().toISOString().slice(0, 10)
                  querySnapshot.forEach((doc) => {
                      // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                 
                      var Date1 = doc.data().Date;
                      var t = doc.data().ConsType;
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
          
        document.getElementById("print").onclick = function(){
          window.print();
        }    

          

            

    } else {
        // User is signed out
        // ...
        window.location.href="index.html";
        
      }
    });