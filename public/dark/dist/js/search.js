  
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // let loggedInUserId = user.uid;
    
        var queryString = decodeURIComponent(window.location.search);
        queryString = queryString.substring(1);
        window.localStorage.setItem("Animalid",queryString);
        
                   firebase.firestore().collection("animals").get(queryString)
                        .then((querySnapshot) => {
                            var content = "";
                            querySnapshot.forEach((doc) => {
                                var AnimalId = doc.data().ItemId;
                                var Aml1 = doc.data().AnimalID;

                                if(queryString == AnimalId ){

                                
                                // doc.data() is never undefined for query doc snapshots
                                console.log(doc.id, " => ", doc.data());
                             
                             
                                var Animal1 = doc.data().Animal;
                                var Date = doc.data().Date;
                                var category = doc.data().AnimalType;
                                var Produce1  =  doc.data().Product;
                                var Price1 = doc.data().InitialCost;
                                var method = doc.data().Method1;

                                let pick = 'table-basic.html' + '?' + AnimalId;
                                let consumption = 'Addcons.html' + '?' + AnimalId;
                                let editanimal = 'EditAnimal.html' + '?' + AnimalId;
                                let Add = 'AddEarning.html' + '?' + AnimalId;
                                let Sell = 'AddSell.html' + '?' + AnimalId;

                                
                                content += '<tr>';
                                content += '<td>' + Aml1+ '</td>';
                                content += '<td>' + Animal1 + '</td>';
                                content += '<td>' + Date + '</td>';
                                content += '<td>' + category + '</td>';
                                content += '<td>' + Produce1+ '</td>';
                                content += '<td>' + method + '</td>';
                                content += '<td>' + Price1 + '</td>';
                                content += '<td id="edit2"> <a href="'+editanimal+'" id="edit3">Edit</a> </td>';
                                content += '<td id="edit2"> <a href="'+consumption+'" id="consumption">Consumption</a> </td>';
                                content += '<td  id="edit2"> <a href="'+pick+'" id="pick">Pick from storage</a> </td>';
                                content += '<td id="edit2"> <a href="'+Add+'">Add Earnings</a> </td>';
                                content += '<td id="edit2"> <a href="'+Sell+'" id="sell">Sell</a> </td>';
                                content += '</tr>';
                                }     
                               
                        });
                        $('#items2').append(content);
                        // alert('hey');
                   
                     
                 
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            
      
        
       
    


    } else {
        window.location.href = 'index.html'
    }
});
