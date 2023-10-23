import cron from "node-cron";
import { retrieveUsersWithBirthday } from "./user-service.js";

//Schedule the job to run at 9 am daily
cron.schedule("40 11 * * *", () => {
  console.log("Running retrieveUsersWithBirthday...");
  retrieveUsersWithBirthday()
    .catch((error) => {
      console.error("Error retrieving users:", error);
    });
});
/*function startScheduler() {
  console.log("Scheduler started.");
  scheduleTask(); // Call the function to set up the scheduling
}

startScheduler(); */
//retrieveUsersWithBirthday();
console.log("Scheduler started.");
