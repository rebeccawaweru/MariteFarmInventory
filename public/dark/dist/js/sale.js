
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
    firebase.firestore().collection("allanimals").get()
    .then((querySnapshot) => {
        let total2 = 0;
        let total3 = 0;
      querySnapshot.forEach((doc) => {
     var Animal2 = doc.data().ItemId;
     var Animal = doc.data().AnimalID;
     var Name = doc.data().Animal;
     var weight = doc.data().InitialWeight;
     var currentweight = doc.data().CurrentWeight;
     var Price = doc.data().InitialCost;
     var Date1 = doc.data().Date;
     var Type = doc.data().AnimalType;
     var method = doc.data().Method1;
     var sold = doc.data().Sold;
     if(method === 'Bought'){
         var m = "Parent"
     }else if(method === 'Born'){
        var m = "Offspring"
     }
     firebase.firestore().collection("earnings").where("AnimalId", "==", Animal2)
     .get().then((querySnapshot) => {
        let earnings = 0;
        let totalearnings = 0;
        querySnapshot.forEach((doc) => {
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
             var Id = doc.data().IdAnimal;
             consumption = parseInt(doc.data().Price);
             totalconsumption += consumption;
    });
    let total = 0;
    let total1 = 0;
    let expense = 0;
    let totalexpense = 0;
    expense = parseInt(doc.data().InitialCost)+ totalconsumption;
    totalexpense += expense;
    // total = totalearnings;
    total1 += totalearnings;
    if(total1 > totalexpense){
        var profit = total1 - totalexpense;
        var percent =  profit/totalexpense * 100
        var percent1 = Math.round(percent * 10)/10;
        var p = "+";

    }else if (totalexpense > total1){
        var profit = totalexpense - total1;
        var percent =  profit/totalexpense * 100
        var percent1 = Math.round(percent * 10)/10;
        var p = "-";
    }
    // $("#myTable tr").click(function(){
    //     $(this).toggleClass('selected');
    //     $(this).addClass('selected');    
    //     var value=$(this).find('td:nth-child(2)').html();  
    //  });
  if(sold === false){
    content+= `<tr>`;
    content+=`<td>`+ '<input id="check_all" type="checkbox" class="ok">' + `</td>`;
    content+=`<td>`+ Animal + `</td>`;
    content+=`<td>`+ Name + `</td>`;
    content+=`<td>`+ m + `</td>`;
    content+=`<td>`+ Type + `</td>`;
    content+=`<td>`+ weight + "kg"+ `</td>`;
    content+=`<td>`+ currentweight + "kg"+`</td>`;
    content+=`<td>`+ Price + `</td>`;
    content+=`<td>`+ totalconsumption + `</td>`;
    content+=`<td>`+ totalearnings + `</td>`;
    content+=`<td id="edit2">`+ total1 + `</td>`;
    content+=`<td id="ex">`+ totalexpense + `</td>`;
    content+=`<td>`+ p + percent1 + "%" + `</td>`;
    content+= `</tr>`; 

    $("#sold").append(content); 
  }
  
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


       
        $("#myTable").on('click', function() {
            var checkedRows = $(':checkbox:checked')
            .closest('tr').find('td:eq(1)').map(function() { 
                return $(this).html(); 
             }).get();
             console.log( checkedRows );
             var arrayLength = checkedRows.length;
            // for (var i = 0; i < arrayLength; i++) {
                // console.log(checkedRows[i]);
                //Do something
                firebase.firestore().collection("allanimals")
                .get()
                .then((querySnapshot) => {
                    let weight = 0;
                    let weight1 = 0;
                    let cost = 0;
                    querySnapshot.forEach((doc) => {
                        var ID = doc.data().AnimalID;
                        var checkedRows2 = checkedRows.length;
                        var Id = doc.data().ItemId;
                            for (var a = 0; a < checkedRows2; a++){
                                if(ID == checkedRows[a]){
                           
                                weight = parseInt(doc.data().CurrentWeight);
                                weight1 += weight;
                                console.log(weight1);
                                document.getElementById("totalanimals").innerHTML = checkedRows;
                                document.getElementById("totalweight").innerHTML = weight1 + "kg";
                     
                          
                                document.getElementById("sell").onclick = function(){
                                    var amountsale = document.getElementById("amount").value;
                                    var date = document.getElementById("date").value;
                                    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                                    const d = new Date(date);
                                    var name1 = month[d.getMonth()];

                                    var saleRef = firebase.firestore().collection("sales").doc();
                                    saleRef.set({
                                        SaleId:saleRef.id,
                                        AnimalID : checkedRows,
                                        Date1 : date,
                                        Month:name1,
                                        Weight: weight1,
                                        Price : amountsale,
                                    })
                                    .then(() => {
                                        console.log("Document successfully written!");
                                        
                                        firebase.firestore().collection("allanimals").where("AnimalID", "in", checkedRows)
                                        .get()
                                        .then((querySnapshot) => {
                                            querySnapshot.forEach((doc) => {
                                                console.log(doc.id, " => ", doc.data());
                                                var Id = doc.data().ItemId;
                                                var washingtonRef = firebase.firestore().collection("allanimals").doc(Id);
                                            // Set the "capital" field of the city 'DC'
                                            return washingtonRef.update({
                                                Sold: true
                                            })
                                            .then(() => {
                                                console.log("Document successfully updated!");
                                                window.location.href= "Salelist.html"
                                            })
                                            .catch((error) => {
                                                // The document probably doesn't exist.
                                                console.error("Error updating document: ", error);
});
                                            });
                                        })
                                        .catch((error) => {
                                            console.log("Error getting documents: ", error);
                                        });
                                            
                                    })
                                    .catch((error) => {
                                        console.error("Error writing document: ", error);
                             
                                    });
                                }
                            }
                        }
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
               
        });
    } else {
    // User is signed out
    // ...
    window.location.href="index.html";
    }
    });

        // $('#myTable tbody').on( 'click', 'tr', function () {
            //     $(this).toggleClass('selected');
            // } );
         
            // $('#sale').click( function () {
            //     // alert( table.rows('.selected').data().length +' row(s) selected' );
            // } );




      // $("#check_all").on("click", function () {
                //     if ($("input:checkbox").prop("checked")) {
            
                //         $("input:checkbox[name='row-check']").prop("checked", true);
                //         table = document.getElementById("myTable");
                //         tr = table.getElementsByTagName("tr");
                //             alert(tr('.selected').data().length +' row(s) selected' );
                //     } else {
                //         $("input:checkbox[name='row-check']").prop("checked", false);
                //     }
                // });
              
                //  $('.ok').on('click', function(e){
                //     var selected = [];
                //     $("#myTable tr.selected").each(function(){
                //         selected.push($('td:first', this).html());
                //     });
        
                // });
                 
                //  $('.ok').on('click', function(e){
                //     var selectedIDs = [];
                //     $("#myTable tr.selected").each(function(index, row) {
                //        selectedIDs.push($(row).find("td:first").html());
                //     });
                 
                 
                //     fnMatchID(selectedIDs);
                 
                //  });
                //  function fnMatchID(selectID){
                //   var value=$(this).find('td:first').html();
                //    console.log(value);   
                //     }