const { MongoClient, ObjectId } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://tnur:PiFajiToTvpEagsJ@cluster0.ee9wf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const recipeDb = client.db("databaseprep");

    const categoriesCollection = recipeDb.collection("categories");
    const insertedCategories = await categoriesCollection.insertMany([
      { category_name: "Vegetarian" },
      { category_name: "Japanese" },
    ]);

    const ingredientsCollection = recipeDb.collection("ingredients");
    const insertedIngredients = await ingredientsCollection.insertMany([
      { ingredient_name: "Eggs" },
      { ingredient_name: "Soy sauce" },
      { ingredient_name: "Sugar" },
      { ingredient_name: "Salt" },
      { ingredient_name: "Olive Oil" },
    ]);

    const recipesCollection = recipeDb.collection("recipes");
    await recipesCollection.insertMany([
      {
        recipe_name: "Tamagoyaki Japanese Omelette",
        categories: [insertedCategories.insertedIds[2]],
        ingredients: [
          {
            ingredient_id: insertedIngredients.insertedIds[0],
            quantity: "2 tbsp",
          },
          {
            ingredient_id: insertedIngredients.insertedIds[1],
            quantity: "1 tbsp",
          },
        ],
        steps: [
          "Beat the eggs",
          "Add soy sauce, sugar, and salt",
          "Add oil to a sauce pan ",
          " Bring to medium heat",
          "Add some mix to the sauce pan",
          "Let is cook for 1'",
          "Add oil to a sauce pan",
          "Add some mix to the sauce pan",
          " Let is cook for 1'",
          "Remove pan from fire",
        ],
      },
      {
        recipe_name: "Mac & Cheese",
        categories: [insertedCategories.insertedIds[2]],
        ingredients: [
          {
            ingredient_id: insertedIngredients.insertedIds[0],
            quantity: "2 tbsp",
          },
          {
            ingredient_id: insertedIngredients.insertedIds[1],
            quantity: "1 tbsp",
          },
        ],
        steps: [
          "Cook Macaroni for 8'",
          "Melt butter in a saucepan",
          "Add flour, salt, pepper and mix ",
          "Add Milk and mix",
          "Cook until mix is smooth",
          "Add cheddar cheese",
          "Add the macaroni",
        ],
      },
    ]);

    console.log("Data inserted successfully");
  } finally {
    await client.close();
  }
}

main().catch(console.error);
