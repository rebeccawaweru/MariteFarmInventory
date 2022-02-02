firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
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

                //logout
                document.getElementById('logout').onclick = ()=>{
                    firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                        window.location.href="login.html";
                      }).catch((error) => {
                        // An error happened.
                      });
                   }
        document.getElementById('cancel').onclick = ()=>{
        window.location.href = "records.html"  ;
        };
var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
document.getElementById('sell').onclick = function(){
    var weight=document.getElementById("currentweight").value;
   var sell = document.getElementById("sellingprice").value;
   var Date1 = document.getElementById("date").value;
   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   const d = new Date(Date1);
   var name1 = month[d.getMonth()];

    firebase.firestore().collection("allanimals")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var IdA = doc.data().ItemId;
            var Name = doc.data().Animal;
            var Animal1 = doc.data().AnimalID;
            var type = doc.data().AnimalType;
            var Price1 = doc.data().InitialCost;
            var weight1 = doc.data().InitialWeight;
            var priceperkg = sell/weight;
            var date = doc.data().Date;
        if(queryString == IdA){
        var SoldRef = firebase.firestore().collection("sold").doc();
        SoldRef.set({
            SoldId : SoldRef.id,
            IdAnimal:IdA,
            AnimalID:Animal1,
            AnimalName: Name,
            AnimalType:type,
            InitialWeight:weight1,
            Price2:Price1,
            DateAcquired:date,
            DateSold: Date1,
            Month:name1,
            FinalWeight:weight,
            SellingPrice: sell,
            Pricekg:priceperkg,
            TotalCons:0 ,
        })
        .then(() => {
            console.log("Document successfully written!");
            window.location.href="Sold.html";

           var UpRef= firebase.firestore().collection("allanimals").doc(queryString);
            return UpRef.update({
                  Sold: true
            })
            then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        }
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });    
}
} else {
    // User is signed out
    // ...
    window.location.href="index.html";
    
    }
});