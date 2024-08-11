export class CommentEntity {
  id: number;

  content: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;

  parentId: number | null;

  userId: number;

  postId: number;
}
