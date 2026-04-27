const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");

const FILE_PATH = "./data.json";
const git = simpleGit();

const markCommit = async () => {
  const date = moment()
    .subtract(1, "day")
    .startOf("day")
    .add(Math.floor(Math.random() * 22) + 1, "hours")
    .add(Math.floor(Math.random() * 59) + 1, "minutes")
    .format("YYYY-MM-DDTHH:mm:ssZ");

  console.log("Commit:", date);

  await jsonfile.writeFile(FILE_PATH, { date });
  await git.add([FILE_PATH]);
  await git.commit("yesterday commit", { "--date": date });
};

const makeCommits = async (n) => {
  if (n === 0) {
    console.log("🚀 Pushing...");
    await git.push();
    console.log("✅ Done!");
    return;
  }

  await markCommit();
  await new Promise((res) => setTimeout(res, 200));

  return makeCommits(n - 1);
};

makeCommits(30);