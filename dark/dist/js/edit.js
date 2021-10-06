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

      firebase.firestore().collection("goods")
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var Id = doc.data().ItemId;
          if(queryString == Id ){
            document.getElementById('name').value= doc.data().name;
            document.getElementById('date').value= doc.data().Date;
            document.getElementById('purpose').value= doc.data().Use;
            document.getElementById('remarks').value= doc.data().Comment;
            document.getElementById('measurement').value= doc.data().Measure;
            document.getElementById('quantity').value= doc.data().Quantity;
            document.getElementById('price').value= doc.data().Price;
            document.getElementById('price1').value= doc.data().PriceperMeasure;

          }
          }); 

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });


      document.getElementById('update').onclick = () =>{
        var name1= document.getElementById('name').value;
        var date1=document.getElementById('date').value;
        var use1= document.getElementById('purpose').value;
        var comment1= document.getElementById('remarks').value;
        var measure1=document.getElementById('measurement').value;
        var quantity1=document.getElementById('quantity').value;
        var price1=document.getElementById('price').value;
        var pp1= document.getElementById('price1').value;
        var goodsRef = firebase.firestore().collection('goods').doc(queryString);
           return goodsRef.update({
            name: name1,
            Date: date1,
            Use: use1,
            Comment: comment1,
            Measure: measure1,
            Quantity: quantity1,
            Price: price1,
            PriceperMeasure:pp1,
           })
          .then(() => {
              console.log("Document successfully written!");
          //    window.setTimeout(()=>{location.reload()},3000) ;
          window.location.href = "table-basic.html";

          })
          .catch((error) => {
              console.error("Error writing document: ", error);
          });
          }

          document.getElementById("delete").onclick=function(){
            firebase.firestore().collection("goods").doc(queryString).delete().then(() => {
              console.log("Document successfully deleted!");
              window.location.href="table-basic.html";
          }).catch((error) => {
              console.error("Error removing document: ", error);
          });
          }

          document.getElementById("cancel").onclick=function(){
            window.location.href="table-basic.html";
          }
       
     

    } else {
      // User is signed out
      // ...
      window.location.href="login.html";
      
    }
  });

       
      
     
 
    

   



