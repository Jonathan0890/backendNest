export class CreatePetDto {
  name: string;
  type: string;
  breed?: string;
  age?: number;
  ownerId: number;
}
