import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import { locations } from "#constants";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
    immer(set => ({
        activeLocation: DEFAULT_LOCATION,

        setActiveLocation: (location) =>
            set((state) => {
                state.activeLocation = location;
            }),

        setActiveLocationByType: (type) => {
                for (const key in locations) {
                    if (!Object.prototype.hasOwnProperty.call(locations, key)) continue;
                    const location = locations[key];
                    if (location.type === type) {
                        set((state) => {
                            state.activeLocation = location;
                        })
                        break;
                    }
                }
            },

        resetActiveLocation: () =>
            set((state) => {
                state.activeLocation = DEFAULT_LOCATION;
            }),
    })),
);

export default useLocationStore;