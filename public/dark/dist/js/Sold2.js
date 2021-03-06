
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

    firebase.firestore().collection("users").where('UserId', '==', uid)
    .get(user)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
      var Id = doc.data().UserId;
      var UserType = doc.data().UserType; 
      var email = doc.data().Email;

       if(UserType === "admin" && email === "maritepltd@gmail.com"){
          document.getElementById("body").style.display = "block"; 
       
      }
       
        });
        
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });



    
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
             var weight = doc.data().InitialWeight;
             var weight2 = doc.data().FinalWeight;
             var Price = doc.data().Price2;
             var Date1 = doc.data().DateSold;
             var Date2 = doc.data().DateAcquired;
             var Date3 = new Date(Date1);
             var Date4 = new Date(Date2);
             var PP = doc.data().Pricekg;
             var Sell = doc.data().SellingPrice;
             var Id = doc.data().SoldId;
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
    
                   earnings = parseInt(doc.data().Earning);
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
            let expense = 0;
            let totalexpense = 0;
            expense = parseInt(doc.data().Price2)+ totalconsumption;
            totalexpense += expense;
            total = parseInt(doc.data().SellingPrice) + totalearnings;
            total1 += total;
             
            if(total1 > totalexpense){
                var profit = total1 - totalexpense;
                var percent =  profit/totalexpense * 100
                var percent1 = Math.round(percent * 10)/10;
                var p = "+";
                console.log(percent1);
            }else if (totalexpense > total1){
                var profit = totalexpense - total1;
                var percent =  profit/totalexpense * 100
                var percent1 = Math.round(percent * 10)/10;
                var p = "-";
            }

            let editanimal = 'EditSold.html' + '?' + Id;

            content+= `<tr>`;
            content+=`<td>`+ Animal + `</td>`;
            content+=`<td>`+ Name + `</td>`;
            content+=`<td>`+ weight + "kg"+ `</td>`;
            content+=`<td>`+ weight2 + "kg"+ `</td>`;
            content+=`<td>`+ Price + `</td>`;
            content+=`<td>`+ totalconsumption + `</td>`;
        
            content+=`<td>`+ totalearnings + `</td>`;
            content+=`<td>`+ Date4.toDateString() + `</td>`;
            content+=`<td>`+ Date3.toDateString() + `</td>`;
            content+=`<td>`+ Math.round(PP*10)/10 +"ksh"+ "/"+"kg"+ `</td>`;
            content+=`<td>`+ Sell + `</td>`;
            content+=`<td id="edit2">`+ total1 + `</td>`;
            content+=`<td id="ex">`+ totalexpense + `</td>`;
            content+=`<td>`+ p + percent1 + "%" + `</td>`;
            content += '<td id="edit2"> <a href="'+editanimal+'">Edit</a> </td>';
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




    document.getElementById("print").onclick = function(){
        window.print();
    }
    document.getElementById("sale").onclick = function(){
        window.location.href = "Sale.html";
    }

    
      
    


} else {
// User is signed out
// ...
window.location.href="index.html";

}
});