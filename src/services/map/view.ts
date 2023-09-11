
import { AppDispatch } from '../../store/storeConfiguration';
import { setViewLoaded } from '../../store/loadingSlice';
import { setError } from '../../store/errorSlice';
import { initializeLandmarksLayer } from './landmarksLayer';
import { initializeViewEventListeners } from './eventListeners';
import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import { setLowPolyLayers } from './lowPolyLayers';
import { Point } from '@arcgis/core/geometry';
import { setLoadingStatus } from '../loader';

let view: SceneView = null;

export function setView(sceneView: SceneView) {
    view = sceneView;
}

export function getView() {
    return view;
}

export function destroyView() {
    if (view) {
        view.destroy();
        view = null;
    }
}

export const initializeView = (divRef: HTMLDivElement) => async (dispatch: AppDispatch) => {
    try {
        const scene = new WebScene({
            ground: {
                opacity: 1,
                surfaceColor: [255, 255, 255]
            },
        })
        const view = new SceneView({
            container: divRef,
            map: scene,
            spatialReference: {
                wkid: 4326
            },
            ui: {
                components: []
            },
            environment: {
                // background: {
                //     type: "color",
                //     color: [0, 0, 0, 0]
                // },
                lighting: {
                    directShadowsEnabled: true,
                    type: "virtual"
                },
                // starsEnabled: false,
                // atmosphereEnabled: false
            },
            qualityProfile: "high",
            camera: {
                position: new Point({
                    longitude: -40.87121836,
                    latitude: 18.27310155,
                    z: 25512342.69650
                }),
                heading: 0.00,
                tilt: 0.10
            },
            popup: {
                dockEnabled: true,
                dockOptions: {
                    buttonEnabled: false,
                    breakpoint: false
                },
                highlightEnabled: false,
                defaultPopupTemplateEnabled: false,
                autoOpenEnabled: false
            }
        });

        await view.when(async () => {
            setView(view);
            const lowPolyLayersLoaded = await setLowPolyLayers(view);
            const landmarksLayerLoaded = await initializeLandmarksLayer(view);
            if (lowPolyLayersLoaded && landmarksLayerLoaded) {
                dispatch(setLoadingStatus({ viewLoaded: true }));
            }
            (window as any).view = view;
            //dispatch(initializeViewEventListeners());
        });
    } catch (error) {
        const { message } = error;
        dispatch(setError({ name: 'Error on map', message: message }));
    }
};