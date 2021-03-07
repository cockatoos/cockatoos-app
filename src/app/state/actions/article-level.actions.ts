import { Article } from "@models/article.model";
import { createAction, props } from "@ngrx/store";

export const initialise = createAction("Initialise Article", props<{ article: Article }>());

export const isReady = createAction("Article Ready");

export const notSupported = createAction("Not Supported");

export const nextPhrase = createAction("Next Phrase");
