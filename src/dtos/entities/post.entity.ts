export class PostEntity {
  id: number;

  title: string;

  content: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  userId: number;
}
