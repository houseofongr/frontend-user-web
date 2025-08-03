// stores/useUniverseStore.ts
import { create } from "zustand";
import { getUniverseTree } from "../../service/universeService";
import { SpaceType, useSpaceStore } from "./useSpaceStore";
import { PieceType, usePieceStore } from "./usePieceStore";
import { UniverseInfoType } from "../../types/universe";
import { useSoundStore } from "./useSoundStore";

// export interface UniverseType {
//   universeId: number;
//   innerImageId: number;
//   spaces: SpaceType[];
//   pieces: PieceType[];
// }

export interface UniverseType {
  universeId: number;
  thumbMusicId: number;
  thumbnailId: number;
  innerImageId: number;
  authorId: number;
  createdTime: number;
  updatedTime: number;
  view: number;
  like: number;
  title: string;
  description: string;
  author: string;
  category: Category;
  isMine: boolean;
  isLiked: boolean;
  hashtags: string[];
  spaces: SpaceType[];
  pieces: PieceType[];
}

export interface Category {
  id: number;
  eng: string;
  kor: string;
}


export interface Point {
  x: number;
  y: number;
}


export type SaveTargetType = null | "universe" | "space";

interface UniverseStore {
  universeId: number | null;
  universeInfo: UniverseInfoType | null;
  rootUniverse: UniverseType | null;
  activeInnerImageId: number | null;

  setUniverseId: (id: number) => void;
  setRootUniverse: (data: UniverseType) => void;
  setUniverseInfo: (data: UniverseInfoType) => void;

  setUniverseData: (
    innerImgId: number,
    existingSpaces: SpaceType[],
    existingPieces: PieceType[]
  ) => void;
  setActiveInnerImageId: (id: number) => void;
  setRootUniverseInnerImageId: (id: number) => void;
  resetUniverseStore: () => void;
  refreshUniverseData: () => Promise<void>;
}

export const useUniverseStore = create<UniverseStore>((set, get) => ({
  universeId: null,
  universeInfo: null,
  rootUniverse: null,
  activeInnerImageId: null,

  setUniverseId: (id) => set({ universeId: id }),
  setUniverseInfo: (universeInfo) => set({ universeInfo }),

  setRootUniverse: (data) => {
    set({ rootUniverse: data });
  },

  setUniverseData: (
    innerImgId: number,
    spaces: SpaceType[],
    pieces: PieceType[]
  ) => {
    useUniverseStore.getState().setActiveInnerImageId(innerImgId);
    useSpaceStore.getState().setExistingSpaces(spaces);
    usePieceStore.getState().setExistingPieces(pieces);
  },

  setActiveInnerImageId: (id) => set({ activeInnerImageId: id }),

  setRootUniverseInnerImageId: (id: number) =>
    set((state) => ({
      rootUniverse: state.rootUniverse
        ? { ...state.rootUniverse, innerImageId: id }
        : null,
    })),

  resetUniverseStore: () => {
    set({ universeId: null });
    set({ universeInfo: null });
    set({ rootUniverse: null });
    set({ activeInnerImageId: null });
    useSpaceStore.getState().resetSpaceStore();
    useSoundStore.getState().resetSoundStore();
    usePieceStore.getState().resetPieceStore();
  },

  refreshUniverseData: async () => {
    const universeId = get().universeId;
    if (universeId == null) return;

    const data: UniverseType = await getUniverseTree(universeId);
    set({ rootUniverse: data });
  },
}));
