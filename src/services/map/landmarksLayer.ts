import { AppDispatch } from "../../store/storeConfiguration";
import { layerConfig } from "../../config";
import { getCountryFromHashParameters } from "../../utils/URLHashParams";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import SceneView from "@arcgis/core/views/SceneView";
import { setError } from "../../store/errorSlice";

let landmarksLayer: SceneLayer = null;

export const initializeLandmarksLayer = (view: SceneView) => async (dispatch: AppDispatch) => {
    try {
        landmarksLayer = new SceneLayer({
            url: layerConfig.url
        });
        landmarksLayer.outFields = [layerConfig.idField];
        view.map.add(landmarksLayer);
        await landmarksLayer.load();
        return true;
    } catch (error) {
        const { message } = error;
        dispatch(setError({ name: 'Error loading layer', message: message }));
        return false;
    }

    // const countryName = getCountryFromHashParameters();
    // if (countryName) {
    //     dispatch(highlightCountryAtStart({ name: countryName }));
    // }
}

export const getLandmarksLayer = () => {
    return landmarksLayer;
}