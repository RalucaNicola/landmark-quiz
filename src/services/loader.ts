import { AppMode, setMode } from "../store/appModeSlice";
import { AppDispatch } from "../store/storeConfiguration";

interface Loaded {
    viewLoaded?: boolean;
    questionsLoaded?: boolean;
};

let loadingStatus = {
    viewLoaded: false,
    questionsLoaded: false
}

export const setLoadingStatus = ({ viewLoaded, questionsLoaded }: Loaded) => async (dispatch: AppDispatch) => {

    if (viewLoaded) {
        loadingStatus = { ...loadingStatus, viewLoaded }
    }
    if (questionsLoaded) {
        loadingStatus = { ...loadingStatus, questionsLoaded }
    }
    if (loadingStatus.viewLoaded && loadingStatus.questionsLoaded) {
        dispatch(setMode(AppMode.Intro))
    }
};
