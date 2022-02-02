firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
    
        //buttons
      // document.getElementById("animals").onclick = function(){
      //     window.location.href="Animals.html";
      // }
      // document.getElementById("store").onclick = function(){
      //     window.location.href="table-basic.html";
      // }

          //logout
          document.getElementById('logout').onclick = ()=>{
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                window.location.href="login.html";
              }).catch((error) => {
                // An error happened.
              });
           }

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

      //getitem

      var queryString = decodeURIComponent(window.location.search);
      queryString = queryString.substring(1);

      firebase.firestore().collection("allanimals")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
        
          var Id2 = doc.data().ItemId;
         var method = doc.data().Method1;
         var w = doc.data().CurrentWeight;
          if(queryString == Id2 ){

            document.getElementById('update').onclick = () =>{
              var date = document.getElementById('date').value;
                var weight1 = document.getElementById('weight').value;
               if(w>weight1){
                 var w2 = w-weight1;
                 var w3 = w2;
                 var sign = "-";
                 console.log(w2)
               }else if(weight1>w){
                 var w2 = weight1 - w2;
                 var w3 = w2;
                 var sign = "+";
               }
                var weightRef = firebase.firestore().collection('weights').doc();
                weightRef.set({
                  WeightID:weightRef.id,
                  ItemId:queryString,
                  Weight:weight1,
                  Compare:w2,
                  Sign:sign,
                  Date1:date,

                }).then(()=>{
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                 });
                var animalsRef = firebase.firestore().collection('allanimals').doc(queryString);
                   return animalsRef.update({
                    CurrentWeight:weight1
                   })
                  .then(() => {
                  console.log("Document successfully written!");
                  if(method === "Bought"){
                    window.location.href = "records.html";
                  }else if(method === "Born"){
                    window.location.href = "offsprings.html";   
                  }
                 
                  })
                  .catch((error) => {
                      console.error("Error writing document: ", error);
                  });
                  }
          }
          }); 
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      firebase.firestore().collection("weights").where("ItemId","==", queryString).get()
      .then((querySnapshot) => {
          var content = '';
          querySnapshot.forEach((doc) => {
          var date1 = doc.data().Date1;
          var date3 = new Date(date1);
          var weight = doc.data().Weight;
          var compare = doc.data().Compare;
          var sign = doc.data().Sign;
          var docid = doc.data().WeightID;
       
          let editanimal = 'EditWeight.html' + '?' + docid;

          content+= `<tr>`
          content+=`<td>`+ date3.toDateString()+ `</td>`;
          content+=`<td>`+ weight  + "kg" +`</td>`;
          content+=`<td id="ll">`+ sign +  compare  + "kg" +`</td>`;
          content += '<td id="edit2"> <a href="'+editanimal+'" >Edit</a> </td>';
          content+=`</tr>`
          });
          $("#items1").append(content);
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      document.getElementById("cancel").onclick = function(){
          window.location.href = "records.html";
      }

    } else {
      // User is signed out
      // ...
      window.location.href="index.html";
      
    }
  });

       
      
     
 
    

   



