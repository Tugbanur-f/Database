CREATE TABLE recipes (
  recipe_id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_name VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE ingredients (
  ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
  ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE steps (
  step_id INT AUTO_INCREMENT PRIMARY KEY,
  step_description TEXT NOT NULL,
  recipe_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) 
);

CREATE TABLE recipe_categories (
  recipe_id INT,
  category_id INT,
  PRIMARY KEY (recipe_id, category_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE recipe_ingredients (
  recipe_id INT,
  ingredient_id INT,
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
<<<<<<< HEAD
<<<<<<< HEAD
);


/* Entities: recipes, categories, ingredients, steps 
*  Relationships:  
A recipe can belong to multiple categories, and a category can include multiple recipes in recipe_categories.
A recipe can have multiple ingredients, and an ingredient can be used in multiple recipes in recipe_ingredients.
A recipe can have multiple steps to follow, but each step belongs to only one recipe.
*/


=======
);
>>>>>>> 352d4ea634547e3c9d7a1a5e595cbbe677c7a08b
=======
);
>>>>>>> 352d4ea634547e3c9d7a1a5e595cbbe677c7a08b
