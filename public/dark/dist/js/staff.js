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
        document.getElementById("staff").onclick=function(){
            window.location.href="addstaff.html";
        }

           var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
          
    firebase.firestore().collection("staff").get()
    .then((querySnapshot) => {
        var content = '';
        let capital = 0;
        let totalcapital = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var staffid = doc.data(). StaffId;
            var name = doc.data().Name;
            var ID = doc.data().StaffID;
            var Date1 = doc.data().DateJoined;
            var phone = doc.data().Phone;
            var position =  doc.data().Position;
            var salary = doc.data().Salary;
            var kra = doc.data().KRA;
            size = querySnapshot.docs.length;
            capital = parseInt(doc.data().Salary);
            totalcapital += capital;
            document.getElementById('totalA').innerHTML = size;
            document.getElementById("capital").innerHTML = totalcapital;
            var Date3 = new Date(Date1);

            let editanimal = 'EditStaff.html' + '?' + staffid;
            content += '<tr>';
            content += '<td>' + name + '</td>';
            content += '<td>' + ID + '</td>';
            content += '<td>' + kra + '</td>';
            content += '<td>' + phone + '</td>';
            content += '<td>' + Date3.toDateString() + '</td>';
            content += '<td>' + position+ '</td>';
            content += '<td>' +'ksh'+ salary + '</td>';
            content += '<td id="edit2"> <a href="'+editanimal+'" >Edit</a> </td>';
            content += '</tr>';
           



        });
        $("#items1").append(content);
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


    
         
    document.getElementById("search-btn").onclick = function (){
      var search1 = document.getElementById('search').value;
      firebase.firestore().collection("animals")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var Aml = doc.data().AnimalID;
            var Id = doc.data().ItemId;

            if(search1 == Aml){
              window.location.href = "search.html" + "?" + Id ;
            
              search1 = "";
      
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