/*
import cron from 'node-cron';
import axios from 'axios';

async function scheduler(req,res){
  var b=req.body.minutes;
        var a=req.body.hour;
        const cron_schedule=`0 ${b} ${a} * * *` ;
    cron.schedule(cron_schedule, async() => {
        console.log("Running retrieveUsersWithBirthday...");
        const response= await axios.get('http://localhost:3007/api/getBirthdate')
        //console.log(data)

        const data=response.data
        if (Array.isArray(data)) {
          console.log(data[0]);
        } else {
          console.log("Data is not an array");
        }
        
        //console.log(data[0])
        var n=data.length
       
      
        /*
        console.log(typeof(data_json))
        await axios.post('http://localhost:3006/api/emailnotification',data_json,{
          headers: {
            'Content-Type': 'application/json',
          },
          body:{
            "first_name":data_json.first_name,
            "last_name":data_json.last_name,
            "email":data_json.email



          }
        })
       

      })


       // retrieveUsersWithBirthday()
          
      };*/
      //console.log(data_json);
     /* data.array.forEach(async element => {
        await axios.post('http://localhost:3006/api/emailnotification',element)
        
      });*/
      /*
      const axiosPromises = data.array.map(element =>
        axios.post('http://localhost:3006/api/emailnotification', element)
        .then(response => {
          console.log('Response for user:', response.data);
        })
        .catch(error => {
          console.error('Error for user:', error);
        })
      );
      
      try {
        await Promise.all(axiosPromises);
        console.log('All requests completed successfully.');
      } catch (error) {
        console.error('Error sending data:', error);
      }
      

   /*for(i=0;i<n;i++){
    try {
      
      await axios.post('http://localhost:3006/api/emailnotification', data[i], {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  }
  
  });

}*/
/*
const axiosPromises = [];

for (let i = 0; i < n; i++) {
  axiosPromises.push(
    axios.post('http://localhost:3006/api/emailnotification', data[i], {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  );
}

try {
  await Promise.all(axiosPromises);
  console.log('All requests completed successfully.');
} catch (error) {
  console.error('Error sending data:', error);
}
res.send("Timer set")
});
*/
/*
});
}
*/
import cron from 'node-cron';
import axios from 'axios';

async function scheduler(req, res) {
  var b = req.body.minutes;
  var a = req.body.hour;
  const cron_schedule = `0 ${b} ${a} * * *`;

  cron.schedule(cron_schedule, async (req,res) => {
    console.log("Running retrieveUsersWithBirthday...");
    const response = await axios.get('http://localhost:3007/api/getBirthdate');

    const data = response.data;
    if(data.length==0){
      console.log("no users found")
    }
    else{
    

    if (Array.isArray(data)) {
      console.log(data);
      const axiosPromises = data.map(element =>
        axios.post('http://localhost:3006/api/emailnotification', element)
          .then(response => {
            console.log('Response for user:', response.data);
          })
          .catch(error => {
            console.error('Error for user:', error);
          })
      );

      try {
        await Promise.all(axiosPromises);
        console.log('All requests completed successfully.');
      } catch (error) {
        console.error('Error sending data:', error);
      }
    } else {
      console.log("Data is not an array");
    }
  }

   
    
    
  });

  res.send('sucessfully timer set')
}


export { scheduler };

    



//export{scheduler}

