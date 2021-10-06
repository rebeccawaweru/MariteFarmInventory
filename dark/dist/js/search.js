  
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // let loggedInUserId = user.uid;
    
        var queryString = decodeURIComponent(window.location.search);
        queryString = queryString.substring(1);

                   firebase.firestore().collection("animals").get(queryString)
                        .then((querySnapshot) => {
                            var content = "";
                            querySnapshot.forEach((doc) => {
                           
                                var Aml1 = doc.data().AnimalID;

                                if(queryString == Aml1){

                                
                                // doc.data() is never undefined for query doc snapshots
                                console.log(doc.id, " => ", doc.data());
                                var AnimalId = doc.data().ItemId;
                             
                                var Animal1 = doc.data().Animal;
                                var Date = doc.data().Date;
                                var Produce1  =  doc.data().Product;
                                var Price1 = doc.data().InitialCost;
                      

                                let pick = 'table-basic.html' + '?' + AnimalId;
                                let consumption = 'Addcons.html' + '?' + AnimalId;
                                let editanimal = 'EditAnimal.html' + '?' + AnimalId;
                                let Add = 'AddEarning.html' + '?' + AnimalId;

                                
                                content += '<tr>';
                                content += '<td>' + Aml1+ '</td>';
                                content += '<td>' + Animal1 + '</td>';
                                content += '<td>' + Date + '</td>';
                                content += '<td>' + Produce1+ '</td>';
                                content += '<td>' + Price1 + '</td>';
                                content += '<td> <a href="'+editanimal+'">Edit</a> </td>';
                                content += '<td> <a href="'+consumption+'">Consumption</a> </td>';
                                content += '<td> <a href="'+pick+'">Pick from storage</a> </td>';
                                content += '<td> <a href="'+Add+'">Add Earnings</a> </td>';
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
        window.location.href = 'login.html'
    }
});
