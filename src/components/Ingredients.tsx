import type { Ingredient } from "../types/ingredients";

type ingredientsPorps = {
  ingredients: Ingredient[];
};

export default function Ingredients({ ingredients }: ingredientsPorps) {
  return (
    <p className="text-gray-600 text-sm mt-2">
      Ingredientes:{" "}
      {ingredients.map((ingredient) => ingredient.name).join(", ")}
    </p>
  );
}
