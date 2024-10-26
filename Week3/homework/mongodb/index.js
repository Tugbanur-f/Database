const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const episode = {
    season: 9,
    episode: 13,
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  const result = await client
    .db("database_name")
    .collection("episodes")
    .insertOne(episode);

  console.log(
    `Created episode 13 in season 9 and the document got the id ${result.insertedId}`,
  );
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */

  // Write code that will add this to the collection!
}

async function findEpisodesExercises(client) {
  async function findEpisodesExercises(client) {
    const episodesCollection = client
      .db("database_name")
      .collection("episodes");

    // Find the title of episode 2 in season 2
    const episodeTitle = await episodesCollection.findOne(
      { season: 2, episode: 2 },
      { projection: { title: 1, _id: 0 } },
    );
    console.log(`The title of episode 2 in season 2 is ${episodeTitle.title}`);

    // Find the season and episode number of the episode called "BLACK RIVER"
    const blackRiverEpisode = await episodesCollection.findOne(
      { title: "BLACK RIVER" },
      { projection: { season: 1, episode: 1, _id: 0 } },
    );
    console.log(
      `The season and episode number of the "BLACK RIVER" episode is S${blackRiverEpisode.season
        .toString()
        .padStart(2, "0")}E${blackRiverEpisode.episode
        .toString()
        .padStart(2, "0")}`,
    );

    // Find all of the episode titles where Bob Ross painted a CLIFF
    const cliffEpisodes = await episodesCollection
      .find({ elements: "CLIFF" })
      .project({ title: 1, _id: 0 })
      .toArray();
    const cliffEpisodeTitles = cliffEpisodes.map((ep) => ep.title).join(", ");
    console.log(
      `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodeTitles}`,
    );

    // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE
    const cliffAndLighthouseEpisodes = await episodesCollection
      .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
      .project({ title: 1, _id: 0 })
      .toArray();
    const cliffAndLighthouseTitles = cliffAndLighthouseEpisodes
      .map((ep) => ep.title)
      .join(", ");
    console.log(
      `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseTitles}`,
    );
  }

  /**
   * Complete the following exercises.
   * The comments indicate what to do and what the result should be!
   */

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]

  console.log(
    `The title of episode 2 in season 2 is ${"TODO: fill in variable here"}`,
  );

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${"TODO: fill in variable here"}`,
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${"TODO: fill in variable here"}`,
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${"TODO: fill in variable here"}`,
  );
}

async function updateEpisodeExercises(client) {
  const episodesCollection = client.db("database_name").collection("episodes");

  // Update episode title in season 30, episode 13
  const updateTitleResult = await episodesCollection.updateOne(
    { season: 30, episode: 13 },
    { $set: { title: "BLUE RIDGE FALLS" } },
  );
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateTitleResult.modifiedCount} episodes`,
  );

  // Update all episodes where 'BUSHES' should be 'BUSH'
  const updateElementsResult = await episodesCollection.updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$": "BUSH" } },
  );
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateElementsResult.modifiedCount} episodes`,
  );
}

/**
 * There are some problems in the initial data that was filled in.
 * Let's use update functions to update this information.
 *
 * Note: do NOT change the data.json file
 */

// Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that

// Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
// Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
// It should update 120 episodes!
async function deleteEpisodeExercise(client) {
  const episodesCollection = client.db("database_name").collection("episodes");

  const deleteResult = await episodesCollection.deleteOne({
    season: 31,
    episode: 14,
  });
  console.log(
    `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`,
  );
}

/**
 * It seems an errand episode has gotten into our data.
 * This is episode 14 in season 31. Please remove it and verify that it has been removed!
 */

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`,
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
