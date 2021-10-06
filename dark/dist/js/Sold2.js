
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

// document.getElementById('print').onclick = function(){
//     printJS({
//         printable: 'print',
//         type: 'pdf',
//         targetStyles: ['*'],
//         header: 'PrintJS - Print Form With Customized Header'
//      })
// }



    
// firebase.firestore().collection("earnings")
// .get()
// .then((querySnapshot) => {
//     let earnings = 0;
//     let totalearnings = 0;
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data
//         ());
//         earnings = parseInt(doc.data().Earn);
//         totalearnings += earnings; 
        
        
    
//     });




            


 



            
            firebase.firestore().collection("sold").get()
            .then((querySnapshot) => {
                let total2 = 0;
                let total3 = 0;
              querySnapshot.forEach((doc) => {
         
             // doc.data() is never undefined for query doc snapshots
             console.log(doc.id, " => ", doc.data());
             var Animal2 = doc.data().IdAnimal;
             var Animal = doc.data().AnimalID;
             var Name = doc.data().AnimalName;
             var Price = doc.data().Price2;
             var Date1 = doc.data().DateSold;
             var Sell = doc.data().SellingPrice;
             total2 = parseInt(doc.data().SellingPrice);
              total3 += total2;
             document.getElementById('sales').innerHTML = total3;

            //  var d = new Date();
            //  var month = new Array();
            //  month[0] = "January";
            //  month[1] = "February";
            //  month[2] = "March";
            //  month[3] = "April";
            //  month[4] = "May";
            //  month[5] = "June";
            //  month[6] = "July";
            //  month[7] = "August";
            //  month[8] = "September";
            //  month[9] = "October";
            //  month[10] = "November";
            //  month[11] = "December";
            //  var n = month[d.getMonth()];
            // console.log(n);
             
             document.getElementById("no").innerHTML = querySnapshot.docs.length;
             firebase.firestore().collection("earnings").where("AnimalId", "==", Animal2).get().then((querySnapshot) => {
                let earnings = 0;
                let totalearnings = 0;
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
    
                   earnings = parseInt(doc.data().Earn);
          
                   totalearnings += earnings;
               
                });
            


             firebase.firestore().collection("consumption").where("IdAnimal", "==", Animal2)
             .get()
             .then((querySnapshot) => {
                 var content = "";

                 let consumption = 0;
                 let totalconsumption = 0;
                 querySnapshot.forEach((doc) => {
                     // doc.data() is never undefined for query doc snapshots
                  
                     var Id = doc.data().IdAnimal;
              
                     consumption = parseInt(doc.data().Price);
                     totalconsumption += consumption;

            
            
            });
           
            let total = 0;
            let total1 = 0;
          
            total = parseInt(doc.data().SellingPrice) + totalearnings;
            total1 += total;


            content+= `<tr>`;
            content+=`<td>`+ Animal + `</td>`;
            content+=`<td>`+ Name + `</td>`;
            content+=`<td>`+ Price + `</td>`;
            content+=`<td>`+ totalconsumption + `</td>`;
            content+=`<td>`+ totalearnings + `</td>`;
            content+=`<td>`+ Date1 + `</td>`;
            content+=`<td>`+ Sell + `</td>`;
            content+=`<td>`+ total1 + `</td>`;
            content+= `</tr>`;
   

        //  consumption = parseInt(doc.data().Price);
        //  totalconsumption += consumption;  
              
        $("#sold").append(content);   
       
         
       
    


         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
    
     
        });
        
    })
    // .catch((error) => {
    //     console.log("Error getting documents: ", error);
    // });
     

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