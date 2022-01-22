/*
Template Name: Niche
Author: UXLiner
*/

firebase.firestore().collection("consumption")
    .get()
    .then((querySnapshot) => {
        let consumption = 0;
        let totalconsumption = 0;
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            consumption = parseInt(doc.data().Price);
            totalconsumption += consumption;
        });

      

        firebase.firestore().collection("earnings").get().then((querySnapshot) => {
            let earnings = 0;
            let totalearnings = 0;
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
               earnings = parseInt(doc.data().Earning);
			   totalearnings += earnings;

			});
			firebase.firestore().collection("sold").get().then((querySnapshot) => {
				let sell = 0;
				let sell1 = 0;
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
				sell = parseInt(doc.data().SellingPrice);
				  sell1 += sell;
	
				});
				firebase.firestore().collection("sales").get().then((querySnapshot) => {
					let sale = 0;
					let sale1 = 0;
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
					sale = parseInt(doc.data().Price);
					  sale1 += sale;
		
					});
				

			firebase.firestore().collection("allanimals").get()
			.then((querySnapshot) => {
				var content = '';
				let capital = 0;
				let totalcapital = 0;
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
		
					size1 = querySnapshot.docs.length;
					capital = parseInt(doc.data().InitialCost);
					totalcapital += capital;

					

				});
			  $(function() {
					var all = totalearnings + sell1 + sale1;
					var exp = totalconsumption + totalcapital;
				"use strict";
				
			
			// ======
			// line chart
			// ======	
			// var ctx = document.getElementById('line-chart').getContext('2d');
			// var chart = new Chart(ctx, {
			// 	// The type of chart we want to create
			// 	type: 'line',
			
			// 	// The data for our dataset
			// 	data: {
			// 		labels: ["January", "February", "March", "April", "May", "June", "July"],
			// 		datasets: [{
			// 		   label: "My First dataset",
			// 			//backgroundColor: 'rgb(255, 99, 132)',
			// 			borderColor: 'rgb(88, 103, 221)',
			// 			data: [0, 10, 5, 2, 20, 30, 45],
			// 					fill: false,
			// 				}, {
			// 		  label: "My Second dataset",
			// 			//backgroundColor: 'rgb(255, 99, 132)',
			// 			borderColor: 'rgb(0, 140, 211)',
			// 			data: [15, 15, 10, 20, 30, 10, 25],
			// 				}]
			// 			},
			// 	options: {
			// 			responsive: true
			// 		}
			// });
			
			// ======
			// Pie chart
			// ======
			new Chart(document.getElementById("pie-chart"),{
				type:'pie',
				data:{
					labels:
						['Consumption','Capital','Earning'],
					datasets:
						[{'label':'My First Dataset',
					data:
						[totalconsumption,totalcapital,all],
					backgroundColor:
						['red',
						'rgb(54, 162, 235)',
						'green'],
					}]
			},
				options: {
						responsive: true
					}
			});
			
			// ======
			// Doughnut chart
			// ======
			
			new Chart(document.getElementById('doughnut-chart'),{
			
				type:'doughnut',
				data:{
					labels:
					['TotalEarnings','TotalExpense'],
				datasets:
					[{'label':'My First Dataset',
				data:
					[all,exp],
				backgroundColor:
					['green',
					'red',
				],
					}]
			},
				options: {
						responsive: true
					}
			});
					
			
			// ======
			// // PolarArea chart
			// // ======
			// new Chart(document.getElementById('polararea-chart'),{
			// 	type:'polarArea',
			// 	data:{
			// 		labels:
			// 		['Red','Green','Yellow','Grey','Blue'],
			// 	datasets:
			// 		[{'label':'My First Dataset',
			// 	data:
			// 		[11,16,7,3,14],
			// 	backgroundColor:
			// 	['rgb(255, 99, 132)',
			// 	'rgb(75, 192, 192)',
			// 	'rgb(255, 205, 86)',
			// 	'rgb(201, 203, 207)',
			// 	'rgb(54, 162, 235)'],
			// 		}]
			// },
			// 	options: {
			// 			responsive: true
			// 		}
			// });
			
			
			// ======
			// Radar chart
			// ======
			// new Chart(document.getElementById('radar-chart'),{
			// 	type:'radar',
			// 	data:{
			// 		labels:
			// 			['Eating','Drinking','Sleeping','Designing','Coding','Cycling','Running'],
			// 	datasets:
			// 		[{'label':'My First Dataset',
			// 	data:[65,59,90,81,56,55,40],
			// 	fill:true,
			// 	backgroundColor:'rgba(255, 99, 132, 0.2)',
			// 	borderColor:'rgb(255, 99, 132)',
			// 	pointBackgroundColor:'rgb(255, 99, 132)',
			// 	pointBorderColor:'#fff',
			// 	pointHoverBackgroundColor:'#fff',
			// 	pointHoverBorderColor:'rgb(255, 99, 132)'},{
			// 	label:'My Second Dataset',
			// 	data:[28,48,40,19,96,27,100],
			// 	fill:true,
			// 	backgroundColor:'rgba(54, 162, 235, 0.2)',
			// 	borderColor:'rgb(54, 162, 235)',
			// 	pointBackgroundColor:'rgb(54, 162, 235)',
			// 	pointBorderColor:'#fff',
			// 	pointHoverBackgroundColor:'#fff',
			// 	pointHoverBorderColor:'rgb(54, 162, 235)'}]},
			// 	options:{
			// 		elements:{
			// 		line:{
			// 		tension:0,
			// 		borderWidth:3,
			// 		responsive: true,
			// 	}}}});
			// ======
			// Bar chart
			// ======	
			var ctx = document.getElementById('pie-chart2').getContext('2d');
			var chart = new Chart(ctx, {
				// The type of chart we want to create
				type: 'bar',
			
				// The data for our dataset
				data: {
					labels: [n, "November", "December", "January", "February", "March", "April"],
					datasets: [{
						label: "Consumption",
						backgroundColor: 'red',
						borderColor: 'white',
						data: [totalconsumption],
								fill: false,
							}, {
						label: "Earning",
						backgroundColor: 'green',
						borderColor: 'white',
						data: [totalearnings],
							}]
						},
				options: {
						responsive: true
					}
			});
			})(jQuery);

			new Chart(document.getElementById('pie-chart2'),{
			
				type:'doughnut',
				data:{
					labels:
					['Earning','Consumption'],
				datasets:
					[{'label':'My First Dataset',
				data:
					[totalearnings,totalconsumption],
				backgroundColor:
					['green',
					'red',
				],
					}]
			},
				options: {
						responsive: true
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
