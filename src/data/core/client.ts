import { SquidexClient } from '@squidex/squidex'
import { InMemoryTokenStore } from '@squidex/squidex/dist/wrapper/SquidexClient.js'

import type { ContentDto } from '../internals/ContentDtoT'
import type { ContentsDto } from '../internals/ContentsDtoT'
import type { SCHEMAS } from '../models/schemas'

let squidexClient: SquidexClient = getSquidexClient()

export function getSquidexClient(): SquidexClient {
  return new SquidexClient({
    appName: import.meta.env.SQUIDEX_APP_NAME,
    clientId: import.meta.env.SQUIDEX_CLIENT_ID,
    clientSecret: import.meta.env.SQUIDEX_CLIENT_SECRET,
    url: import.meta.env.SQUIDEX_URL,
    tokenStore: new InMemoryTokenStore(),
  })
}

// export const TIMEOUT_IN_SECONDS = 10;

/** Asset Handling */

export const getAssetById = async (assetId: string) => await squidexClient.assets.getAsset(assetId)

/** Generic Content Handling */
export const getContents = async <T>(schema: SCHEMAS | string) =>
  (await squidexClient.contents.getContents(schema)) as ContentsDto<T>

// Same effect, different writing
// export async function getContents<T>(schema: SCHEMAS | string): Promise<ContentsDto<T>> {
// 	const result = await client.contents.getContents(schema, {});
// 	return result as ContentsDto<T>;
// }

export const getContentById = async <T>(schema: SCHEMAS | string, id: string) =>
  (await squidexClient.contents.getContent(schema, id)) as ContentDto<T>

export const getContentsByIds = async <T>(schema: SCHEMAS | string, ids: string) =>
  (await squidexClient.contents.getContents(schema, { ids })) as ContentsDto<T>

export async function getReferences<T extends object>(schema: SCHEMAS | string, id: string): Promise<ContentsDto<T>> {
  const fieldArray = Object.keys({} as T)
  const fields = fieldArray.join(',')
  const references = await squidexClient.contents.getReferences(schema, id, { fields })
  return references as ContentsDto<T>
}

export async function getReferencing<T extends object>(schema: SCHEMAS | string, id: string): Promise<ContentsDto<T>> {
  const fieldArray = Object.keys({} as T)
  const fields = fieldArray.join(',')
  const referencing = await squidexClient.contents.getReferencing(schema, id, { fields })
  return referencing as ContentsDto<T>
}
