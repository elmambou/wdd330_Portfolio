import { getLocation } from './utilities.js';
import quake from './quake.js';
import localQView from './localQView.js';

// Quake controller
export default class localQController {
  constructor(parent, position = null) {
    this.parent = parent;
    this.parentElement = null;
    this.position = position || {
      lat: 0,
      lon: 0
    };
    this.quakes = new quake();
    this.localQView = new localQView();
  }
  async init() {
    this.parentElement = document.querySelector(this.parent);
    await this.initPos();
    this.getquakesByRadius(100);
  }
  async initPos() {
    if (this.position.lat === 0) {
      try {
        const posFull = await getLocation();
        this.position.lat = posFull.coords.latitude;
        this.position.lon = posFull.coords.longitude;
        //console.log(posFull);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getquakesByRadius(radius = 100) {
    //set loading message
    this.parentElement.innerHTML = '<li>Loading...</li>';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      100
    );
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    this.parentElement.addEventListener('touchend', e => {
      this.getquakeDetails(e.target.dataset.id);
    });
  }
  async getquakeDetails(quakeId) {
    const quake = this.quakes.getquakeById(quakeId);
    this.localQView.renderquake(quake, this.parentElement);
  }
}
