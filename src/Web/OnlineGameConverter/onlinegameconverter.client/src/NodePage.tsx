import { nodeWheatherForecastClick, nodeOrbitalClick, nodeOrbitalIClick, nodeOrbitalIClickCanlel } from "./NodaData";


export const NodePage = () => {
    return (
        <><form>
        </form><button onClick={nodeWheatherForecastClick}>Weather Click</button><button onClick={nodeOrbitalClick}>ORBFORECAST</button><button onClick={nodeOrbitalIClickCanlel}>INITIAL</button></>);
};

