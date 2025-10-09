import { getTragingSymbols, getTradingData } from  "../Algorithms/Trading/TradingMetods"

const btnClick = async () => {
    console.log("SSS");
    var a = new AbortController();
    var s = await getTragingSymbols(a);
    console.log(s);
}
const btnDClick = async () => {
    console.log("SSS");
    var a = new AbortController();
    var dt = { period: "1 day", begin: 44929, end: 44944, symbol: "AAPL" };
    var s = await getTradingData(dt, a)
    console.log(s);
}




export const NodeTest = () => {
    return (
        <><form>
        </form><button onClick={btnClick}>Initial</button><button onClick={btnDClick}>Server</button><button>Client</button><button>InitiaL</button></>);
};

