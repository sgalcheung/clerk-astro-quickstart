import { getContentById, getContents } from "../core/client";
import type { AllowedUser } from "../internals/AllowedUsers";
import type { NonMultilingual } from "../internals/NonMultilingualT";
import { SCHEMAS } from "./schemas";

export interface POST extends AllowedUser {
  title: NonMultilingual<string>
  text: NonMultilingual<string>
}

export async function getPosts() {
  return await getContents<POST>(SCHEMAS.POSTS);
}

export async function getPostById(id: string) {
  return await getContentById<POST>(SCHEMAS.POSTS, id);
}

