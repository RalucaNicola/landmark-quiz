import { AppDispatch } from "../../storeConfiguration";
import { layerConfig } from "../../../config";
import { getCountryFromHashParameters } from "../../../utils/URLHashParams";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import SceneView from "@arcgis/core/views/SceneView";

let landmarksLayer: SceneLayer = null;

export const initializeLandmarksLayer = async (view: SceneView) => {
    try {
        landmarksLayer = new SceneLayer({
            url: layerConfig.url
        });
        landmarksLayer.outFields = [layerConfig.idField];
        view.map.add(landmarksLayer);
        await landmarksLayer.load();
        return true;
    } catch (error) {
        console.error(error);
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