/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  drausen1: {
    image: '//Knabber2033.github.io/vrview/pics/drausen1c.jpg',
    preview: '//Knabber2033.github.io/vrview/pics/drausen1c.jpg',
    hotspots: {
      drausen2: {
        pitch: 0,
        yaw: 130,
        radius: 0.05,
        distance: 1
      }
    }
  },
  drausen2: {
    image: '//Knabber2033.github.io/vrview/pics/drausen2c.jpg',
    preview: '//Knabber2033.github.io/vrview/pics/drausen2c.jpg',
    hotspots: {
      drausen1: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1
      }
    }
  },
};

function onLoad() {
  vrView = new VRView.Player('#hotspot', {
    image: '//Knabber2033.github.io/vrview/pics/drausen1c.jpg',
    preview: '//Knabber2033.github.io/vrview/pics/drausen1c.jpg',
    is_stereo: true,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('error', onVRViewError);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('drausen1');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onHotspotClick(e) {
  console.log('onHotspotClick', e.id);
  if (e.id) {
    loadScene(e.id);
  }
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: true,
    is_autopan_off: true
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);
