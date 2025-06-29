import LightState from "./LightState"

const pedestrianLightStates = {
    stop    : new LightState("stop", "red", 6000, "walk"),
    walk    : new LightState("walk", "green", 5000, "stop")
}

export default pedestrianLightStates