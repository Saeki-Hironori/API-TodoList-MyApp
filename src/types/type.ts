export type TODO = {
  id: number;
  userId: string;
  title: string;
  status?: string;
  detail?: string;
  createdAt: Date;
  updatedAt?: Date;
  role: "USER" | "ADMIN";
};
