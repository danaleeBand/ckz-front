export type UserGetResponse = {
  name: string;
  profileImageUrl: string;
  isChecky: boolean;
};

export type UserInfo = {
  id: number;
  name: string;
  profileImageUrl: string;
  isChecky: boolean;
  createdAt: Date;
  updatedAt: Date;
};
