import LightState from "./LightState"

const TrafficLightStates = {
    red     : new LightState("red", "red", 5000, "green"),
    yellow  : new LightState("yellow", "yellow", 4000, "red"),
    green   : new LightState("green", "green", 2000, "yellow")
}

export default TrafficLightStates