import { create } from "zustand";

export interface PieceType {
  pieceId: number;
  parentSpaceId: number | null;
  innerImageId: number;
  depth: number;
  title: string;
  description: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  createdTime: number;
  updatedTime: number;
}

export type CreatePieceMethod = "coordination" | "image";

interface PieceStore {
  existingPieces: PieceType[];
  setExistingPieces: (pieces: PieceType[]) => void;

  currentPiece: PieceType | null; // 현재 선택된 피스 상태 추가
  setCurrentPiece: (piece: PieceType | null) => void; // setter도 추가
  setPieceInfo: (title: string, description: string, hidden: boolean) => void;
}

export const usePieceStore = create<PieceStore>((set) => ({
  existingPieces: [],
  setExistingPieces: (pieces) => set({ existingPieces: pieces }),

  currentPiece: null,
  setCurrentPiece: (piece) => set({ currentPiece: piece }),
  setPieceInfo: (title, description, hidden) =>
    set((state) => {
      if (!state.currentPiece) return {};

      const updatedPiece: PieceType = {
        ...state.currentPiece,
        title,
        description,
        // hidden,
      };

      return { currentPiece: updatedPiece };
    }),
}));
