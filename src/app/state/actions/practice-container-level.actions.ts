import { Article } from "@models/article.model";
import { createAction, props } from "@ngrx/store";

export const initialise = createAction("[Practice Container] Init");
export const ready = createAction("[Practice Container] Ready", props<{ articles: Article[] }>());
export const nextArticle = createAction("[Practice Container] Next Article");
