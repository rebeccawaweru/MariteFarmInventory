firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...

           //collect data
           firebase.firestore().collection("users").where('UserId', '==', uid)
           .get(user)
           .then((querySnapshot) => {
               querySnapshot.forEach((doc) => {
                   // doc.data() is never undefined for query doc snapshots
             console.log(doc.id, " => ", doc.data());
             var Id = doc.data().UserId;
             document.getElementById('displayname').innerHTML= doc.data().Name;
     
               });
           })
           .catch((error) => {
               console.log("Error getting documents: ", error);
           });


      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);
    firebase.firestore().collection("goods").get()
    .then((querySnapshot) => {
        var content = '';
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            var ItemId = doc.data(). ItemId;
            var ItemName = doc.data().name;
            var Date1 = doc.data().Date;
            var Purpose  =  doc.data().Use;
            var Remark = doc.data().Comment;
            var Measurement = doc.data().Measure;
            var Quantity1 = doc.data().Quantity;
            var Quantity2 = doc.data().QuantityI;
            var Price = doc.data().Price;
            var Price1 = Price/Quantity2;
            size = querySnapshot.docs.length;
            // document.getElementById('NoItems').innerHTML = size;
    
            let edit = 'editgood.html'+ '?'+ ItemId;
            let use = 'Addcons2.html' + '?'+ ItemId ;
            if (doc.data().Quantity === 0){

              content += '<tr>';
              // content += '<td>' + ItemId+ '</td>';
              content += '<td>' + ItemName + '</td>';
              content += '<td>' + Date1 + '</td>';
              content += '<td>' + Quantity2 + Measurement + '</td>';
              content += '<td>' + Price1 + "/" + Measurement +  '</td>';
              content += '<td>' + Price  + '</td>';
              content += '</tr>';

              
            }
          

        });
        $("#historytable").append(content);
        

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