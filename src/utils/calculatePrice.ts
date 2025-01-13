import { Ingredients } from "../types/ingredients";

export const calculatePrice = (
     basePrice: number,
     selectedSize: string,
     selectedIngredients: Ingredients[] = [],
     includeIngredientsCost: boolean = false
): number => {
    let adjustedPrice = basePrice;

    if(selectedSize === 'mediana') {
        adjustedPrice += basePrice * 0.2;
    } else if ( selectedSize === 'familiar') {
        adjustedPrice += basePrice * 0.4;
    }

    if ( includeIngredientsCost) {
        adjustedPrice += selectedIngredients.length * 1.5;
    }

    return parseFloat(adjustedPrice.toFixed(2));
};
