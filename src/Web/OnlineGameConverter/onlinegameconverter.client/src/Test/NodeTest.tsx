import { getTragingSymbols } from "../TradingMetods";

const btnClick = async () => {
    console.log("SSS");
    var a = new AbortController();
    var s = getTragingSymbols(a);
    console.log(s);
}



export const NodeTest = () => {
    return (
        <><form>
        </form><button onClick={btnClick}>Trading</button><button>Server</button><button>Client</button><button>InitiaL</button></>);
};

