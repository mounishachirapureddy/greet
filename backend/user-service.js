import {getConnection} from "./connect.js";
import {sendBirthdayGreetings} from "./email-service.js";

async function retrieveUsersWithBirthday() {
    const client = await getConnection();
    const db = client.db("templedb");
    const collection = db.collection("user_details");

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    
    /*const users = await collection.find({
      $expr: {
          $and:[
            { $eq: [{ $dayOfMonth: '$birthdate' }, currentDay] },
            { $eq: [{ $month: '$birthdate' }, currentMonth] }
              ]
      }
  }).toArray();
  console.log(users)*/
  const users = await collection.find({
    $expr: {
        $and:[
          { $eq: [{ $dayOfMonth: { $dateFromString: { dateString: '$birthdate', format: '%d/%m/%Y' } } }, currentDay] },
    { $eq: [{ $month: { $dateFromString: { dateString: '$birthdate', format: '%d/%m/%Y' } } }, currentMonth] }
          /*
          { $eq: [{ $dayOfMonth: '$birthdate' }, currentDay] },
          { $eq: [{ $month: '$birthdate' }, currentMonth] }*/
            ]
    }
}).toArray();
console.log(users)
  users.forEach(user => sendBirthdayGreetings(user));
  client.close();
  console.log("Connection closed");
}

export { retrieveUsersWithBirthday };

