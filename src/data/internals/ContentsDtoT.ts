import type { ContentDto } from './ContentDtoT'
import type { ContentsDto as SquidexContentsDto } from '@squidex/squidex'

export interface ContentsDto<T> extends SquidexContentsDto {
  items: Array<ContentDto<T>>
}
