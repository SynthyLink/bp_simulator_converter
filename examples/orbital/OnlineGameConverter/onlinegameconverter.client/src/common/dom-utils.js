"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = exports.Selector = exports.Color = exports.Vector = void 0;
const coordinates = ['x', 'y', 'z', 'w'];
const Vector = (props) => {
    var _a, _b;
    const start = (_a = props.start) !== null && _a !== void 0 ? _a : 0;
    const length = Math.min(4, (_b = props.length) !== null && _b !== void 0 ? _b : 4);
    const end = Math.min(start + length, props.vector.length);
    let components = [];
    for (let i = start; i < end; i++) {
        components.push(<label className="control-label">{coordinates[i - start]}</label>, <input type="number" step="0.05" value={props.vector[i]} onchange={(ev) => { props.vector[i] = Number.parseFloat(ev.target.value); }}/>);
    }
    return <span>
        {components}
    </span>;
};
exports.Vector = Vector;
const color_coordinates = ['r', 'g', 'b', 'a'];
const Color = (props) => {
    var _a, _b;
    const start = (_a = props.start) !== null && _a !== void 0 ? _a : 0;
    const length = Math.min(4, (_b = props.length) !== null && _b !== void 0 ? _b : 4);
    const end = Math.min(start + length, props.color.length);
    let components = [];
    for (let i = start; i < end; i++) {
        components.push(<label className="control-label">{color_coordinates[i - start]}</label>, <input type="number" step="0.05" value={props.color[i]} onchange={(ev) => { props.color[i] = Number.parseFloat(ev.target.value); }}/>);
    }
    return <span>
        {components}
    </span>;
};
exports.Color = Color;
const Selector = (props) => {
    let { value, options, onchange, children } = props, rest = __rest(props, ["value", "options", "onchange", "children"]);
    value = value !== null && value !== void 0 ? value : Object.keys(props.options)[0];
    value = value.toString();
    let optionsElements = [];
    for (let key in props.options) {
        if (key === value)
            optionsElements.push(<option value={key} selected>{props.options[key]}</option>);
        else
            optionsElements.push(<option value={key}>{props.options[key]}</option>);
    }
    return <select onchange={(ev) => {
            let e = ev.target;
            onchange(e.options[e.selectedIndex].value);
        }} {...rest}>
        {optionsElements}
    </select>;
};
exports.Selector = Selector;
const CheckBox = (props) => {
    let { value, onchange, children } = props, rest = __rest(props, ["value", "onchange", "children"]);
    return <input type="checkbox" checked={value ? true : undefined} onchange={(ev) => { onchange(ev.target.checked); }}/>;
};
exports.CheckBox = CheckBox;
//# sourceMappingURL=dom-utils.js.map