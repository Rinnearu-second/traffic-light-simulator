export default class LightState {
  constructor(id, color, duration, next) {
    this.id = id; // Just in case you want to compare id
    this.color = color;
    this.duration = duration;
    this.next = next;
  }
}