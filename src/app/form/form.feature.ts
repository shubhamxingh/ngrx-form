import { createFeature } from "@ngrx/store";
import { reducer } from "./form.reducer";

export const feature = createFeature({
    name: 'form',
    reducer
})