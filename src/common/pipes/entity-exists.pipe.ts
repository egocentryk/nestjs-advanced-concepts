import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common'

export function EntityExistPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipeCls implements PipeTransform {
    constructor(
      @Inject(entityCls)
      private entityRepository: { exists(condition: unknown): Promise<void> },
      // inline random type, but generally in normal application, this would likely
      // represent a repository provided by an ORM
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
      await this.entityRepository.exists({ where: { id: value } }) // throws if entity does not exist
      return value
    }
  }

  return EntityExistsPipeCls
}
