
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
    
                firebase.firestore().collection("Deaths").get()
                .then((querySnapshot) => {
                    let total2 = 0;
                    let total3 = 0;
                  querySnapshot.forEach((doc) => {
             
                 // doc.data() is never undefined for query doc snapshots
                 console.log(doc.id, " => ", doc.data());
                 var Animal2 = doc.data().AnimalId;
                 var Animal = doc.data().AnimalTag;
                 var Name = doc.data().AnimalName;
                 var Price = doc.data().InitalCost;
                 var Date1 = doc.data().DateofDeath;
                 var cause = doc.data().CauseofDeath;
                var weight = doc.data().InitialWeight;
                var currentweight = doc.data().CurrentWeight;
                
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
                expense = parseInt(doc.data().InitalCost)+ totalconsumption;
                totalexpense += expense;
                total = totalearnings;
                total1 += total;
                 var Date3 = new Date(Date1);

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
    
                content+= `<tr>`;
                content+=`<td>`+ Animal + `</td>`;
                content+=`<td>`+ Name + `</td>`;
                content+=`<td>`+ weight + "kg" + `</td>`;
                content+=`<td>`+ currentweight + "kg" + `</td>`;
                content+=`<td>`+ Price + `</td>`;
                content+=`<td>`+ totalconsumption + `</td>`;
                content+=`<td>`+ totalearnings + `</td>`;

                content+=`<td>`+ Date3.toDateString() + `</td>`;
                content+=`<td>`+ cause + `</td>`;
                content+=`<td id="edit2">`+ total1 + `</td>`;
                content+=`<td id="ex">`+ totalexpense + `</td>`;
                content+=`<td>`+ p + percent1 + "%" + `</td>`;
                content+= `</tr>`;
             
            $("#sold").append(content);   
    
             })
             .catch((error) => {
                 console.log("Error getting documents: ", error);
             });
        
         
            });
            
        })
            
         
    
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