import {runSeeder} from "./seedRunner.js"
import seedGoals from "./seedGoals.js"


const seedAll = async () => {
    await seedGoals();
  };
  
  runSeeder(seedAll);