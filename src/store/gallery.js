import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import { galleries } from "#constants";

const DEFAULT_GALLERY = galleries.library;

const useGalleryStore = create(
    immer(set => ({
        activeGallery: DEFAULT_GALLERY,

        setActiveGallery: (gallery) =>
            set((state) => {
                state.activeGallery = gallery;
            }),

        setActiveGalleryByType: (type) => {
                const gallery = gallery[type];
                if(!gallery) return;
                set((state) => {
                    state.activeGallery = gallery;
                })
            },

        resetActiveGallery: () =>
            set((state) => {
                state.activeGallery = DEFAULT_GALLERY;
            }),
    })),
);

export default useGalleryStore;