import localQController from './localQController.js';
import buildNavigation from './routing.js';

const navElement = document.getElementById('mainNav');
buildNavigation(navElement);

// const mylocalQController = new localQController('#quakeList');
// mylocalQController.getQuakesByRadius();
