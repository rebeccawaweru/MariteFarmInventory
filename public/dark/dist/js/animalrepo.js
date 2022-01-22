firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...

        //logout
        document.getElementById('logout').onclick = ()=>{
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                window.location.href="login.html";
              }).catch((error) => {
                // An error happened.
              });
           }
    document.getElementById("print").onclick = function(){
        window.print();
    }

    firebase.firestore().collection("allanimals").where("Animal", "==", "Cow")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        document.getElementById("cows").innerHTML = querySnapshot.docs.length;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    firebase.firestore().collection("allanimals").where("Animal", "==", "Goat")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        document.getElementById("goats").innerHTML = querySnapshot.docs.length;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    firebase.firestore().collection("allanimals").where("Animal", "==", "Sheep")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        document.getElementById("sheep").innerHTML = querySnapshot.docs.length;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    firebase.firestore().collection("allanimals").where("Animal", "==", "Chicken")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        document.getElementById("chicken").innerHTML = querySnapshot.docs.length;
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    firebase.firestore().collection("consumption")
    .get()
    .then((querySnapshot) => {
        let x = 0;
        let x1 = 0;
        querySnapshot.forEach((doc) => {
            var type = doc.data().ConsType;
            if(type === "animals"){
                x = parseInt(doc.data().Price);
                x1 += x;
                console.log(x1);
            }
        });
        firebase.firestore().collection("allanimals")
        .get()
        .then((querySnapshot) => {
            let y = 0;
            let y1 = 0;
            querySnapshot.forEach((doc) => {
                y = parseInt(doc.data().InitialCost);
                y1 += y;
                console.log(y1);
            
                });
                    firebase.firestore().collection("earnings")
                    .get()
                    .then((querySnapshot) => {
                        let e = 0;
                        let e1 = 0;
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            e = parseInt(doc.data().Earning);
                           e1 += e;
                            console.log(e1);
                         
                        });
                            //sold
                           firebase.firestore().collection("sold")
                                .get()
                                .then((querySnapshot) => {
                                    let sold = 0;
                                    let sold1 = 0;
                                    querySnapshot.forEach((doc) => {
                                      sold = parseInt(doc.data().SellingPrice);
                                      sold1 += sold;
                                      console.log(sold1);
                                    });
                                    //sales
                                    firebase.firestore().collection("sales")
                                    .get()
                                    .then((querySnapshot) => {
                                        let sale = 0;
                                        let sale1 = 0;
                                        querySnapshot.forEach((doc) => {
                                          sale = parseInt(doc.data().Price);
                                         sale1 += sale;
                                       
                                         var all = y1+x1;
                                         document.getElementById("expensetotal").innerHTML = all;
                                          var income = sale1 + sold1 + e1;
                                          document.getElementById("earningtotal").innerHTML = income ; 
                            if(all > income){
                                document.getElementById("profitloss").innerHTML = all-income ; 
                                document.getElementById("r").innerHTML = "Loss(-):"
                                document.getElementById("profitloss").style.color = "red"
                                document.getElementById("ll").style.color = "red"
                                var diff = all-income;
                                var diff1 = diff/all * 100
                                var percent = Math.round(diff1 * 10)/10;
                                document.getElementById("arr").style.display ="block";
                                document.getElementById("arr1").style.display ="none";
                                document.getElementById("pp").innerHTML = percent + "%";

                            }else if(income>all){
                                document.getElementById("profitloss").innerHTML = income-all ; 
                                document.getElementById("r").innerHTML = "Profit(+)"
                                document.getElementById("profitloss").style.color = "yellow"
                                document.getElementById("ll").style.color = "yellow"
                                var diff = income-all;
                                var diff1 = diff/all * 100
                                var percent = Math.round(diff1 * 10)/10;
                                document.getElementById("arr").style.display ="none";
                                document.getElementById("arr1").style.display ="block";
                                document.getElementById("pp").innerHTML = percent + "%";
                            }
                                        });
                                    })
                                    .catch((error) => {
                                        console.log("Error getting documents: ", error);
                                    });
                                })
                                .catch((error) => {
                                    console.log("Error getting documents: ", error);
                                });

                            })
                            .catch((error) => {
                                console.log("Error getting documents: ", error);
                            });
                   
                       


                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
              
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

   //Jan
   document.getElementById("jan").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "January" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "January"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
         //earning
    firebase.firestore().collection("earnings")
    .get()
    .then((querySnapshot) => {
        let earn = 0;
        let earn1 = 0;
        let diff = 0;
        let diff2 = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            var month2 = doc.data().Month;
            if(month2 === "January"){
                earn = doc.data().Earning;
                earn1 += earn;
            }
    });
       firebase.firestore().collection("sold")
        .get()
        .then((querySnapshot) => {
            let sold = 0;
            let sold1 = 0;
            querySnapshot.forEach((doc) => {
                var m = doc.data().Month;
                if(m === "January"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
      firebase.firestore().collection("sales")
        .get()
        .then((querySnapshot) => {
            let sale = 0;
            let sale1 = 0;
            querySnapshot.forEach((doc) => {
                var m1 = doc.data().Month;
                if(m1 === "January"){
                    sale = parseInt(doc.data().Price);
                    sale1 += sale;
                }
                var income = earn1 + sold1 + sale1;
                   var final = cons2 + b2;
        console.log(final)
                console.log(income);
        if(final > income){
        diff = final - income;
        var percent =  diff/final * 100
        var percent1 = Math.round(percent * 10)/10;
        var a = "-";
    }else if(income > final){
        diff = income-final
        var percent =  diff/final * 100
        var percent1 = Math.round(percent * 10)/10;
        var a = "+";
    }
    content += '<tr>';
    content += '<td>' + "January" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
   
            });
            $("#items1").append(content);
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        })
.catch((error) => {
    console.log("Error getting documents: ", error);
});

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


})
.catch((error) => {
    console.log("Error getting documents: ", error);
});
})
.catch((error) => {
    console.log("Error getting documents: ", error);
});
};

//feb
document.getElementById("feb").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "February" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
       //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "February"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "February"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "February"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "February"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "February" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//march
document.getElementById("march").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "March" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
       //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "March"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "March"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "March"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "March"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "March" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//april
document.getElementById("april").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "April" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
       //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "April"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "April"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "April"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "April"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "April" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//may
document.getElementById("may").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "May" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
     //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "May"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "May"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "May"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "May"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "May" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//june
document.getElementById("june").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "June" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
      //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "June"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "June"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "June"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "June"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "June" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//july
document.getElementById("july").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "July" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
     //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "July"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "July"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "July"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "July"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "July" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//august
document.getElementById("august").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "August" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
     //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "August"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "August"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "August"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "August"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "August" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//sep
document.getElementById("sep").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "September" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
     //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "September"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "September"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "September"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "September"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "September" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//oct
document.getElementById("oct").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "October" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
      //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "October"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "October"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "October"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "October"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "October" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//nov
document.getElementById("nov").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "November" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
     //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "November"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "November"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "November"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "November"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "November" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end

//dec
document.getElementById("dec").onclick = function(){
    this.disabled = true;
   firebase.firestore().collection("consumption").get()
   .then((querySnapshot) => {
        var content = '';
    let cons = 0;
    let cons2 = 0;
    querySnapshot.forEach((doc) => {
        var month1 = doc.data().Month;
        var type = doc.data().ConsType;
        if(month1 === "December" && type === "animals"){ 
        cons = parseInt(doc.data().Price);
        cons2 += cons;
        }
        console.log(cons2)
    });
     //allanimals
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
         var content = '';
     let b = 0;
     let b2 = 0;
     querySnapshot.forEach((doc) => {
         var Date3 = doc.data().Date;
         const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
         const d = new Date(Date3);
         var name1 = month[d.getMonth()];
         if(name1 === "December"){ 
         b = parseInt(doc.data().InitialCost);
        b2 += b;
         }
     });
          //earning
     firebase.firestore().collection("earnings")
     .get()
     .then((querySnapshot) => {
         let earn = 0;
         let earn1 = 0;
         let diff = 0;
         let diff2 = 0;
         querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
             // console.log(doc.id, " => ", doc.data());
             var month2 = doc.data().Month;
             if(month2 === "December"){
                 earn = doc.data().Earning;
                 earn1 += earn;
             }
     });
        firebase.firestore().collection("sold")
         .get()
         .then((querySnapshot) => {
             let sold = 0;
             let sold1 = 0;
             querySnapshot.forEach((doc) => {
                 var m = doc.data().Month;
                 if(m === "December"){
                     sold = parseInt(doc.data().SellingPrice);
                     sold1 += sold;
                 }
             });
       firebase.firestore().collection("sales")
         .get()
         .then((querySnapshot) => {
             let sale = 0;
             let sale1 = 0;
             querySnapshot.forEach((doc) => {
                 var m1 = doc.data().Month;
                 if(m1 === "December"){
                     sale = parseInt(doc.data().Price);
                     sale1 += sale;
                 }
                 var income = earn1 + sold1 + sale1;
                    var final = cons2 + b2;
         console.log(final)
                 console.log(income);
         if(final > income){
         diff = final - income;
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "-";
     }else if(income > final){
         diff = income-final
         var percent =  diff/final * 100
         var percent1 = Math.round(percent * 10)/10;
         var a = "+";
     }
     content += '<tr>';
     content += '<td>' + "December" + '</td>';
     content+=`<td id="ex">`+ final + `</td>`;
    content += '<td id="edit2">' + income + '</td>';
     content += '<td>'+ a+ diff + '</td>';
     content += '<td>'+ a+ percent1 + "%"+ '</td>';
     content += '</tr>';
    
             });
             $("#items1").append(content);
         })
         .catch((error) => {
             console.log("Error getting documents: ", error);
         });
         })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 
     })
     .catch((error) => {
         console.log("Error getting documents: ", error);
     });
 
 
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 })
 .catch((error) => {
     console.log("Error getting documents: ", error);
 });
 };
//end
    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
    }
  });