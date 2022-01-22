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

    firebase.firestore().collection("consumption")
    .get()
    .then((querySnapshot) => {
        let x = 0;
        let x1 = 0;
        querySnapshot.forEach((doc) => {
            var type = doc.data().AnimalType;
            if(type === "Dairy"){
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
                var type = doc.data().AnimalType;
                if(type === "Dairy"){
                    y = parseInt(doc.data().InitialCost);
                    y1 += y;
                    console.log(y1);
                }
                });
                    firebase.firestore().collection("earnings")
                    .get()
                    .then((querySnapshot) => {
                        let e = 0;
                        let e1 = 0;
                        querySnapshot.forEach((doc) => {
                            var type = doc.data().AnimalType;
                            if(type === "Dairy"){
                                e = parseInt(doc.data().Earning);
                                e1 += e;
                            }
                         
                        });
                            //sold
                           firebase.firestore().collection("sold")
                                .get()
                                .then((querySnapshot) => {
                                    let sold = 0;
                                    let sold1 = 0;
                                    querySnapshot.forEach((doc) => {
                                        var type = doc.data().AnimalType;
                                        if(type === "Dairy"){
                                            sold = parseInt(doc.data().SellingPrice);
                                            sold1 += sold;
                                        }
                                     
                                    });
                                    
                                         var all = y1+x1;
                                         document.getElementById("expensetotal").innerHTML = all;
                                          var income = sold1 + e1;
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
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "January" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "January" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "January"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "January" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "January" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};

//feb
document.getElementById("feb").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
    var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "February" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "February" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "February"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "February" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "February" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//march
document.getElementById("march").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "March" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "March" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "March"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "March" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "March" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//april
document.getElementById("april").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "April" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "April" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "April"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "April" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "April" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//may
document.getElementById("may").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "May" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "May" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "May"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "May" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "May" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//june
document.getElementById("june").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "June" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "June" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "June"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "June" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "June" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//july
document.getElementById("july").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "July" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "July" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "July"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "July" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "July" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//august
document.getElementById("august").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "August" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "August" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "August"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "August" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "August" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//sep
document.getElementById("sep").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "September" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "September" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "September"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "September" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "September" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//oct
document.getElementById("oct").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "October" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "October" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "October"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "October" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "October" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//nov
document.getElementById("nov").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "November" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "November" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "November"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "November" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "November" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end

//dec
document.getElementById("dec").onclick = function(){
    this.disabled = true;
    //allanimals
    firebase.firestore().collection("allanimals").get()
   .then((querySnapshot) => {
        var content = '';
    let b = 0;
    let b2 = 0;
    querySnapshot.forEach((doc) => {
        var Date3 = doc.data().Date;
        var cow = doc.data().Animal;
        var type = doc.data().AnimalType;
        var Id = doc.data().AnimalID;
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const d = new Date(Date3);
        var name1 = month[d.getMonth()];
        if(name1 === "December" && type === "Dairy"){ 
        b = parseInt(doc.data().InitialCost);
       b2 += b;
        }
    });
    firebase.firestore().collection("consumption").get()
    .then((querySnapshot) => {
         var content = '';
     let cons = 0;
     let cons2 = 0;
     querySnapshot.forEach((doc) => {
         var month1 = doc.data().Month;
         var type = doc.data().AnimalType;
         if(month1 === "December" && type === "Dairy"){ 
         cons = parseInt(doc.data().Price);
         cons2 += cons;
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
            var month2 = doc.data().Month;
            var type = doc.data().AnimalType;
            if(month2 === "December"  && type === "Dairy"){
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
                var type1 = doc.data().AnimalType;
                if(m === "December" && type1 === "Dairy"){
                    sold = parseInt(doc.data().SellingPrice);
                    sold1 += sold;
                }
            });
        var income = earn1 + sold1;
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
    }else if(income = final){
        a = "";
        diff = 0;
        var percent1 = 0;
    }
    content += '<tr>';
    content += '<td>' + "December" + '</td>';
    content+=`<td id="ex">`+ final + `</td>`;
   content += '<td id="edit2">' + income + '</td>';
    content += '<td>'+ a+ diff + '</td>';
    content += '<td>'+ a+ percent1 + "%"+ '</td>';
    content += '</tr>';
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
};
//end
    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
    }
  });