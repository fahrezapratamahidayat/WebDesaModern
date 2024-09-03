import { GambarGaleri } from "@prisma/client";
import { create } from "zustand";

type GaleriStoreState = {
    editingGaleri: GambarGaleri | null;
    deletingGaleri: GambarGaleri | null;
    formMode: 'create' | 'update' | 'delete';
    isDialogOpen: boolean;
    seteditingGaleri: (galeri: GambarGaleri) => void;
    openCreateDialog: () => void;
    openDeleteDialog: (galeri: GambarGaleri) => void;
    resetForm: () => void;
    closeDialog: () => void;
}


export const useGaleriStore = create<GaleriStoreState>((set) => ({
    editingGaleri: null,
    deletingGaleri: null,
    formMode: 'create',
    isDialogOpen: false,
    seteditingGaleri: (galeri: GambarGaleri) => set({ editingGaleri: galeri, formMode: 'update', isDialogOpen: true }),
    openCreateDialog: () => set({ editingGaleri: null, formMode: 'create', isDialogOpen: true }),
    openDeleteDialog: (galeri: GambarGaleri) => set({ deletingGaleri: galeri, formMode: 'delete', isDialogOpen: true }),
    resetForm: () => set({ editingGaleri: null, formMode: 'create' }),
    closeDialog: () => set({ isDialogOpen: false, editingGaleri: null, formMode: 'create' }),
}));