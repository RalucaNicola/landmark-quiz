import { setSelectedLandmark } from './landmarkSelectionSlice';
import { getGlobalView } from '../../globals';
import { AppDispatch } from '../../storeConfiguration';
import { Extent, Mesh, Polygon } from '@arcgis/core/geometry';
import { layerConfig } from '../../../config';
import { setError } from '../error-messaging/errorSlice';
import { setCountryToHashParameters } from '../../../utils/URLHashParams';
import { getRandomLandmarkQuestion } from '../questions/questionsInterface';
import { getLandmarksLayer } from '../map/landmarksLayerInit';

export const selectRandomLandmark = () => async (dispatch: AppDispatch) => {
    const view = getGlobalView();
    const landmarksLayer = getLandmarksLayer();
    const landmark = getRandomLandmarkQuestion();

    if (landmark && landmarksLayer) {
        const { id } = landmark;
        const { features } = await landmarksLayer.queryFeatures({ where: `${layerConfig.idField} = '${id}'`, outFields: [], returnGeometry: true });
        const { geometry } = features[0];
        await view.goTo({ target: geometry.extent as Extent, tilt: 45 });
        dispatch(setSelectedLandmark(landmark));
    }

    // if (view) {
    //     const layer = view.map.findLayerById(layerConfig.id);
    //     if (layer) {
    //     const { features } = await layer.queryFeatures({ where: '1=1', outFields: ['*'] });
    //     const randomIndex = Math.floor(Math.random() * features.length);
    //     const { attributes, geometry } = features[randomIndex];
    //     const { name } = attributes;
    //     dispatch(setSelectedCountry({ name }));
    //     if (name) {
    //         try {
    //         applyFeatureHighlight(geometry as Polygon);
    //         setCountryToHashParameters(name);
    //         } catch (error) {
    //         dispatch(setError({ name: error.name, message: 'Country not found.' }));
    //         setCountryToHashParameters(null);
    //         }
    //     } else {
    //         removeFeatureHighlight();
    //         setCountryToHashParameters(null);
    //     }
    //     dispatch(setSelectedCountryFinishedLoading());
    //     }
}


// export const highlightCountryFromMap = (payload: CountryState) => async (dispatch: AppDispatch) => {
//   const { name, geometry } = payload;
//   dispatch(setSelectedCountry({ name }));
//   if (name) {
//     try {
//       applyFeatureHighlight(geometry);
//       setCountryToHashParameters(name);
//     } catch (error) {
//       dispatch(setError({ name: error.name, message: 'Country not found.' }));
//       setCountryToHashParameters(null);
//     }
//   } else {
//     removeFeatureHighlight();
//     setCountryToHashParameters(null);
//   }
//   dispatch(setSelectedCountryFinishedLoading());
// };

// export const highlightCountryFromList = (payload: CountryState) => async (dispatch: AppDispatch) => {
//   const view = getGlobalView();
//   const layer = getCountriesLayer();
//   const { name } = payload;
//   dispatch(setSelectedCountry({ name }));
//   if (name) {
//     try {
//       const result = await layer.queryFeatures({
//         where: `${layerConfig.field} = '${name}'`,
//         returnGeometry: true,
//         outFields: [layerConfig.field]
//       });
//       if (result.features.length > 0) {
//         const [feature] = result.features;
//         applyFeatureHighlight(feature.geometry as Polygon);
//         const { extent } = feature.geometry;
//         const expand = extent.width < 15000000 && extent.height < 15000000;
//         view?.goTo(
//           {
//             target: expand ? extent.expand(1.7) : extent
//           },
//           { animate: false }
//         );
//         setCountryToHashParameters(name);
//       } else {
//         setCountryToHashParameters(null);
//         dispatch(setError({ name: 'Country not found.', message: 'No results returned from the query' }));
//       }
//     } catch (error) {
//       setCountryToHashParameters(null);
//       dispatch(setError({ name: 'Country not found.', message: error.details.messages[0] }));
//     }
//   } else {
//     setCountryToHashParameters(null);
//     removeFeatureHighlight();
//   }
//   dispatch(setSelectedCountryFinishedLoading());
// };

// export const highlightCountryAtStart = (payload: CountryState) => async (dispatch: AppDispatch) => {
//   const layer = getCountriesLayer();
//   const { name } = payload;
//   dispatch(setSelectedCountry({ name }));

//   if (name) {
//     try {
//       const result = await layer.queryFeatures({
//         where: `${layerConfig.field} = '${name}'`,
//         returnGeometry: true,
//         outFields: [layerConfig.field]
//       });
//       if (result.features.length > 0) {
//         const [feature] = result.features;
//         applyFeatureHighlight(feature.geometry as Polygon);
//       } else {
//         setCountryToHashParameters(null);
//         dispatch(setError({ name: 'Country not found.', message: 'No results returned from the query' }));
//       }
//     } catch (error) {
//       setCountryToHashParameters(null);
//       dispatch(setError({ name: 'Country not found.', message: error.details.messages[0] }));
//     }
//   } else {
//     removeFeatureHighlight();
//   }
//   dispatch(setSelectedCountryFinishedLoading());
// };
