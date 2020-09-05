const form = document.getElementById('vote-form');
var event;

// form submit event
form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),

        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    //      .then(function(response) {
    //     // The response is a Response instance.
    //     // You parse the data into a useable format using `.json()`
    //     return response.json();
    //   }).then(function(data) {
    //     // `data` is the parsed version of the JSON returned from the above endpoint.
    //     console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    //   })
    .then(res => res.json())
    .then(data =>console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});

        fetch("http://localhost:3000/poll")
       .then(res => res.json())
       .then(data => {
           console.log(data);
        //    const votes = data.votes;
        //    const totalVotes = votes.length;
        // Count vote points -acc/current values
        //   const voteCounts = votes.reduce((acc, vote) => 
        //                  ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
        //                  {}
        //   );
    });
       
        // let votes = data.votes;
        // let totalVotes = votes.length;
        // document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            Windows: 0,
            MacOS: 0,
            Linux: 0,
            Other: 0
        };

            let dataPoints = [
             { label: 'Windows', y: voteCounts.Windows },   
             { label: 'MacOS', y: voteCounts.MacOS },      
             { label: 'Linux', y: voteCounts.Linux },        
             { label: 'Other', y: voteCounts.Other }          
         ];  
            
           const chartContainer = document.querySelector('#chartContainer');
        
              if(chartContainer){

//             // Listen for the event.
//             // document.addEventListener('votesAdded', function (e) { 
//             //     document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
//             // });
            
                   const chart = new CanvasJS.Chart('chartContainer', {
                   animationEnabled: true, 
                   theme: 'theme1',
                   title:{
                       text: 'Total Votes' 
                    },
                   data:[
                     {
                           type: 'column',
                           dataPoints: dataPoints
                     }
                    ]
                });
                 chart.render(); 

            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;

            var pusher = new Pusher('dbd01c16358e62701833', {
             cluster: 'ap2',
             encrypted: true
            });

            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function(data) {
                 dataPoints = dataPoints.map(x => {
                    if(x.label == data.os) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                 });
                 chart.render();
             });
            }
         
            //  var channel = pusher.subscribe('os-poll');

            //  channel.bind('os-vote', function(data) {
            //    dataPoints.forEach((point)=>{
            //        if(point.label==data.os)
            //        {
            //             point.y+=data.points;
            //             totalVotes+=data.points;
            //             event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
            //             // Dispatch the event.
            //             document.dispatchEvent(event);
            //        }
            //    });
            //    chart.render();
            //  });
//         

