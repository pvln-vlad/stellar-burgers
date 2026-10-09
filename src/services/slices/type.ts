import type { SerializedError } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils-types';

export type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: SerializedError | null;
};
