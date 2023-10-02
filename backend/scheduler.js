import cron from "node-cron";
import { retrieveUsersWithBirthday } from "./user-service.js";

//Schedule the job to run at 9 am daily
cron.schedule("0 9 * * *", () => {
  console.log("Running retrieveUsersWithBirthday...");
  retrieveUsersWithBirthday()
    .catch((error) => {
      console.error("Error retrieving users:", error);
    });
});
//retrieveUsersWithBirthday();
console.log("Scheduler started.");
