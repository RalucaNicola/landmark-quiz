import SceneView from '@arcgis/core/views/SceneView';

let view: SceneView = null;

export function setGlobalView(sceneView: SceneView) {
  view = sceneView;
}

export function getGlobalView() {
  return view;
}

export function getLayerById(id: string) {
  return view.map.findLayerById(id);
}