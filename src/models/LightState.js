export default class LightState {
  constructor(id, color, duration, next) {
    this.id = id; // Just in case for comparing id
    this.color = color; // Color settings if key is not supposed to be a color
    this.duration = duration; // How long state may appear normally in milliseconds
    this.next = next; // next state id or key
  }
}