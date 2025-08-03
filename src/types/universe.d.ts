export interface UniverseInfoType {
  id: number;
  thumbnailId: number;
  thumbMusicId: number;
  authorId: number;
  createdTime: number;
  view: number;
  likeCnt: number;
  isLiked: null;
  title: string;
  description: string;
  author: string;
  hashtags: string[];
}

export type Category = {
  id: number;
  eng: string;
  kor: string;
};

export type RandomUniverse = {
  id: number;
  thumbnailId: number;
  title: string;
  author: string;
};
