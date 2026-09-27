var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// experiments/trading/node_modules/linked-list-typescript/lib/src/index.js
var require_src = __commonJS({
  "experiments/trading/node_modules/linked-list-typescript/lib/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LinkedList = class {
      constructor(...values) {
        this._head = this._tail = null;
        this._length = 0;
        if (values.length > 0) {
          values.forEach((value) => {
            this.append(value);
          });
        }
      }
      *iterator() {
        let currentItem = this._head;
        while (currentItem) {
          yield currentItem.value;
          currentItem = currentItem.next;
        }
      }
      [Symbol.iterator]() {
        return this.iterator();
      }
      get head() {
        return this._head ? this._head.value : null;
      }
      get tail() {
        return this._tail ? this._tail.value : null;
      }
      get length() {
        return this._length;
      }
      // Adds the element at a specific position inside the linked list
      insert(val, previousItem, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
          return false;
        }
        let newItem = new LinkedListItem(val);
        let currentItem = this._head;
        if (!currentItem) {
          return false;
        } else {
          while (true) {
            if (currentItem.value === previousItem) {
              newItem.next = currentItem.next;
              newItem.prev = currentItem;
              currentItem.next = newItem;
              if (newItem.next) {
                newItem.next.prev = newItem;
              } else {
                this._tail = newItem;
              }
              this._length++;
              return true;
            } else {
              if (currentItem.next) {
                currentItem = currentItem.next;
              } else {
                return false;
              }
            }
          }
        }
      }
      // Adds the element at the end of the linked list
      append(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
          return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._tail) {
          this._head = this._tail = newItem;
        } else {
          this._tail.next = newItem;
          newItem.prev = this._tail;
          this._tail = newItem;
        }
        this._length++;
        return true;
      }
      // Add the element at the beginning of the linked list
      prepend(val, checkDuplicates = false) {
        if (checkDuplicates && this.isDuplicate(val)) {
          return false;
        }
        let newItem = new LinkedListItem(val);
        if (!this._head) {
          this._head = this._tail = newItem;
        } else {
          newItem.next = this._head;
          this._head.prev = newItem;
          this._head = newItem;
        }
        this._length++;
        return true;
      }
      remove(val) {
        let currentItem = this._head;
        if (!currentItem) {
          return;
        }
        if (currentItem.value === val) {
          this._head = currentItem.next;
          this._head.prev = null;
          currentItem.next = currentItem.prev = null;
          this._length--;
          return currentItem.value;
        } else {
          while (true) {
            if (currentItem.value === val) {
              if (currentItem.next) {
                currentItem.prev.next = currentItem.next;
                currentItem.next.prev = currentItem.prev;
                currentItem.next = currentItem.prev = null;
              } else {
                currentItem.prev.next = null;
                this._tail = currentItem.prev;
                currentItem.next = currentItem.prev = null;
              }
              this._length--;
              return currentItem.value;
            } else {
              if (currentItem.next) {
                currentItem = currentItem.next;
              } else {
                return;
              }
            }
          }
        }
      }
      removeHead() {
        let currentItem = this._head;
        if (!currentItem) {
          return;
        }
        if (!this._head.next) {
          this._head = null;
          this._tail = null;
        } else {
          this._head.next.prev = null;
          this._head = this._head.next;
          currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
      }
      removeTail() {
        let currentItem = this._tail;
        if (!currentItem) {
          return;
        }
        if (!this._tail.prev) {
          this._head = null;
          this._tail = null;
        } else {
          this._tail.prev.next = null;
          this._tail = this._tail.prev;
          currentItem.next = currentItem.prev = null;
        }
        this._length--;
        return currentItem.value;
      }
      first(num) {
        let iter = this.iterator();
        let result = [];
        let n = Math.min(num, this.length);
        for (let i = 0; i < n; i++) {
          let val = iter.next();
          result.push(val.value);
        }
        return result;
      }
      toArray() {
        return [...this];
      }
      isDuplicate(val) {
        let set = new Set(this.toArray());
        return set.has(val);
      }
    };
    exports.LinkedList = LinkedList;
    var LinkedListItem = class {
      constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
      }
    };
    exports.LinkedListItem = LinkedListItem;
  }
});

// experiments/trading/node_modules/queue-typescript/lib/src/index.js
var require_src2 = __commonJS({
  "experiments/trading/node_modules/queue-typescript/lib/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var linked_list_typescript_1 = require_src();
    var Queue2 = class extends linked_list_typescript_1.LinkedList {
      constructor(...values) {
        super(...values);
      }
      get front() {
        return this.head;
      }
      enqueue(val) {
        this.append(val);
      }
      dequeue() {
        return this.removeHead();
      }
    };
    exports.Queue = Queue2;
  }
});

// experiments/trading/typescript.ts
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

// src/Web/AspireTradingApp/frontend/src/Library/AliasName.ts
var AliasName = class {
  constructor(alias, name) {
    this.name = "";
    this.alias = alias;
    this.name = name;
  }
  getAlias() {
    return this.alias;
  }
  getAliasNameValue() {
    return this.alias.getAliasValue(this.name);
  }
  setAliasNameValue(value) {
    if (value != void 0) {
      this.alias.setAliasValue(this.name, value);
    }
  }
  getNameOfAliasName() {
    return this.name;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/ErrorHandler/OwnError.ts
var OwnError = class {
  constructor(name, message, stack) {
    this.name = "";
    this.message = "";
    if (name != void 0) this.name = name;
    this.message = message;
    this.stack = stack;
    this.init();
  }
  init() {
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/ErrorHandler/OwnNotImplemented.ts
var OwnNotImplemented = class extends OwnError {
  constructor(m) {
    super(m, "Method not implemented", void 0);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/MeasurementsComparator.ts
var MeasurementsComparator = class {
  constructor(performer2) {
    this.performer = performer2;
  }
  compare(x, y) {
    if (x == y) {
      return 0;
    }
    if (this.performer.implementsType(x, "IDataConsumer")) {
      var dcx = x;
      if (this.isSource(dcx, y)) {
        return 1;
      }
    }
    if (this.performer.implementsType(y, "IDataConsumer")) {
      var dcy = y;
      if (this.isSource(dcy, x)) {
        return -1;
      }
    }
    return 0;
  }
  isSource(dc, m) {
    var measurements = dc.getAllMeasurements();
    var count = measurements.length;
    for (var i = 0; i < count; i++) {
      var x = measurements[i];
      if (m == x) {
        return true;
      }
      if (this.performer.implementsType(x, "IDataConsumer")) {
        var dataConsumer = x;
        if (this.isSource(dataConsumer, m)) {
          return true;
        }
      }
    }
    return false;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Sort/SortingAlgorithms.ts
var SortingAlgorithms = class {
  constructor() {
  }
  mergesort(unsorted, comparator) {
    if (unsorted.length <= 1) {
      return unsorted;
    }
    var left = [];
    var right = [];
    var middle = Math.floor(unsorted.length / 2);
    for (var i = 0; i < middle; i++) {
      left.push(unsorted[i]);
    }
    for (var j = middle; j < unsorted.length; j++) {
      right.push(unsorted[j]);
    }
    left = this.mergesort(left, comparator);
    right = this.mergesort(right, comparator);
    let result = this.merge(left, right, comparator);
    return result;
  }
  merge(left, right, comparator) {
    var result = [];
    while (left.length > 0 || right.length > 0) {
      if (left.length > 0 && right.length > 0) {
        if (comparator.compare(left[0], right[0]) <= 0) {
          result.push(left[0]);
          left.shift();
        } else {
          result.push(right[0]);
          right.shift();
        }
      } else if (left.length > 0) {
        result.push(left[0]);
        left.shift();
      } else if (right.length > 0) {
        result.push(right[0]);
        right.shift();
      }
    }
    return result;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Generic/ActionArray.ts
var ActionArray = class {
  constructor() {
    this.actions = [];
    this.typeName = "ActionArray";
    this.types = ["IAction", "IObject", "ActionArray"];
    this.performer = new Performer();
  }
  isEmptyAction() {
    return this.actions.length == 0;
  }
  addAction(action) {
    if (this.performer.isEmptyAction(action)) return;
    if (action === void 0) return;
    this.actions.push(action);
  }
  removeAction(action) {
    if (this.performer.isEmptyAction(action)) return;
    if (action === void 0) return;
    this.performer.remove(this.actions, action);
  }
  clearActions() {
    this.actions = [];
  }
  getClassName() {
    return this.typeName;
  }
  imlplementsType(type) {
    return this.types.indexOf(type) > 0;
  }
  getName() {
    return "";
  }
  action() {
    for (let action of this.actions)
      action.action();
  }
  addActionArray(actions) {
    for (let action of actions) {
      this.addAction(action);
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/DateTime/DateTimeConverter.ts
var DateTimeConverter = class {
  constructor() {
    this.baseDays = 25569;
    this.coeff = 864e5;
    this.coeffI = 1 / 864e5;
    this.off = 0;
    const baseDate = /* @__PURE__ */ new Date(0);
    this.off = baseDate.getTimezoneOffset() * 6e4;
  }
  toOADate(date) {
    var t = date.getTime();
    t *= this.coeffI;
    t += this.baseDays;
    return t;
  }
  fromOADate(date) {
    var x = date - this.baseDays;
    x *= this.coeff;
    return new Date(x + this.off);
  }
  fromSrting(s) {
    return Date.parse(s);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Performer.ts
var Performer = class {
  constructor(factory2) {
    this.typeName = "Performer";
    this.types = ["IObject", "IFactoryConsumer", "Performer"];
    this.name = "";
    this.a = 0;
    this.b = false;
    this.s = "";
    this.sorting = new SortingAlgorithms();
    this.dt = new DateTimeConverter();
    this.start = new Start();
    this.stop = new Stop();
    this.load = new Load();
    this.unload = new Unload();
    this.mCompatator = new MeasurementsComparator(this);
    if (factory2 !== void 0) this.factory = factory2;
  }
  getName() {
    return this.name;
  }
  getClassName() {
    return this.typeName;
  }
  imlplementsType(type) {
    return this.types.includes(type);
  }
  setConsumerFactory(factory2) {
    if (factory2 !== void 0) this.factory = factory2;
  }
  getConsumerFactory() {
    return this.factory;
  }
  toShidtedString(str, shift) {
    if (str.startsWith(shift)) {
      return str.substring(shift.length).replace('"', "").trim();
    }
    return null;
  }
  getObjectArrayFromNode(node, func) {
    let a = new ArrayOfObjects(func, this);
    return a.getArray(node);
  }
  static getCurrentDesktop() {
    return this.desktop;
  }
  static setCurrentDesktop(desktop2) {
    this.desktop = desktop2;
  }
  async startAsync(collection, controller) {
    let r = [];
    let t = this.getAll(collection, "IStartTask");
    for (let task of t) {
      r.push(task.startAsync(controller));
    }
    await Promise.all(r);
  }
  toOneDimensdional(t) {
    let x = [];
    for (let xx of t) {
      x.concat(xx);
    }
    return x;
  }
  createMirrorArray(x, y, d) {
    for (var i = 0; i < y.length; i++) {
      x.push(d);
    }
  }
  createMirrorArray2(x, y, d) {
    for (var i = 0; i < y.length; i++) {
      let z = [];
      let xx = y[i];
      this.createMirrorArray(z, xx, d);
      x.push(z);
    }
  }
  getActionFromNode(node, func) {
    let act = this.getObjectArrayFromNode(node, func);
    if (act.length == 0) return void 0;
    if (act.length == 1) return act[0];
    let action = new ActionArray();
    action.addActionArray(act);
    return action;
  }
  //Recursive action
  recursiveNodeAction(node, action) {
    let children = node.getNodesT();
    for (let child of children) {
      this.recursiveNodeAction(child, action);
    }
    let t = node.getNodeValueT();
    action.actionT(t);
  }
  addUnique(list, item) {
    for (let x of list) {
      if (x == item) {
        return false;
      }
    }
    list.push(item);
    return true;
  }
  toShiftString(str, shift) {
    {
      if (str.indexOf(shift) == 0) {
        return str.substring(shift.length);
      }
      return "";
    }
  }
  cut(t, n) {
    let s = [];
    for (let i = 0; i < n; i++) {
      s.push(t[i]);
    }
    return s;
  }
  addCut(list, t, n) {
    var tt = t;
    if (t.length > n) {
      tt = this.cut(t, n);
    }
    list.push(tt);
  }
  getAllIObjects(categoryObjects, arrows, objects) {
    for (let o of categoryObjects) {
      var l = this.convertObject(o, "IObject");
      if (l.length > 0) {
        objects.push(l[0]);
      }
    }
    for (let a of arrows) {
      var l = this.convertObject(a, "IObject");
      if (l.length > 0) {
        objects.push(l[0]);
      }
    }
  }
  setPrinter(printer) {
    this.printer = printer;
  }
  getAll(collection, type) {
    let t = [];
    let obj = collection.getObjectCollection();
    for (let o of obj) {
      var x = this.convertObject(o, type);
      if (x.length > 0) t.push(x[0]);
    }
    return t;
  }
  reoplaceArrayValue(t, s) {
    if (s.length == 0) {
      if (t.length > 0) {
        t.pop();
        return;
      }
    }
    let ss = s[0];
    if (t.length > 0) {
      t[0] = ss;
      return;
    }
    t.push(ss);
  }
  executeAction(acttion) {
    if (acttion === void 0) return;
    acttion.action();
  }
  sumOfActions(first, second) {
    var act = new ActionArray();
    if (first === void 0) {
      return second;
    } else {
      act.addAction(first);
      if (second === void 0) {
        return first;
      } else {
        act.addAction(second);
      }
    }
    return act;
  }
  setCheker(desktop2, check) {
    const objects = desktop2.getCategoryObjects();
    for (let object of objects) {
      if (this.implementsType(object, "ICheckHolder")) {
        var ch = object;
        ch.setCheck(check);
      }
    }
  }
  findMaxWithReduce(numbers) {
    if (numbers.length === 0) {
      return void 0;
    }
    const maxNumber = numbers.reduce((max, current) => current > max ? current : max, numbers[0]);
    return maxNumber;
  }
  //   k: number = 0;
  findMinWithReduce(numbers) {
    if (numbers.length === 0) {
      return void 0;
    }
    let minNumber = numbers.reduce(this.funcMin, numbers[0]);
    return minNumber;
  }
  funcMin(x, y) {
    return x < y ? x : y;
  }
  calculateAverage(numbers) {
    if (numbers.length === 0) {
      return 0;
    }
    const sum = numbers.reduce((sum2, p) => sum2 + p);
    return sum / numbers.length;
  }
  calculateAverageRobust(data) {
    const numbers = data.filter((item) => typeof item === "number");
    if (numbers.length === 0) {
      return 0;
    }
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
  }
  calculateAverageNull(data) {
    const numbers = data.filter((item) => typeof item === "number");
    if (numbers.length != data.length) {
      return void 0;
    }
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
  }
  getPrinter() {
    return this.printer;
  }
  print(object) {
    if (this.implementsType(object, "IPrintedObject")) {
      var pr = object;
      pr.print(this.printer);
      return;
    }
    this.printer.print(object);
  }
  convertTS(s, type) {
    if (this.implementsType(s, type)) {
      throw new OwnError("Illegal type", "Illegal type: " + type, void 0);
    }
    return s;
  }
  getByInterface(desktop2, type) {
    let co = desktop2.getCategoryObjects();
    let objects = [];
    for (var a of co) {
      if (this.implementsType(a, type)) {
        objects.push(a);
      }
    }
    return objects;
  }
  sortMeasurements(measurements) {
    return this.sorting.mergesort(measurements, this.mCompatator);
  }
  getByType(desktop2, type) {
    let co = desktop2.getCategoryObjects();
    let objects = [];
    for (var a of co) {
      if (this.implementsType(a, type)) {
        var ob = a;
        if (ob.getClassName() == type) {
          objects.push(a);
        }
      }
    }
    return objects;
  }
  updateFeedbackData(feedback) {
    if (feedback.isEmpty()) return;
    feedback.setFeedbacks();
  }
  updateChildrenData(dataConsumer) {
    let children = dataConsumer.getAllMeasurements();
    for (var child of children) {
      let o = child;
      if (this.implementsType(o, "IDataConsumer")) {
        let dc = child;
        this.updateChildrenData(dc);
      }
      child.updateMeasurements();
    }
  }
  convertArray(objects, type) {
    const s = [];
    for (let i = 0; i < objects.length; i++) {
      let o = objects[i];
      if (o.imlplementsType(type)) {
        s.push(o);
      }
    }
    return s;
  }
  convertMap(objects, type) {
    let map2 = /* @__PURE__ */ new Map();
    var ent = objects.entries();
    for (const [key, val] of ent) {
      let o = val;
      if (o.imlplementsType(type)) {
        map2.set(key, o);
      }
    }
    return map2;
  }
  getNamOfObject(obj) {
    var o = this.convertArray(obj, "IObject");
    return o[0].getName();
  }
  convertObject(s, type) {
    let ob = s;
    var t = [];
    if (ob === void 0) {
      return t;
    }
    if (ob.imlplementsType(type)) {
      var x = s;
      t.push(x);
    }
    return t;
  }
  getObjectCollectionArray(collection, type) {
    let t = [];
    var s = collection.getObjectCollection();
    for (let o of s) {
      let tt = this.convertObject(o, type);
      if (tt.length == 0) continue;
      t.push(tt[0]);
    }
    return t;
  }
  getObjectCollectionMap(collection, type) {
    let map2 = /* @__PURE__ */ new Map();
    var s = collection.getObjectCollection();
    for (let o of s) {
      let tt = this.convertObject(o, type);
      if (tt.length == 0) continue;
      let named = this.convertObject(o, "INamed");
      if (named.length > 0) {
        map2.set(named[0].getNamedName(), tt[0]);
      }
    }
    return map2;
  }
  getCollectionObject(collection, name, type) {
    let o = collection.getCategoryObject(name);
    if (o === void 0) return [];
    return this.convertObject(o, type);
  }
  convertProperties(o, type) {
    let ob = this.convertObject(o, type);
    if (ob.length > 0) return ob;
    let prp = this.convertObject(o, "IProperties");
    if (prp.length > 0) {
      var pp = this.convertObject(prp[0].getProperties(), type);
      if (pp.length > 0) return pp;
    }
    return [];
  }
  select(objects, type) {
    let t = [];
    for (var i = 0; i < objects.length; i++) {
      let o = objects[i];
      if (o.imlplementsType(type)) {
        t.push(o);
      }
    }
    return t;
  }
  getDerivation(derivation) {
    let m = derivation.getDerivation();
    let x = m.getMeasurementValue();
    return this.convertFromAny(x);
  }
  getDerivationMeasurement(measurement) {
    let d = measurement;
    return this.getDerivation(d);
  }
  setDerivationValue(derivation, value) {
    let m = derivation.getDerivation();
    let iv = m;
    iv.setIValue(value);
  }
  setDerivationMeasuremtValue(measurement, value) {
    let d = measurement;
    this.setDerivationValue(d, value);
  }
  dateString(x) {
    let y = x / 86400;
    var d = this.dt.fromOADate(y);
    var s = d.toJSON();
    s = s.substring(0, 19) + "." + d.getMilliseconds().toString();
    return s;
  }
  dateNumber(x) {
    var d = new Date(x);
    var y = this.dt.toOADate(d);
    return y;
  }
  convertFromAny(t) {
    return this.convert(t);
  }
  toNumber(s) {
    return Number(s);
  }
  toIntegerNumber(s) {
    let num = Number(s);
    return Math.floor(num);
  }
  convert(t) {
    const tt = typeof t;
    if (t === void 0) {
      throw new OwnError("Type conversion", "Performer undefined. NULL OBJECT", void 0);
    }
    if (tt === "string") {
      if (t instanceof String) {
        return t;
      }
    }
    if (tt === "number") {
      return Number(t);
    }
    if (tt === "boolean") {
      return t;
    }
    if (tt === "string" && null === String) {
      return t;
    }
    if (typeof t === "number" && null === Number) {
      return t;
    }
    return t;
    console.warn(t, typeof t);
    throw new OwnError("Type conversion", "Performer", void 0);
    return void 0;
  }
  getMeasurement(i, j, dataConsumer) {
    return dataConsumer.getAllMeasurements()[i].getMeasurement(j);
  }
  remove(t, x) {
    let tt = [];
    for (let y of t) {
      if (y != x) {
        tt.push(x);
      }
    }
    return tt;
  }
  enlarge(t, x, size) {
    for (let i = 0; i < size; i++) t.push(x);
  }
  enlarge2(t, x, row, column) {
    for (let i = 0; i < row; i++) {
      let y = [];
      t.push(y);
      for (let j = 0; i < column; j++) y.push(x);
    }
  }
  enlargeNumber(x, size) {
    this.enlarge(x, 0, size);
  }
  enlargeNumber2(x, row, column) {
    this.enlarge2(x, 0, row, column);
  }
  pushArray(f, t) {
    for (let i = 0; i < f.length; i++) {
      t.push(f[i]);
    }
  }
  copyArray(f, t) {
    for (let i = 0; i < f.length; i++) {
      t[i] = f[i];
    }
  }
  copyArraySize(f, t, size) {
    for (let i = 0; i < size; i++) {
      t[i] = f[i];
    }
  }
  addArray(array, add) {
    for (let f of add) {
      array.push(f);
    }
  }
  setAliasType(name, value, map2, names) {
    if (map2.has(name)) {
      return false;
    }
    names.push(name);
    if (typeof value === "number") {
      map2.set(name, this.a);
    }
    if (typeof value === "boolean") {
      map2.set(name, this.b);
    }
    if (typeof value === "string") {
      map2.set(name, this.s);
    }
    return true;
  }
  setAliasMap(map2, alias) {
    var keys = map2.keys();
    for (var key of keys) {
      alias.setAliasValue(key, map2.get(key));
    }
  }
  copyMap(s, t) {
    for (const [key, value] of s) {
      t.set(key, value);
    }
  }
  implementsType(o, type) {
    let obj = o;
    return obj.imlplementsType(type);
  }
  getMeasurementsMap(measurements) {
    let map2 = /* @__PURE__ */ new Map();
    var n = measurements.getMeasurementsCount();
    for (let i = 0; i < n; i++) {
      let m = measurements.getMeasurement(i);
      var nn = m.getMeasurementName();
      map2.set(nn, m);
    }
    return map2;
  }
  getMeasurementDC(consumer2, name) {
    var mm = consumer2.getAllMeasurements();
    for (var mea of mm) {
      var co = mea;
      var nm = co.getCategoryObjectName();
      nm += ".";
      var n = mea.getMeasurementsCount();
      for (let i = 0; i < n; i++) {
        var m = mea.getMeasurement(i);
        var nam = nm + m.getMeasurementName();
        if (nam == name) {
          return m;
        }
      }
    }
    return this.measurement;
  }
  getMeasurementsMMap(measurements, map2) {
    var n = measurements.getMeasurementsCount();
    for (let i = 0; i < n; i++) {
      var m = measurements.getMeasurement(i);
      var name = m.getMeasurementName();
      map2.set(name, m);
    }
  }
  getMeasurementsDCMap(consumer2) {
    var map2 = /* @__PURE__ */ new Map();
    var mm = consumer2.getAllMeasurements();
    for (var mea of mm) {
      var co = mea;
      var nm = co.getCategoryObjectName();
      nm += ".";
      var n = mea.getMeasurementsCount();
      for (let i = 0; i < n; i++) {
        var m = mea.getMeasurement(i);
        var name = nm + m.getMeasurementName();
        map2.set(name, m);
      }
    }
    return map2;
  }
  getMeasurements(desktop2, name) {
    var a = desktop2.getCategoryObject(name);
    if (this.implementsType(a, "IMeasurements")) {
      var al = a;
      return al;
    }
    return this.measurements;
  }
  getAlias(desktop2, name) {
    var a = desktop2.getCategoryObject(name);
    if (this.implementsType(a, "IAlias")) {
      var al = a;
      return al;
    }
    return this.alias;
  }
  getAliasName(desktop2, name) {
    var l = name.length;
    var n = name.lastIndexOf(".");
    var s = name.substring(n + 1, l);
    var t = name.substring(0, n);
    var al = this.getAlias(desktop2, t);
    return new AliasName(al, s);
  }
  isEmptyActionT(action) {
    if (action === void 0) return true;
    let act = action;
    let arr = act;
    if (arr == void 0) return false;
    return arr.isEmptyActionT();
  }
  isEmptyActionT2(action) {
    if (action === void 0) return true;
    let act = action;
    let arr = act;
    if (arr == void 0) return false;
    return arr.isEmptyActionT2();
  }
  isEmptyActionT3(action) {
    if (action === void 0) return true;
    let act = action;
    let arr = act;
    if (arr == void 0) return false;
    return arr.isEmptyActionT3();
  }
  isEmptyActionT4(action) {
    if (action === void 0) return true;
    let act = action;
    let arr = act;
    if (arr == void 0) return false;
    return arr.isEmptyActionT4();
  }
  isEmptyAction(action) {
    if (action === void 0) return true;
    let act = action;
    let arr = act;
    if (arr == void 0) return false;
    return arr.isEmptyAction();
  }
  convertArrayT(collection, f, type) {
    let t = [];
    let add = new AddTS(t, f);
    this.forEach(collection, add, type);
    return t;
  }
  forEach(collection, action, type) {
    let obj = collection.getObjectCollection();
    for (let o of obj) {
      var x = this.convertObject(o, type);
      if (x.length > 0) action.actionT(x[0]);
      var y = this.convertObject(o, "IObjectCollection");
      if (y.length > 0) this.forEach(y[0], action, type);
    }
  }
  loadChildren(object, collection, loader, load) {
    var lc = new LoadChild(object, loader, load);
    this.forEach(collection, lc, "IObject");
  }
  setFactoryToObjectCollection(collection, factory2) {
    let setter = new FactorySetter(factory2);
    this.forEach(collection, setter, "IFactoryConsumer");
  }
  getFactoryFromDesktop(desktop2) {
    let t = this.convertObject(desktop2, "IFactoryConsumer");
    if (t.length > 0) {
      return t[0].getConsumerFactory();
    }
    return void 0;
  }
  collectResources(res, collection) {
    var rs = new ResourceSetter(res);
    this.forEach(collection, rs, "IResourceCollection");
  }
  startCollecion(start, collection) {
    if (start) {
      this.forEach(collection, this.start, "ISelfStart");
    } else {
      this.forEach(collection, this.stop, "ISelfStart");
    }
  }
  loadCollecion(load, collection) {
    if (load) {
      this.forEach(collection, this.load, "ISelfLoad");
    } else {
      this.forEach(collection, this.unload, "ISelfLoad");
    }
  }
  createObjectCollectionAction(collection, f) {
    var act = new ActionArray();
    var creator = new ActionCreator(f, act);
    this.forEach(collection, creator, "IObject");
    return act;
  }
  createObjectCollectionExternalAction(collection) {
    var act = new ActionArray();
    var creator = new ExternalActionCreator(act);
    this.forEach(collection, creator, "IExternalAction");
    return act;
  }
  getInputsFromCollection(collection, inputs) {
    let s = new InputSelect(inputs);
    this.forEach(collection, s, "IInput");
  }
  setRunning(collection, running) {
    let r = new Running(running);
    this.forEach(collection, r, "IRunning");
  }
};
var InputSelect = class {
  constructor(inputs) {
    this.inputs = inputs;
  }
  actionT(t) {
    this.inputs.push(t);
  }
  isEmptyActionT() {
    return false;
  }
};
var ExternalActionCreator = class {
  actionT(t) {
    this.action.addAction(t.getExternalAction());
  }
  isEmptyActionT() {
    return false;
  }
  constructor(action) {
    this.action = action;
  }
};
var ActionCreator = class {
  actionT(t) {
    var act = this.functT.functT(t);
    if (act != void 0) this.action.addAction(act);
  }
  isEmptyActionT() {
    return false;
  }
  constructor(functT, action) {
    this.functT = functT;
    this.action = action;
  }
};
var AddTS = class {
  constructor(array, funcT) {
    this.array = [];
    this.array = array;
    this.funcT = funcT;
  }
  actionT(s) {
    let t = this.funcT.functT(s);
    if (t != void 0) this.array.push(t);
  }
  isEmptyActionT() {
    return false;
  }
};
var Start = class {
  actionT(t) {
    t.startItself(true);
  }
  isEmptyActionT() {
    return false;
  }
};
var Stop = class {
  actionT(t) {
    t.startItself(false);
  }
  isEmptyActionT() {
    return false;
  }
};
var Load = class {
  actionT(t) {
    t.loadItself(true);
  }
  isEmptyActionT() {
    return false;
  }
};
var Unload = class {
  actionT(t) {
    t.loadItself(false);
  }
  isEmptyActionT() {
    return false;
  }
};
var LoadChild = class {
  constructor(parent, loader, load) {
    this.load = false;
    this.parent = parent;
    this.load = load;
    this.loader = loader;
  }
  actionT(t) {
    this.loader.loadObject(this.parent, t);
  }
  isEmptyActionT() {
    return false;
  }
};
var FactorySetter = class {
  constructor(factory2) {
    this.factory = factory2;
  }
  actionT(t) {
    t.setConsumerFactory(this.factory);
  }
  isEmptyActionT() {
    return false;
  }
};
var ResourceSetter = class {
  constructor(t) {
    this.res = [];
    this.map = /* @__PURE__ */ new Map();
    this.collection = t;
    var c = t.getResources();
    this.res = c;
    for (let x of c) {
      let url = x.url;
      if (this.map.has(url)) {
        continue;
      }
      this.map.set(url, x);
    }
  }
  actionT(t) {
    var rr = t.getResources();
    var rs = this.collection.getResources();
    for (let x of rr) {
      let url = x.url;
      if (this.map.has(url)) {
        continue;
      }
      this.map.set(url, x);
      rs.push(x);
    }
  }
  isEmptyActionT() {
    return false;
  }
};
var ArrayOfObjects = class {
  constructor(func, performer2) {
    this.s = [];
    this.performer = performer2;
    this.f = func;
  }
  actionT(t) {
    let s = this.f.functT(t);
    if (s != void 0) {
      this.s.push(s);
    }
  }
  isEmptyActionT() {
    return false;
  }
  getArray(node) {
    this.performer.recursiveNodeAction(node, this);
    return this.s;
  }
};
var Running = class {
  constructor(running) {
    this.running = false;
    this.running = running;
  }
  actionT(t) {
    t.setRunning(this.running);
  }
  isEmptyActionT() {
    return false;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Desktop.ts
var Desktop = class {
  constructor(factory2) {
    this.typeName = "Desktop";
    this.types = [
      "IObject",
      "IDesktop",
      "IComponentCollection",
      "IObjectCollection",
      "Desktop",
      "IFactoryConsumer"
    ];
    this.categoryObjects = [];
    this.categoryArrows = [];
    this.objects = [];
    this.mapObjects = /* @__PURE__ */ new Map();
    this.performer = new Performer();
    if (factory2 === void 0) return;
    this.factory = factory2;
    let c = factory2.getFactory("ICheck");
    if (c !== void 0) this.check = c;
  }
  imlplementsType(type) {
    return this.types.includes(type);
  }
  async initializeTaksAsync(cancel) {
    var init = [];
    var ii = this.performer.getByInterface(this, "IInitializeTask");
    for (var i of ii) {
      var k = i;
      let m = k.initializeTaskAsync(cancel);
      init.push(m);
    }
    await Promise.any(init);
  }
  async loadAsync(cancel) {
    await this.initializeTaksAsync(cancel);
    this.finish();
  }
  finish() {
  }
  getObjectCollection() {
    return this.objects;
  }
  addObject(obj) {
    this.objects.push(obj);
  }
  getObjects() {
    return this.objects;
  }
  setCheck(check) {
    this.check = check;
  }
  getCheck() {
    return this.check;
  }
  setConsumerFactory(factory2) {
    this.factory = factory2;
  }
  getConsumerFactory() {
    return this.factory;
  }
  getClassName() {
    return this.typeName;
  }
  getCategoryObject(name) {
    for (var o of this.categoryObjects) {
      var n = o.getCategoryObjectName();
      if (n == name) {
        return o;
      }
    }
    throw new OwnNotImplemented("DESKTOP");
  }
  getCategoryObjects() {
    return this.categoryObjects;
  }
  getCategoryArrows() {
    return this.categoryArrows;
  }
  addCategoryObject(obj) {
    this.categoryObjects.push(obj);
  }
  addCategoryArrow(arr) {
    this.categoryArrows.push(arr);
  }
  getName() {
    return this.name;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/EmptyObject.ts
var EmptyObject = class {
  constructor(name) {
    this.performer = new Performer();
    this.typeName = "EmptyObject";
    this.types = ["IObject", "EmptyObject"];
    this.name = "";
    this.name = name;
  }
  getName() {
    return this.name;
  }
  getClassName() {
    return this.typeName;
  }
  imlplementsType(type) {
    return this.types.includes(type);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/CategoryArrow.ts
var CategoryArrow = class extends EmptyObject {
  constructor(desktop2, name) {
    super(name);
    this.performer = new Performer();
    this.typeName = "CategoryArrow";
    this.types.push("ICategoryArrow");
    this.types.push("CategoryArrow");
    this.desktop = desktop2;
    this.name = name;
    desktop2.addCategoryArrow(this);
    desktop2.addObject(this);
  }
  getDesktop() {
    return this.desktop;
  }
  getArrowName() {
    return this.name;
  }
  getSource() {
    return this.source;
  }
  getTarget() {
    return this.target;
  }
  setSource(source) {
    this.source = source;
  }
  setTarget(target) {
    this.target = target;
  }
  getObjectT(s, type) {
    return this.performer.convertObject(s, type);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/Arrows/DataLink.ts
var DataLink = class extends CategoryArrow {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.typeName = "DataLink";
    this.types.push("DataLink");
  }
  getSource() {
    return this.consumer;
  }
  getTagret() {
    return this.measurements;
  }
  setSource(source) {
    this.consumer = source;
  }
  setTarget(target) {
    this.measurements = target;
    this.consumer.addMeasurements(this.measurements);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/Arrows/IteratorConsumerLink.ts
var IteratorConsumerLink = class extends CategoryArrow {
  setSource(source) {
    super.setSource(source);
    this.consumer = source;
  }
  /**
   * @param target
   */
  setTarget(target) {
    super.setTarget(target);
    this.iterator = target;
    this.consumer.addIterator(this.iterator);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/DataConsumerBoolFunc.ts
var DataConsumerBoolFunc = class {
  constructor(dataConsumer, name) {
    this.performer = new Performer();
    this.measurement = this.performer.getMeasurementDC(dataConsumer, name);
  }
  func() {
    var res = this.measurement.getMeasurementValue();
    if (res != void 0) {
      return this.performer.convertFromAny(res);
    }
    return false;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/TimeMeasurementProvider.ts
var TimeMeasurementProvider = class {
  constructor() {
    this.time = 0;
    this.step = 0;
  }
  getMeasurementName() {
    return "Time";
  }
  getMeasurementType() {
    return 0;
  }
  getMeasurementValue() {
    return this.time;
  }
  getTimeMeasurement() {
    return this;
  }
  setTime(time) {
    this.time = time;
  }
  getStep() {
    return 0;
  }
  setStep(time) {
    this.step = time;
  }
  getTime() {
    return this.time;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/UpdateMeasurementsAction.ts
var UpdateMeasurementsAction = class {
  action() {
    this.m.updateMeasurements();
  }
  isEmptyAction() {
    return false;
  }
  constructor(m) {
    this.m = m;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/ErrorHandler/EmptyExceptionHandler.ts
var EmptyExceptionHandler = class {
  handleException(exception, obj) {
    this.any = exception;
    this.any = obj;
    console.log("EXCEPTION", exception);
  }
  log(message, obj) {
    this.any = message;
    this.any = obj;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/PerformerMeasuremets.ts
var PerformerMeasuremets = class extends Performer {
  constructor(factory2) {
    super(factory2);
    this.errorHandler = new EmptyExceptionHandler();
    this.types.push("PerformerMeasuremets");
    this.typeName = "PerformerMeasuremets";
    if (factory2 === void 0) return;
    var p = factory2.getFactory("IDifferentialEquationProcessor");
    if (p !== void 0) this.processor = p;
    var rt = factory2.getFactory("IRealtimeCollectionFactory");
    if (rt !== void 0) this.realtimeEventFactory = rt;
    var e = factory2.getFactory("IExceptionHandler");
    if (e !== void 0) this.errorHandler = e;
  }
  toNullabeMeasurement(m) {
    let x = m.getMeasurementValue();
    if (x === void 0) return void 0;
    return this.convert(x);
  }
  getDifferentialEquationProcessor() {
    return this.processor;
  }
  setDifferentialEquationProcessor(p) {
    this.processor = p;
  }
  getRealtimeEventFactory() {
    return this.realtimeEventFactory;
  }
  setRealtimeEventFactory(f) {
    this.realtimeEventFactory = f;
  }
  createUpdateMeasurementsAction(collection, act) {
    let mea = this.getAll(collection, "IMeasurements");
    let mm = this.sortMeasurements(mea);
    for (let m of mm) {
      act.addAction(new UpdateMeasurementsAction(m));
    }
  }
  setTimeProvider(timeProvider, measurements) {
    for (let m of measurements) {
      let tm = this.convertObject(m, "ITimeMeasurementConsumer");
      if (tm.length > 0) {
        tm[0].setTimeMeasurement(timeProvider);
      }
    }
  }
  setTimeProviderCollection(objects, timeProvider) {
    let objs = objects.getObjectCollection();
    for (let o of objs) {
      let tm = this.convertObject(o, "ITimeMeasurementConsumer");
      if (tm.length > 0) {
        tm[0].setTimeMeasurement(timeProvider);
      }
    }
  }
  setTimeProviderFactoryCollection(objects) {
    let tm = this.convertObject(objects, "IFactoryConsumer");
    if (tm.length == 0) return;
    let fc = tm[0];
    let f = fc.getConsumerFactory();
    let tp = f.getFactory("ITimeMeasurementProvider");
    if (tp == void 0) return;
    this.setTimeProviderCollection(objects, tp);
  }
  getArrayMeasurements(array) {
    var n = array.getMeasurementNames().length;
    var mea = [];
    for (var i = 0; i < n; i++) {
    }
    return mea;
  }
  initStart(array, x) {
    var n = x.length;
    var y = array.getMeasurementValues();
    for (var i = 0; i < n; i++) {
      y[i] = x[i];
    }
  }
  getDependentPrivate(dataConsumer, measurements) {
    let m = dataConsumer.getAllMeasurements();
    for (let i = 0; i < m.length; i++) {
      let mea = m[i];
      measurements.push(mea);
    }
  }
  peformCondDCFixedStepCalculation(runtime2, dataConsumer, conditionName, stop, start, step, steps, act) {
    var cond = new DataConsumerBoolFunc(dataConsumer, conditionName);
    this.peformCondFixedStepCalculation(runtime2, cond, stop, start, step, steps, act);
  }
  peformCondFixedStepCalculation(runtime2, condition, stop, start, step, steps, act) {
    var tm = new TimeMeasurementProvider();
    runtime2.setTimeProvider(tm);
    runtime2.startRuntime(start);
    var st = start;
    for (var i = 0; i < steps; i++) {
      if (stop.func()) return;
      tm.setTime(st);
      runtime2.updateRuntime();
      if (condition.func()) {
        act.action();
      }
      let s = st + step;
      if (i > 0) {
        runtime2.stepRuntime(st, s);
      }
      st = s;
    }
  }
  performFixedStepCalculation(runtime2, start, step, steps, stop, act) {
    let tm = new TimeMeasurementProvider();
    runtime2.setTimeProvider(tm);
    runtime2.startRuntime(start);
    var st = start;
    var curr = start;
    for (var i = 0; i < steps; i++) {
      if (stop.func()) return;
      tm.setTime(st);
      if (i > 0) {
        runtime2.stepRuntime(curr, st);
        curr = st;
      }
      runtime2.updateRuntime();
      act.action();
      st += step;
    }
  }
  getMeasurementWrite(dataConsumer, meaurements, list) {
    let map2 = /* @__PURE__ */ new Map();
    for (var [key, value] of meaurements) {
      map2.set(key, this.getMeasurementDC(dataConsumer, value));
    }
    let action = new MeasurementWrite(map2, list);
    return action;
  }
  async performIteratorDataConsumerFullAsync(dataConsumer, iterator, runtime2, abort2, preparation) {
    let map2 = /* @__PURE__ */ new Map();
    let mm = dataConsumer.getAllMeasurements();
    for (let m of mm) {
      let o = m;
      let name = o.getName() + ".";
      let c = m.getMeasurementsCount();
      for (var i = 0; i < c; i++) {
        let ns = name + m.getMeasurement(i).getMeasurementName();
        map2.set(ns, ns);
      }
    }
    let data = await this.performIteratorDataConsumerMapAsync(dataConsumer, iterator, runtime2, abort2, map2, preparation);
    return data;
  }
  async performIteratorDataConsumerMapAsync(dataConsumer, iterator, runtime2, abort2, meaurements, preparation, errorHandler) {
    let list = [];
    let action = this.getMeasurementWrite(dataConsumer, meaurements, list);
    await this.performIteratorDataConsumerAsync(dataConsumer, iterator, runtime2, abort2, action, preparation, errorHandler);
    let data = list;
    return data;
  }
  async performIteratorDataConsumerAsync(dataConsumer, iterator, runtime2, abort2, action, preparation, errorHandler) {
    let desktop2 = void 0;
    try {
      if (preparation !== void 0) preparation.action();
      var co = dataConsumer;
      var d = co.getDesktop();
      desktop2 = d;
      await this.startAsync(d, abort2);
      if (abort2.signal.aborted) {
        if (errorHandler === void 0) return;
        errorHandler.log("Start aborted");
        return;
      }
      this.setRunning(d, true);
      iterator.resetIterator();
      this.fullReset(dataConsumer);
      while (true) {
        if (abort2.signal.aborted) {
          if (errorHandler === void 0) return;
          errorHandler.log("Iteration aborted");
          break;
        }
        if (!iterator.nextIterator()) {
          break;
        }
        runtime2.updateRuntime();
        action.action();
      }
    } catch (error) {
      this.errorHandler.handleException(error);
    }
    if (desktop2 != void 0) this.setRunning(desktop2, false);
  }
  fullReset(consumer2) {
    let meas = consumer2.getAllMeasurements();
    for (let m of meas) {
      let c = this.convertObject(m, "IDataConsumer");
      if (c.length > 0) {
        c[0].resetDataConsumer();
        this.fullReset(c[0]);
      }
    }
  }
  printDataPerformerMeasurements(dataConsumer, printer) {
    let x = this.getMeasurementsDCMap(dataConsumer);
    for (var [key, value] of x) {
      printer.print(key);
      printer.print(value.getMeasurementValue());
      printer.print("\n");
    }
  }
};
var MeasurementWrite = class {
  constructor(map2, list) {
    this.map = map2;
    this.list = list;
  }
  action() {
    let m = /* @__PURE__ */ new Map();
    for (var [key, value] of this.map.entries()) {
      let v = value.getMeasurementValue();
      m.set(key, v);
    }
    this.list.push(m);
  }
  isEmptyAction() {
    return false;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/CategoryObject.ts
var CategoryObject = class {
  constructor(desktop2, name) {
    this.types = ["IObject", "ICategoryObject", "CategoryObject"];
    this.typeName = "CategoryObject";
    this.performer = new Performer();
    this.desktop = desktop2;
    this.name = name;
    desktop2.addCategoryObject(this);
    desktop2.addObject(this);
    this.checker = desktop2.getCheck();
  }
  getName() {
    return this.name;
  }
  getClassName() {
    return this.typeName;
  }
  imlplementsType(type) {
    return this.types.includes(type);
  }
  convert(a) {
    return this.performer.convertFromAny(a);
  }
  getDesktop() {
    return this.desktop;
  }
  getObject() {
    return this.obj;
  }
  setObject(obj) {
    this.obj = obj;
  }
  getCategoryObjectName() {
    return this.name;
  }
  check(x) {
    if (this.checker == void 0) {
      return false;
    }
    return this.checker.check(x);
  }
  getObjectT(s, type) {
    return this.performer.convertObject(s, type);
  }
  detectFactory() {
    let fc = this.desktop;
    if (fc === void 0) return void 0;
    return fc.getConsumerFactory();
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/DataConsumer.ts
var DataConsumer = class extends CategoryObject {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.addRemoveobjects = [];
    this.measurements = [];
    this.isEvEnabled = false;
    this.success = true;
    this.eventAction = new ActionArray();
    this.basicAction = new ActionArray();
    this.fictiveAvtion = new ActionArray();
    this.currentAction = new ActionArray();
    this.externalEvents = [];
    this.typeName = "DataConsumer";
    this.types.push("DataConsumer");
    this.types.push("IDataConsumer");
    this.types.push("IPostSetArrow");
    this.types.push("ITimeMeasurementConsumer");
    this.types.push("IPrintedObject");
    this.types.push("ICheckHolder");
    this.types.push("IIteratorConsumer");
    this.types.push("IEventHandler");
    this.types.push("IEventStart");
    this.types.push("IAddRemove");
    this.tms = this;
    this.dataConsumer = this;
    this.currentAction = this.fictiveAvtion;
    let f = this.detectFactory();
    if (f === void 0)
      this.pMeasurements = new PerformerMeasuremets();
    else {
      this.pMeasurements = new PerformerMeasuremets(f);
      let s = f.getFactory("IShowObject");
      if (s !== void 0) this.show = s;
    }
  }
  setExternalUpdate(action) {
    this.eventAction.clearActions();
    if (action === void 0) {
      return;
    }
    this.eventAction.addAction(action);
  }
  isEventEnabled() {
    return this.isEvEnabled;
  }
  isEmptyAction() {
    return false;
  }
  setEventEnabled(enabled) {
    if (enabled == this.isEvEnabled) return;
    this.isEvEnabled = enabled;
    if (enabled) {
      this.currentAction = this.eventAction;
      return;
    }
    this.currentAction = this.fictiveAvtion;
  }
  action() {
    this.currentAction.action();
  }
  getAddRemoveType() {
    return "";
  }
  getEventHandlerEvents() {
    return this.externalEvents;
  }
  addChildT(child) {
    this.fchild = child;
  }
  addEventToHandler(event) {
    var ev = this.performer.convertObject(event, "IEvent");
    if (ev.length == 0) return;
    this.performer.addUnique(this.externalEvents, event);
  }
  resetDataConsumer() {
  }
  addIterator(iterator) {
    this.iterator = iterator;
  }
  removeIterator(iterator) {
    this.fi = iterator;
  }
  getCheck() {
    return this.checker;
  }
  setCheck(check) {
    this.checker = check;
  }
  print(printer) {
    for (var m of this.measurements) {
      let co = m;
      let s = co.getCategoryObjectName() + "	";
      let n = m.getMeasurementsCount();
      for (let i = 0; i < n; i++) {
        var mm = m.getMeasurement(i);
        var v = mm.getMeasurementValue();
        s += v + "	";
      }
      printer.print(s);
    }
  }
  getInternalTime() {
    var tm = this.timeMeasurement;
    return tm.getTime();
  }
  getTimeMeasurement() {
    return this.timeMeasurement;
  }
  setTimeMeasurement(measurement) {
    this.timeMeasurement = measurement;
    ;
  }
  postSetArrow() {
    for (let event of this.externalEvents) {
      let ea = event.eventAction();
      ea.addAction(this);
    }
  }
  getAllMeasurements() {
    return this.measurements;
  }
  addMeasurements(item) {
    this.measurements.push(item);
  }
  addRemoveObject(object, add) {
    if (add) this.addRemoveobjects.push(object);
    return true;
  }
  getAddRemoveObjects() {
    return this.addRemoveobjects;
  }
  toNullabe(m) {
    return this.pMeasurements.toNullabeMeasurement(m);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/AliasInitialValue.ts
var AliasInitialValue = class {
  getInitValue() {
    return this.value.getIValue();
  }
  resetInitValue() {
    let x = this.alias.getAliasNameValue();
    if (x != void 0) {
      this.value.setIValue(x);
    }
  }
  constructor(alias, value) {
    this.alias = alias;
    this.value = value;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/InitialValueCollection.ts
var InitialValueCollection = class {
  constructor() {
    this.values = [];
  }
  addInitialValue(value) {
    this.values.push(value);
  }
  getInitialValues() {
    return this.values;
  }
  resetInitialValues() {
    for (var item of this.values) {
      item.resetInitValue();
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/AliasInitialValueCollection..ts
var AliasInitialValueCollection = class extends InitialValueCollection {
  constructor(alias, measurements) {
    super();
    this.performer = new Performer();
    var n = measurements.getMeasurementsCount();
    for (let i = 0; i < n; i++) {
      var m = measurements.getMeasurement(i);
      var name = m.getMeasurementName();
      var iv = this.performer.convertObject(m, "IValue");
      var an = new AliasName(alias, name);
      if (iv.length == 1) {
        var init = new AliasInitialValue(an, iv[0]);
        this.addInitialValue(init);
      }
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/Variables/Variable.ts
var Variable = class {
  //measurements | : IMeasurements
  constructor(name, type, value, measurements) {
    this.value = new Object();
    this.type = new Object();
    this.name = "";
    this.className = "Variable";
    this.types = ["Variable", "IMeasurement", "IObject", "IValue", "IDerivation"];
    this.performer = new Performer();
    this.name = name;
    this.type = type;
    this.value = value;
    this.measurements = measurements;
  }
  getIValue() {
    return this.value;
  }
  setIValue(value) {
    this.value = value;
  }
  getClassName() {
    return this.className;
  }
  imlplementsType(type) {
    return this.types.includes(type);
  }
  getName() {
    return this.name;
  }
  getMeasurementName() {
    return this.name;
  }
  getMeasurementType() {
    return this.type;
  }
  getMeasurementValue() {
    return this.value;
  }
  getDerivation() {
    return this.measurement;
  }
  setDerivation(derivation) {
    this.measurement = derivation;
  }
  setDerivationVarible(variable) {
    this.derivation = variable;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/DataConsumerVariableMeasurements.ts
var DataConsumerVariableMeasurements = class extends DataConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.output = [];
    this.variables = /* @__PURE__ */ new Map();
    this.aliasTypes = /* @__PURE__ */ new Map();
    this.aliasValues = /* @__PURE__ */ new Map();
    this.aliasNames = [];
    this.pMeasurements = new PerformerMeasuremets();
    this.alias = this;
    this.typeName = "DataConsumerVariadbleMeasurements";
    this.types.push("DataConsumerVariadbleMeasurements");
    this.types.push("IMeasurements");
    this.types.push("IAlias");
    this.types.push("ISetFeedback");
  }
  getMeasurementsCount() {
    return this.output.length;
  }
  getMeasurement(i) {
    return this.output[i];
  }
  addMeasurement(measurement) {
    this.fict = measurement;
  }
  updateMeasurements() {
  }
  getAliasType(name) {
    return this.aliasTypes.get(name);
  }
  getAliasNames() {
    return this.aliasNames;
  }
  getAliasValue(name) {
    return this.aliasValues.get(name);
  }
  setAliasValue(name, value) {
    if (!this.aliasTypes.has(name)) {
      this.performer.setAliasType(name, value, this.aliasTypes, this.aliasNames);
    }
    this.aliasValues.set(name, value);
  }
  addVariableValue(name, type, value) {
    let variable = new Variable(name, type, value, this);
    this.addVariable(variable);
  }
  addVariable(variable) {
    this.output.push(variable);
    this.variables.set(variable.getMeasurementName(), variable);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/FeedBack/FeedbackAlias.ts
var FeedbackAlias = class {
  constructor(alias, value) {
    this.alias = alias;
    this.value = value;
  }
  setFeedback() {
    var x = this.value.getIValue();
    if (x != void 0) {
      this.alias.setAliasNameValue(x);
    }
  }
  getFeedBackAlias() {
    return this.alias;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/FeedBack/FeedbackCollection.ts
var FeedbackCollection = class {
  constructor(map2) {
    this.performer = new Performer();
    this.feedbacks = [];
    this.map = /* @__PURE__ */ new Map();
    this.performer.copyMap(map2, this.map);
  }
  getFeedbacks() {
    return this.feedbacks;
  }
  setFeedbacks() {
    for (let feedback of this.feedbacks) {
      feedback.setFeedback();
    }
  }
  getFeedbacksMap() {
    return this.map;
  }
  addFeedback(feedback) {
    this.feedbacks.push(feedback);
  }
  isEmpty() {
    return this.feedbacks.length === 0;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/FeedBack/FeedbackAliasCollection.ts
var FeedbackAliasCollection = class extends FeedbackCollection {
  constructor(map2, measurements, obj) {
    super(map2);
    this.desktop = obj.getDesktop();
    this.measurements = measurements;
    this.fillFeedBackAliases();
  }
  fillFeedBackAliases() {
    var measuremets = this.performer.getMeasurementsMap(this.measurements);
    for (const [key, val] of this.map.entries()) {
      var an = this.performer.getAliasName(this.desktop, val);
      var m = measuremets.get(key);
      var iv = m;
      var alias = new FeedbackAlias(an, iv);
      this.addFeedback(alias);
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/DataConsumerVariableMeasurementsStarted.ts
var DataConsumerVariableMeasurementsStarted = class extends DataConsumerVariableMeasurements {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.fictiveStart = 0;
    this.typeName = "DataConsumerVariadbleMeasurementsStarted";
    this.types.push("IStarted");
    this.types.push("DataConsumerVariadbleMeasurementsStarted");
    this.alias = this;
  }
  getFeedbackCollection() {
    return this.feedback;
  }
  startedStart(start) {
    this.fictiveStart = start;
    this.initial.resetInitialValues();
  }
  setInitial() {
    this.initial = new AliasInitialValueCollection(this, this);
  }
  setFeedback() {
    let map2 = /* @__PURE__ */ new Map();
    this.feedback = new FeedbackAliasCollection(map2, this, this);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/RecursiveFormula.ts
var RecursiveFormula = class extends DataConsumerVariableMeasurementsStarted {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.inputs = [];
    this.arguments = [];
    this.running = false;
    //  protected initial: Map<string, any> = new Map();
    this.operationNames = /* @__PURE__ */ new Map();
    this.performer = new Performer();
    this.fictiveStart = 0;
    this.typeName = "RecursiveFormula";
    this.types.push("IPostSetArrow");
    this.types.push("IRunning");
    this.types.push("RecursiveFormula");
  }
  setRunning(running) {
    if (running === this.running) return;
    this.running = running;
    if (!running) return;
    this.initial.resetInitialValues();
    this.feedback.setFeedbacks();
  }
  getRunning() {
    return this.running;
  }
  init() {
  }
  setFeedback() {
    let map2 = /* @__PURE__ */ new Map();
    this.feedback = new FeedbackAliasCollection(map2, this, this);
  }
  postSetArrow() {
    this.init();
    this.setInitial();
    this.setFeedback();
  }
  getAllMeasurements() {
    return this.inputs;
  }
  addMeasurements(item) {
    this.inputs.push(item);
  }
  calculateTree() {
  }
  save() {
  }
  startedStart(start) {
    this.fictiveStart = start;
    this.initial.resetInitialValues();
    this.feedback.setFeedbacks();
  }
  updateMeasurements() {
    this.calculateTree();
    this.save();
    this.feedback.setFeedbacks();
    this.show?.show(this);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Filters/QueueFilter.ts
var import_queue_typescript = __toESM(require_src2(), 1);
var QueueFilter = class {
  constructor(count) {
    // protected arr: number[] = []
    //  protected copy: number[] = []
    this.count = 2;
    this.x = [];
    this.performer = new Performer();
    this.count = count;
    this.queue = new import_queue_typescript.Queue();
  }
  getFilterData() {
    return this.queue;
  }
  getFilterCount() {
    return this.count;
  }
  setFilterCount(count) {
    this.count = count;
  }
  getFilterValue(a) {
    this.queue.enqueue(a);
    let k = this.queue.length - this.count;
    if (k > 0) this.queue.dequeue();
    let b = this.getOwnValue(k >= 0);
    return b;
  }
  resetFilter() {
    this.queue = new import_queue_typescript.Queue();
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Filters/AverageSequenceFilter.ts
var AverageSequenceFilter = class extends QueueFilter {
  constructor(count) {
    super(count);
  }
  getOwnValue(l) {
    if (!l) return void 0;
    let a = this.queue.toArray();
    return this.performer.calculateAverage(a);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Filters/DonchianSequenceFilter.ts
var DonchianSequenceFilter = class extends QueueFilter {
  constructor(count, max) {
    super(count);
    this.max = true;
    this.max = max;
  }
  getOwnValue(l) {
    if (!l) return void 0;
    var p = this.performer;
    var x = this.queue.toArray();
    var y = this.max ? p.findMaxWithReduce(x) : p.findMinWithReduce(x);
    return y;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Filters/Interfaces/SequenceFilterType.ts
var SequenceFilterType = {
  Donchian: "Donchian",
  Avarage: "Avarage"
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/DataConsumerMeasurements.ts
var DataConsumerMeasurements = class extends DataConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.output = [];
    this.aliasTypes = /* @__PURE__ */ new Map();
    this.aliasValues = /* @__PURE__ */ new Map();
    this.aliasNames = [];
    this.performer = new Performer();
    this.external = /* @__PURE__ */ new Map();
    this.fmap = /* @__PURE__ */ new Map();
    this.alias = this;
    this.typeName = "DataConsumerMeasurements";
    this.types.push("DataConsumerMeasurements");
    this.types.push("IMeasurements");
    this.types.push("IAlias");
  }
  getAliasValue(name) {
    return this.aliasValues.get(name);
  }
  getMeasurementsCount() {
    return this.output.length;
  }
  getMeasurement(i) {
    return this.output[i];
  }
  addMeasurement(measurement) {
    this.output.push(measurement);
  }
  updateMeasurements() {
  }
  getAliasType(name) {
    return this.aliasTypes.get(name);
  }
  getAliasNames() {
    return this.aliasNames;
  }
  getAliasV\u0430lue(name) {
    return this.aliasValues.get(name);
  }
  setAliasValue(name, value) {
    this.performer.setAliasType(name, value, this.aliasTypes, this.aliasNames);
    this.aliasValues.set(name, value);
  }
  setExternalAliases(map2) {
    this.fmap = map2;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/SequenserFilterWrapper.ts
var SequenceFilterWrapper = class extends DataConsumerMeasurements {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.type = SequenceFilterType.Avarage;
    this.mimax = true;
    this.result = void 0;
    this.filter = new DonchianSequenceFilter(2, true);
    this.running = false;
    this.ficI = 0;
    this.types.push("IRunning");
    this.types.push("IMeasurement");
    this.types.push("SequenceFilterWrapper");
    this.typeName = "SequenceFilterWrapper";
  }
  setRunning(running) {
    this.running = running;
    this.result = void 0;
    this.filter.resetFilter();
  }
  getRunning() {
    return this.running;
  }
  getMeasurementsCount() {
    return 1;
  }
  getMeasurement(i) {
    this.ficI = i;
    return this;
  }
  getMeasurementName() {
    return "Output";
  }
  getMeasurementType() {
    return 0;
  }
  getMeasurementValue() {
    return this.result;
  }
  updateMeasurements() {
    var x = this.measurement.getMeasurementValue();
    if (this.checker.check(x)) {
      this.result = void 0;
      return;
    }
    if (typeof x === "number") {
      var a = Number(x);
      this.result = this.filter.getFilterValue(a);
    }
  }
  getFilter() {
    return this.filter;
  }
  setFilter() {
    if (this.type == SequenceFilterType.Avarage) {
      this.filter = new AverageSequenceFilter(this.count);
      return;
    }
    this.filter = new DonchianSequenceFilter(this.count, this.mimax);
  }
  setMeasurement() {
    this.measurement = this.performer.getMeasurementDC(this, this.input);
  }
  postSetArrow() {
    this.setFilter();
    this.setMeasurement();
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/VectorFormulaConsumer.ts
var VectorFormulaConsumer = class extends DataConsumerVariableMeasurements {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.isRunning = false;
    this.typeName = "VectorFormulaConsumer";
    this.types.push("VectorFormulaConsumer");
    this.types.push("IPostSetArrow");
    this.types.push("IRunning");
    this.types.push("IPrintedObject");
  }
  setRunning(running) {
    this.isRunning = running;
    this.reset();
  }
  getRunning() {
    return this.isRunning;
  }
  updateMeasurements() {
    this.calculateTree();
    this.save();
    this.feedback?.setFeedbacks();
  }
  calculateTree() {
  }
  init() {
  }
  save() {
  }
  reset() {
  }
  setFeedback() {
  }
  postSetArrow() {
    this.init();
    this.setFeedback();
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/Measurement.ts
var Measurement = class {
  constructor(name, type) {
    this.name = "";
    this.name = name;
    this.type = type;
  }
  getMeasurementName() {
    return this.name;
  }
  getMeasurementType() {
    return this.type;
  }
  getMeasurementValue() {
    throw new OwnNotImplemented("Measurement");
  }
};

// src/Web/AspireTradingApp/frontend/src/ExternalObjects/Trading/Components/TradingPositionEnums.ts
var TradingPositionDirection = {
  Opened: "Opened",
  Closed: "Closed"
};
var TradingPositionType = {
  None: "None",
  Short: "Short",
  Long: "Long"
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Generic/ActionArrayT2.ts
var ActionArrayT2 = class extends EmptyObject {
  constructor() {
    super("");
    this.actions = [];
    this.types.push("IActionAddRemoveT2");
    this.types.push("ActionArrayT2");
    this.typeName = "ActionArrayT2";
  }
  isEmptyActionT2() {
    return this.actions.length == 0;
  }
  addActionT2(action) {
    if (this.performer.isEmptyActionT2(action)) return;
    if (action === void 0) return;
    this.actions.push(action);
  }
  removeActionT2(action) {
    if (this.performer.isEmptyActionT2(action)) return;
    if (action === void 0) return;
    this.performer.remove(this.actions, action);
  }
  clearActionsT2() {
    this.actions = [];
  }
  actionT2(t1, t2) {
    for (let action of this.actions)
      action.actionT2(t1, t2);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Generic/ActionArrayT4.ts
var ActionArrayT4 = class extends EmptyObject {
  constructor() {
    super("");
    this.actions = [];
    this.types.push("IActionAddRemoveT4");
    this.types.push("ActionArrayT4");
    this.typeName = "ActionArrayT4";
  }
  isEmptyActionT4() {
    return this.actions.length == 0;
  }
  addActionT4(action) {
    if (this.performer.isEmptyActionT4(action)) return;
    if (action === void 0) return;
    this.actions.push(action);
  }
  removeActionT4(action) {
    if (this.performer.isEmptyActionT4(action)) return;
    if (action === void 0) return;
    this.performer.remove(this.actions, action);
  }
  clearActionsT4() {
    this.actions = [];
  }
  actionT4(t1, t2, t3, t4) {
    for (let action of this.actions)
      action.actionT4(t1, t2, t3, t4);
  }
};

// src/Web/AspireTradingApp/frontend/src/ExternalObjects/Trading/Components/TradingOrder.ts
var TradingOrder = class _TradingOrder extends DataConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.changed = false;
    this.isPost = false;
    this.currentPositionValue = void 0;
    this.isRunning = false;
    this.isMeaUpdated = false;
    this.income = 0;
    this.changePosition = new ActionArrayT2();
    this.sellBuy = new ActionArrayT4();
    this.sellPrice = "";
    this.buyPrice = "";
    this.position = "";
    this.date = "";
    this.output = [];
    this.mSellPrice = void 0;
    this.mBuyPrice = void 0;
    this.enterPrice = 0;
    this.exitPrice = 0;
    this.tempIncome = 0;
    this.exitDate = 0;
    this.enterDate = 0;
    this.positionType = TradingPositionType.None;
    this.positionDirection = TradingPositionDirection.Closed;
    this.posChanged = false;
    this.dateValue = void 0;
    //  private isOpened: boolean = false
    this.currentPositionType = TradingPositionType.None;
    this.lastPositionType = TradingPositionType.None;
    this.closedPositionType = TradingPositionType.None;
    this.closedIncome = 0;
    this.types.push("IMeasurements");
    this.types.push("IRunning");
    this.types.push("TradingOrder");
    this.typeName = "TradingOrder";
    this.output = [
      new PositionMeasurement(this),
      new IncomeMeasurement(this),
      new SellTaxMeasurement(this),
      new BuyTaxMeasurement(this)
    ];
    this.resetAll();
  }
  setRunning(running) {
    this.isRunning = running;
    this.resetAll();
  }
  getRunning() {
    return this.isRunning;
  }
  update() {
    this.zero();
    this.dateValue = this.toNullabe(this.currentDate);
    var pos = this.toNullabe(this.positionM);
    this.setCurrentPositionValue(pos);
    if (!this.changed) {
      return;
    }
    if (this.positionDirection == TradingPositionDirection.Closed) {
      if (this.getTempIncome() == 0) {
        return;
      }
      if (this.tempIncome < 0) {
        this.mSellPrice = this.toNullabe(this.sellPriceM);
        if (this.mSellPrice !== void 0) {
          this.exitPrice = this.mSellPrice;
          this.closedIncome = this.tempIncome + this.exitPrice;
          this.sellBuy.actionT4(this, "+", this.income, this.closedIncome);
          this.income += this.closedIncome;
        }
      } else {
        this.mBuyPrice = this.toNullabe(this.buyPriceM);
        if (this.mBuyPrice !== void 0) {
          this.exitPrice = this.mBuyPrice;
          this.closedIncome = this.tempIncome - this.exitPrice;
          this.sellBuy.actionT4(this, "-", this.income, this.closedIncome);
          this.income -= this.closedIncome;
        }
      }
    } else {
      this.closedPositionType = this.currentPositionType;
      if (this.currentPositionType == TradingPositionType.Long) {
        this.mBuyPrice = this.toNullabe(this.buyPriceM);
        if (this.mBuyPrice !== void 0)
          this.enterPrice = this.mBuyPrice;
        this.setTempIncome(-this.enterPrice);
      } else {
        this.mSellPrice = this.toNullabe(this.sellPriceM);
        if (this.mSellPrice !== void 0)
          this.enterPrice = this.mSellPrice;
        this.setTempIncome(this.enterPrice);
      }
    }
  }
  print(printer) {
    printer.print("CurrentPositionValue");
    printer.print(this.currentPositionValue);
    printer.print("EnterPrice");
    printer.print(this.enterPrice);
    printer.print("ExitPrice");
    printer.print(this.currentPositionValue);
    printer.print("TempIncome");
    printer.print(this.tempIncome);
    printer.print("ExitDate");
    printer.print(this.exitDate);
    printer.print("CurrentPositionType");
    printer.print(this.currentPositionType);
    printer.print("LastPositionType");
    printer.print(this.lastPositionType);
    printer.print("ClosedPositionType");
    printer.print(this.closedPositionType);
    printer.print("mSellPrice");
    printer.print(this.mSellPrice);
    printer.print("mBuyPrice");
    printer.print(this.mBuyPrice);
    printer.print("positionType");
    printer.print(this.positionType);
    printer.print("positionDirection");
    printer.print(this.positionDirection);
    printer.print("posChanged");
    printer.print(this.posChanged);
    printer.print("income");
    printer.print(this.income);
  }
  resetAll() {
    this.setCurrentPositionValue(void 0);
    this.setEnterPrice(0);
    this.setExitPrice(0);
    this.setTempIncome(0);
    this.setExitDate(0);
    this.setCurrentPositionType(TradingPositionType.None);
    this.setLastPositionType(TradingPositionType.None);
    this.setClosedPositionType(TradingPositionType.None);
    this.dateValue = void 0;
    this.mSellPrice = void 0;
    this.mBuyPrice = void 0;
    this.positionType = TradingPositionType.None;
    this.positionDirection = TradingPositionDirection.Closed;
    this.posChanged = false;
    this.income = 0;
  }
  addActionT2(action) {
    this.changePosition.addActionT2(action);
  }
  removeActionT2(action) {
    this.changePosition.removeActionT2(action);
  }
  clearActionsT2() {
    this.changePosition.clearActionsT2();
  }
  actionT2(t1, t2) {
    this.changePosition.actionT2(t1, t2);
  }
  isEmptyActionT2() {
    return false;
  }
  addActionT4(action) {
    this.sellBuy.addActionT4(action);
  }
  removeActionT4(action) {
    this.sellBuy.removeActionT4(action);
  }
  clearActionsT4() {
    this.sellBuy.clearActionsT4();
  }
  actionT4(t1, t2, t3, t4) {
    this.sellBuy.actionT4(t1, t2, t3, t4);
  }
  isEmptyActionT4() {
    return false;
  }
  setClosedPositionType(type) {
    this.closedPositionType = type;
  }
  setCurrentPositionType(type) {
    this.currentPositionType = type;
  }
  setLastPositionType(type) {
    this.lastPositionType = type;
  }
  getEnterPrice() {
    return this.enterPrice;
  }
  setEnterPrice(value) {
    this.enterPrice = value;
  }
  getTempIncome() {
    return this.tempIncome;
  }
  setTempIncome(value) {
    this.tempIncome = value;
  }
  geExitPrice() {
    return this.exitPrice;
  }
  setExitPrice(value) {
    this.exitPrice = value;
  }
  geExitDate() {
    return this.exitDate;
  }
  setExitDate(value) {
    this.exitDate = value;
  }
  geEnterDate() {
    return this.enterDate;
  }
  setEnterDate(value) {
    this.enterDate = value;
  }
  getCurrentPositionType() {
    return this.currentPositionType;
  }
  getPositionDirection() {
    return this.positionDirection;
  }
  setPositionDirection(value) {
    this.posChanged = false;
    if (this.positionDirection == value) return;
    this.posChanged = true;
    this.positionDirection = value;
    if (this.positionDirection === TradingPositionDirection.Closed) {
      if (this.currentDate !== void 0) {
        if (this.dateValue !== void 0)
          this.setExitDate(this.dateValue);
      }
    } else {
      if (this.currentDate != null) {
        if (this.dateValue !== void 0) this.setEnterDate(this.dateValue);
      }
    }
  }
  getCurrentPositionValue() {
    return this.currentPositionValue;
  }
  static toDirection(direction, position, last) {
    if (position === last) {
      return direction;
    }
    return direction == TradingPositionDirection.Opened ? TradingPositionDirection.Closed : TradingPositionDirection.Opened;
  }
  setCurrentPositionValue(value) {
    if (value === this.currentPositionValue) {
      this.changed = false;
      return;
    }
    if (value === void 0) {
      this.currentPositionValue = value;
      return;
    }
    this.changed = true;
    let type = this.toPositionType(value);
    if (this.lastPositionType == type) {
      this.changed = false;
      return;
    }
    this.actionT2(this, type);
    let t = this.lastPositionType;
    let d = this.getPositionDirection();
    this.setPositionDirection(_TradingOrder.toDirection(d, type, t));
    if (value !== void 0) this.currentPositionValue = value;
    this.currentPositionType = type;
    this.lastPositionType = type;
    this.actionT2(this, this.currentPositionType);
  }
  toPositionType(position) {
    if (position === void 0) {
      return TradingPositionType.None;
    } else {
      let a = position;
      let s = "";
      switch (a) {
        case 0:
          s = TradingPositionType.None;
          break;
        case 1:
          s = TradingPositionType.Short;
          break;
        case 2:
          s = TradingPositionType.Long;
      }
      if (s.length > 0) {
        this.actionT2(this, s);
        return s;
      }
      throw new OwnError("Illegal position type", " " + a);
    }
  }
  getMeasurementsCount() {
    return this.output.length;
  }
  getMeasurement(i) {
    return this.output[i];
  }
  updateMeasurements() {
    this.update();
  }
  postSetArrow() {
    this.isPost = false;
    this.find();
  }
  find() {
    if (this.isPost) {
      return;
    }
    this.positionM = this.performer.getMeasurementDC(this, this.position);
    this.buyPriceM = this.performer.getMeasurementDC(this, this.buyPrice);
    this.sellPriceM = this.performer.getMeasurementDC(this, this.sellPrice);
    this.currentDate = this.performer.getMeasurementDC(this, this.date);
  }
  zero() {
    this.mSellPrice = void 0;
    this.mBuyPrice = void 0;
  }
  showThis(s) {
    this.show?.show(this, s);
  }
};
var BasicMeasurement = class extends Measurement {
  constructor(name, order, type) {
    super(name, type);
    this.order = order;
  }
  getAssociatedObject() {
    return this.order;
  }
  setAssociatedObject(obj) {
    this.any = obj;
  }
};
var PositionMeasurement = class extends BasicMeasurement {
  constructor(order) {
    super("Position", order, 0);
  }
  getMeasurementValue() {
    return this.order.getCurrentPositionValue();
  }
};
var IncomeMeasurement = class extends BasicMeasurement {
  constructor(order) {
    super("Income", order, 0);
  }
  getMeasurementValue() {
    return this.order.income;
  }
};
var BuyTaxMeasurement = class extends BasicMeasurement {
  constructor(order) {
    super("Buy Price", order, 0);
  }
  getMeasurementValue() {
    return this.order.mBuyPrice;
  }
};
var SellTaxMeasurement = class extends BasicMeasurement {
  constructor(order) {
    super("Sell Price", order, 0);
  }
  getMeasurementValue() {
    return this.order.mSellPrice;
  }
};

// src/Web/AspireTradingApp/frontend/src/ExternalObjects/Trading/Components/TradingDataQuery.ts
var TradingDataQuery = class extends CategoryObject {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.vector = [0, 0, 0, 0];
    this.symbols = /* @__PURE__ */ new Map();
    this.realTime = 0;
    this.measurements = [];
    this.begin = 0;
    this.end = 0;
    this.period = "";
    this.symbol = "";
    this.data = [];
    this.step = -1;
    this.symbolsstr = [];
    let f = this.performer.getFactoryFromDesktop(desktop2);
    if (f !== void 0) {
      this.factory = f;
      let i = this.factory.getFactory("ITradingDatabaseHistoryInterface");
      if (i !== void 0) this.inter = i;
    }
    this.typeName = "TradingDataQuery";
    this.types.push("TradingDataQuery");
    this.types.push("IInitializeTask");
    this.types.push("IIterator");
    this.types.push("IMeasurements");
    this.types.push("IStartTask");
    this.measurements = [
      new RealTimeMeasurement(this),
      new LowMeasurement(this),
      new HighMeasurement(this),
      new OpenMeasurement(this),
      new CloseMeasurement(this),
      new CandleMeasurement(this),
      new IntegerTimeMeasurement(this),
      new DateTimeMeasurement(this),
      new FullTimeMeasurement(this)
    ];
  }
  async startAsync(controller) {
    this.data = await this.inter.getHistoricalDataMessageDateTimesAsync(
      "",
      this.period,
      this.symbol,
      this.begin,
      this.end,
      controller
    );
  }
  getMeasurementsCount() {
    return this.measurements.length;
  }
  getMeasurement(i) {
    return this.measurements[i];
  }
  updateMeasurements() {
  }
  addMeasurement(measurement) {
    this.any = measurement;
  }
  nextIterator() {
    ++this.step;
    if (this.step >= this.data.length) return false;
    this.realTime = this.step;
    this.current = this.data[this.step];
    this.fillVector();
    return true;
  }
  resetIterator() {
    this.step = -1;
  }
  fillVector() {
    this.vector[0] = this.current.high;
    this.vector[1] = this.current.low;
    this.vector[2] = this.current.open;
    this.vector[3] = this.current.close;
  }
  async initializeTaskAsync(controller) {
    var sym = await this.inter.getSymbolsAsync();
    for (let i of sym) {
      this.symbols.set(i[0], i[1]);
    }
    this.symbolsstr = sym;
    this.any = controller;
  }
  getSymbolsStr() {
    return this.symbolsstr;
  }
  setQueryParameters(symbol, period, begin, end) {
    this.symbol = symbol;
    this.period = period;
    this.begin = begin;
    this.end = end;
  }
};
var BasicMeasurement2 = class extends Measurement {
  constructor(name, type, query2) {
    super(name, type);
    this.query = query2;
  }
  getAssociatedObject() {
    return this.query;
  }
  setAssociatedObject(obj) {
    this.any = obj;
  }
};
var LowMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("Low", 0, query2);
  }
  getMeasurementValue() {
    return this.query.current.low;
  }
};
var HighMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("High", 0, query2);
  }
  getMeasurementValue() {
    return this.query.current.high;
  }
};
var OpenMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("Open", 0, query2);
  }
  getMeasurementValue() {
    return this.query.current.open;
  }
};
var CloseMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("Close", 0, query2);
  }
  getMeasurementValue() {
    return this.query.current.close;
  }
};
var RealTimeMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("RealTime", 0, query2);
  }
  getMeasurementValue() {
    return this.query.realTime;
  }
};
var IntegerTimeMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("Step", 0, query2);
  }
  getMeasurementValue() {
    return this.query.step;
  }
};
var DateTimeMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("DateTime", 0, query2);
  }
  getMeasurementValue() {
    return this.query.current.date;
  }
};
var FullTimeMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("FullTime", 0, query2);
    this.converter = new DateTimeConverter();
  }
  getMeasurementValue() {
    var d = this.query.current.date;
    if (d == void 0) {
      return void 0;
    }
    return d;
  }
};
var CandleMeasurement = class extends BasicMeasurement2 {
  constructor(query2) {
    super("Candle", 0, query2);
    this.type = [0, 0, 0, 0];
  }
  getMeasurementValue() {
    return this.query.vector;
  }
};

// src/Web/AspireTradingApp/frontend/src/ExternalObjects/Trading/Algorithms/DonchianDesktop.ts
var DonchianDesktop_CategoryObject_0 = class extends TradingDataQuery {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.begin = 44929;
    this.end = 45260;
    this.period = "1 min";
    this.symbol = "AAPL";
  }
};
var DonchianDesktop_CategoryObject_1 = class extends SequenceFilterWrapper {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.count = 10;
    this.input = "Trading.Close";
    this.type = SequenceFilterType.Avarage;
  }
};
var DonchianDesktop_CategoryObject_2 = class extends SequenceFilterWrapper {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.count = 40;
    this.input = "Trading.Close";
    this.type = SequenceFilterType.Avarage;
  }
};
var DonchianDesktop_CategoryObject_3 = class extends SequenceFilterWrapper {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.count = 10;
    this.input = "Trading.High";
    this.type = SequenceFilterType.Donchian;
    this.mimax = true;
  }
};
var DonchianDesktop_CategoryObject_4 = class extends SequenceFilterWrapper {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.count = 10;
    this.input = "Trading.Low";
    this.type = SequenceFilterType.Donchian;
    this.mimax = false;
  }
};
var DonchianDesktop_CategoryObject_5 = class extends RecursiveFormula {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.var_0 = 0;
    this.var_1 = 0;
    let map2 = /* @__PURE__ */ new Map(
      [
        ["t", 0],
        ["x", 0],
        ["y", 0]
      ]
    );
    this.performer.setAliasMap(map2, this);
    this.addVariableValue("x", 0, 0);
    this.addVariableValue("y", 0, 0);
  }
  calculateTree() {
    this.success = true;
    this.variable = this.value0.getIValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_0 = this.convert(this.variable);
    this.variable = this.aliasName1.getAliasNameValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_1 = this.convert(this.variable);
  }
  init() {
    var all = this.getAllMeasurements();
    this.fic = all;
    this.value0 = this.output[1];
    this.aliasName1 = new AliasName(this.alias, "t");
  }
  get_0() {
    return this.success ? this.var_0 : void 0;
  }
  get_1() {
    return this.success ? this.var_1 : void 0;
  }
  save() {
    var v = this.variables;
    var x0 = v.get("x");
    x0?.setIValue(this.get_0());
    var x1 = v.get("y");
    x1?.setIValue(this.get_1());
  }
  reset() {
    this.var_0 = 0;
    this.var_1 = 0;
  }
  print(printer) {
    printer.print("var_0");
    printer.print(this.var_0);
    printer.print("var_1");
    printer.print(this.var_1);
  }
};
var DonchianDesktop_CategoryObject_6 = class extends VectorFormulaConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.var_0 = 0;
    this.var_1 = 0;
    this.var_2 = false;
    this.var_3 = 0;
    this.var_4 = 0;
    this.var_5 = false;
    this.var_6 = 0;
    this.var_7 = 0;
    this.var_8 = false;
    this.var_9 = 0;
    this.var_10 = 0;
    this.var_11 = false;
    this.var_12 = 1;
    this.var_13 = false;
    this.var_14 = 2;
    this.var_15 = false;
    let map2 = /* @__PURE__ */ new Map(
      []
    );
    this.performer.setAliasMap(map2, this);
    this.addVariableValue("Formula_1", false, false);
    this.addVariableValue("Formula_2", false, false);
    this.addVariableValue("Formula_3", false, false);
    this.addVariableValue("Formula_4", 0, 0);
    this.addVariableValue("Formula_5", false, false);
    this.addVariableValue("Formula_6", false, false);
    this.addVariableValue("Formula_7", false, false);
  }
  calculateTree() {
    this.success = true;
    this.variable = this.measurement0.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_0 = this.convert(this.variable);
    this.variable = this.measurement1.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_1 = this.convert(this.variable);
    this.variable = this.var_0 < this.var_1;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_2 = this.convert(this.variable);
    this.variable = this.measurement3.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_3 = this.convert(this.variable);
    this.variable = this.measurement4.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_4 = this.convert(this.variable);
    this.variable = this.var_3 < this.var_4;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_5 = this.convert(this.variable);
    this.variable = this.measurement6.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_6 = this.convert(this.variable);
    this.variable = this.measurement7.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_7 = this.convert(this.variable);
    this.variable = this.var_6 > this.var_7;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_8 = this.convert(this.variable);
    this.variable = this.measurement9.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_9 = this.convert(this.variable);
    this.variable = this.var_9 === this.var_10;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_11 = this.convert(this.variable);
    this.variable = this.var_9 === this.var_12;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_13 = this.convert(this.variable);
    this.variable = this.var_9 === this.var_14;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_15 = this.convert(this.variable);
  }
  init() {
    var all = this.getAllMeasurements();
    this.fic = all;
    this.measurement0 = all[5].getMeasurement(0);
    this.measurement1 = all[4].getMeasurement(0);
    this.measurement3 = all[0].getMeasurement(1);
    this.measurement4 = all[2].getMeasurement(0);
    this.measurement6 = all[0].getMeasurement(2);
    this.measurement7 = all[3].getMeasurement(0);
    this.measurement9 = all[1].getMeasurement(1);
  }
  get_0() {
    return this.success ? this.var_0 : void 0;
  }
  get_1() {
    return this.success ? this.var_1 : void 0;
  }
  get_2() {
    return this.success ? this.var_2 : void 0;
  }
  get_3() {
    return this.success ? this.var_3 : void 0;
  }
  get_4() {
    return this.success ? this.var_4 : void 0;
  }
  get_5() {
    return this.success ? this.var_5 : void 0;
  }
  get_6() {
    return this.success ? this.var_6 : void 0;
  }
  get_7() {
    return this.success ? this.var_7 : void 0;
  }
  get_8() {
    return this.success ? this.var_8 : void 0;
  }
  get_9() {
    return this.success ? this.var_9 : void 0;
  }
  get_10() {
    return this.success ? this.var_10 : void 0;
  }
  get_11() {
    return this.success ? this.var_11 : void 0;
  }
  get_12() {
    return this.success ? this.var_12 : void 0;
  }
  get_13() {
    return this.success ? this.var_13 : void 0;
  }
  get_14() {
    return this.success ? this.var_14 : void 0;
  }
  get_15() {
    return this.success ? this.var_15 : void 0;
  }
  save() {
    var v = this.variables;
    var x0 = v.get("Formula_1");
    x0?.setIValue(this.get_2());
    var x1 = v.get("Formula_2");
    x1?.setIValue(this.get_5());
    var x2 = v.get("Formula_3");
    x2?.setIValue(this.get_8());
    var x3 = v.get("Formula_4");
    x3?.setIValue(this.get_9());
    var x4 = v.get("Formula_5");
    x4?.setIValue(this.get_11());
    var x5 = v.get("Formula_6");
    x5?.setIValue(this.get_13());
    var x6 = v.get("Formula_7");
    x6?.setIValue(this.get_15());
  }
  reset() {
    this.var_0 = 0;
    this.var_1 = 0;
    this.var_2 = false;
    this.var_3 = 0;
    this.var_4 = 0;
    this.var_5 = false;
    this.var_6 = 0;
    this.var_7 = 0;
    this.var_8 = false;
    this.var_9 = 0;
    this.var_10 = 0;
    this.var_11 = false;
    this.var_12 = 1;
    this.var_13 = false;
    this.var_14 = 2;
    this.var_15 = false;
  }
  print(printer) {
    printer.print("var_0");
    printer.print(this.var_0);
    printer.print("var_1");
    printer.print(this.var_1);
    printer.print("var_2");
    printer.print(this.var_2);
    printer.print("var_3");
    printer.print(this.var_3);
    printer.print("var_4");
    printer.print(this.var_4);
    printer.print("var_5");
    printer.print(this.var_5);
    printer.print("var_6");
    printer.print(this.var_6);
    printer.print("var_7");
    printer.print(this.var_7);
    printer.print("var_8");
    printer.print(this.var_8);
    printer.print("var_9");
    printer.print(this.var_9);
    printer.print("var_10");
    printer.print(this.var_10);
    printer.print("var_11");
    printer.print(this.var_11);
    printer.print("var_12");
    printer.print(this.var_12);
    printer.print("var_13");
    printer.print(this.var_13);
    printer.print("var_14");
    printer.print(this.var_14);
    printer.print("var_15");
    printer.print(this.var_15);
  }
};
var DonchianDesktop_CategoryObject_7 = class extends VectorFormulaConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.var_0 = false;
    this.var_1 = 0;
    this.var_2 = 0;
    this.var_3 = false;
    this.var_4 = false;
    this.var_5 = false;
    this.var_6 = false;
    this.var_7 = false;
    this.var_8 = 2;
    this.var_9 = false;
    this.var_10 = false;
    this.var_11 = false;
    this.var_12 = false;
    this.var_13 = 1;
    this.var_14 = false;
    this.var_15 = false;
    this.var_16 = false;
    this.var_17 = 0;
    this.var_18 = false;
    this.var_19 = false;
    this.var_20 = false;
    this.var_21 = false;
    this.var_22 = false;
    this.var_23 = 1;
    this.var_24 = false;
    this.var_25 = false;
    this.var_26 = 0;
    this.var_27 = 0;
    this.var_28 = 0;
    this.var_29 = false;
    this.var_30 = 2;
    this.var_31 = false;
    this.var_32 = false;
    this.var_33 = 0;
    this.var_34 = 0;
    this.var_35 = 0;
    this.var_36 = 0;
    this.var_37 = 1;
    this.var_38 = 0;
    this.var_39 = 0;
    this.var_40 = 1;
    this.var_41 = 0;
    this.var_42 = 0;
    this.var_43 = 1;
    this.var_44 = 0;
    this.var_45 = 0;
    this.var_46 = 0;
    let map2 = /* @__PURE__ */ new Map(
      []
    );
    this.performer.setAliasMap(map2, this);
    this.addVariableValue("Formula_1", false, false);
    this.addVariableValue("Formula_2", false, false);
    this.addVariableValue("Formula_3", 0, 0);
    this.addVariableValue("Formula_4", 0, 0);
    this.addVariableValue("Formula_5", 0, 0);
    this.addVariableValue("Formula_6", 0, 0);
    this.addVariableValue("Formula_7", 0, 0);
  }
  calculateTree() {
    this.success = true;
    this.variable = this.measurement0.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_0 = this.convert(this.variable);
    this.variable = this.measurement1.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_1 = this.convert(this.variable);
    this.variable = this.var_1 === this.var_2;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_3 = this.convert(this.variable);
    this.variable = this.var_0 && this.var_3;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_4 = this.convert(this.variable);
    this.variable = this.measurement5.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_5 = this.convert(this.variable);
    this.variable = this.var_4 && this.var_5;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_6 = this.convert(this.variable);
    this.variable = !this.var_0;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_7 = this.convert(this.variable);
    this.variable = this.var_1 === this.var_8;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_9 = this.convert(this.variable);
    this.variable = this.var_7 && this.var_9;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_10 = this.convert(this.variable);
    this.variable = this.var_10 && this.var_5;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_11 = this.convert(this.variable);
    this.variable = this.var_6 || this.var_11;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_12 = this.convert(this.variable);
    this.variable = this.var_1 === this.var_13;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_14 = this.convert(this.variable);
    this.variable = this.measurement15.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_15 = this.convert(this.variable);
    this.variable = this.var_14 && this.var_15;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_16 = this.convert(this.variable);
    this.variable = this.var_1 === this.var_17;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_18 = this.convert(this.variable);
    this.variable = this.var_18 && this.var_15;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_19 = this.convert(this.variable);
    this.variable = this.var_0 ? this.var_16 : this.var_19;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_20 = this.convert(this.variable);
    this.variable = this.measurement21.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_21 = this.convert(this.variable);
    this.variable = this.var_21 && this.var_5;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_22 = this.convert(this.variable);
    this.variable = this.measurement24.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_24 = this.convert(this.variable);
    this.variable = this.var_24 && this.var_15;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_25 = this.convert(this.variable);
    this.variable = this.var_25 ? this.var_26 : this.var_1;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_27 = this.convert(this.variable);
    this.variable = this.var_22 ? this.var_23 : this.var_27;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_28 = this.convert(this.variable);
    this.variable = this.var_21 && this.var_15;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_29 = this.convert(this.variable);
    this.variable = this.measurement31.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_31 = this.convert(this.variable);
    this.variable = this.var_31 && this.var_5;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_32 = this.convert(this.variable);
    this.variable = this.var_32 ? this.var_33 : this.var_1;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_34 = this.convert(this.variable);
    this.variable = this.var_29 ? this.var_30 : this.var_34;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_35 = this.convert(this.variable);
    this.variable = this.var_0 ? this.var_28 : this.var_35;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_36 = this.convert(this.variable);
    this.variable = this.var_0 ? this.var_37 : this.var_38;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_39 = this.convert(this.variable);
    this.variable = this.var_5 ? this.var_40 : this.var_41;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_42 = this.convert(this.variable);
    this.variable = this.var_15 ? this.var_43 : this.var_44;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_45 = this.convert(this.variable);
    this.variable = this.measurement46.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_46 = this.convert(this.variable);
  }
  init() {
    var all = this.getAllMeasurements();
    this.fic = all;
    this.measurement0 = all[0].getMeasurement(0);
    this.measurement1 = all[1].getMeasurement(1);
    this.measurement5 = all[0].getMeasurement(1);
    this.measurement15 = all[0].getMeasurement(2);
    this.measurement21 = all[0].getMeasurement(4);
    this.measurement24 = all[0].getMeasurement(5);
    this.measurement31 = all[0].getMeasurement(6);
    this.measurement46 = all[0].getMeasurement(3);
  }
  get_0() {
    return this.success ? this.var_0 : void 0;
  }
  get_1() {
    return this.success ? this.var_1 : void 0;
  }
  get_2() {
    return this.success ? this.var_2 : void 0;
  }
  get_3() {
    return this.success ? this.var_3 : void 0;
  }
  get_4() {
    return this.success ? this.var_4 : void 0;
  }
  get_5() {
    return this.success ? this.var_5 : void 0;
  }
  get_6() {
    return this.success ? this.var_6 : void 0;
  }
  get_7() {
    return this.success ? this.var_7 : void 0;
  }
  get_8() {
    return this.success ? this.var_8 : void 0;
  }
  get_9() {
    return this.success ? this.var_9 : void 0;
  }
  get_10() {
    return this.success ? this.var_10 : void 0;
  }
  get_11() {
    return this.success ? this.var_11 : void 0;
  }
  get_12() {
    return this.success ? this.var_12 : void 0;
  }
  get_13() {
    return this.success ? this.var_13 : void 0;
  }
  get_14() {
    return this.success ? this.var_14 : void 0;
  }
  get_15() {
    return this.success ? this.var_15 : void 0;
  }
  get_16() {
    return this.success ? this.var_16 : void 0;
  }
  get_17() {
    return this.success ? this.var_17 : void 0;
  }
  get_18() {
    return this.success ? this.var_18 : void 0;
  }
  get_19() {
    return this.success ? this.var_19 : void 0;
  }
  get_20() {
    return this.success ? this.var_20 : void 0;
  }
  get_21() {
    return this.success ? this.var_21 : void 0;
  }
  get_22() {
    return this.success ? this.var_22 : void 0;
  }
  get_23() {
    return this.success ? this.var_23 : void 0;
  }
  get_24() {
    return this.success ? this.var_24 : void 0;
  }
  get_25() {
    return this.success ? this.var_25 : void 0;
  }
  get_26() {
    return this.success ? this.var_26 : void 0;
  }
  get_27() {
    return this.success ? this.var_27 : void 0;
  }
  get_28() {
    return this.success ? this.var_28 : void 0;
  }
  get_29() {
    return this.success ? this.var_29 : void 0;
  }
  get_30() {
    return this.success ? this.var_30 : void 0;
  }
  get_31() {
    return this.success ? this.var_31 : void 0;
  }
  get_32() {
    return this.success ? this.var_32 : void 0;
  }
  get_33() {
    return this.success ? this.var_33 : void 0;
  }
  get_34() {
    return this.success ? this.var_34 : void 0;
  }
  get_35() {
    return this.success ? this.var_35 : void 0;
  }
  get_36() {
    return this.success ? this.var_36 : void 0;
  }
  get_37() {
    return this.success ? this.var_37 : void 0;
  }
  get_38() {
    return this.success ? this.var_38 : void 0;
  }
  get_39() {
    return this.success ? this.var_39 : void 0;
  }
  get_40() {
    return this.success ? this.var_40 : void 0;
  }
  get_41() {
    return this.success ? this.var_41 : void 0;
  }
  get_42() {
    return this.success ? this.var_42 : void 0;
  }
  get_43() {
    return this.success ? this.var_43 : void 0;
  }
  get_44() {
    return this.success ? this.var_44 : void 0;
  }
  get_45() {
    return this.success ? this.var_45 : void 0;
  }
  get_46() {
    return this.success ? this.var_46 : void 0;
  }
  save() {
    var v = this.variables;
    var x0 = v.get("Formula_1");
    x0?.setIValue(this.get_12());
    var x1 = v.get("Formula_2");
    x1?.setIValue(this.get_20());
    var x2 = v.get("Formula_3");
    x2?.setIValue(this.get_36());
    var x3 = v.get("Formula_4");
    x3?.setIValue(this.get_39());
    var x4 = v.get("Formula_5");
    x4?.setIValue(this.get_42());
    var x5 = v.get("Formula_6");
    x5?.setIValue(this.get_45());
    var x6 = v.get("Formula_7");
    x6?.setIValue(this.get_46());
  }
  setFeedback() {
    let map2 = /* @__PURE__ */ new Map(
      [
        ["Formula_3", "Current Position.t"]
      ]
    );
    this.feedback = new FeedbackAliasCollection(map2, this, this);
  }
  reset() {
    this.var_0 = false;
    this.var_1 = 0;
    this.var_2 = 0;
    this.var_3 = false;
    this.var_4 = false;
    this.var_5 = false;
    this.var_6 = false;
    this.var_7 = false;
    this.var_8 = 2;
    this.var_9 = false;
    this.var_10 = false;
    this.var_11 = false;
    this.var_12 = false;
    this.var_13 = 1;
    this.var_14 = false;
    this.var_15 = false;
    this.var_16 = false;
    this.var_17 = 0;
    this.var_18 = false;
    this.var_19 = false;
    this.var_20 = false;
    this.var_21 = false;
    this.var_22 = false;
    this.var_23 = 1;
    this.var_24 = false;
    this.var_25 = false;
    this.var_26 = 0;
    this.var_27 = 0;
    this.var_28 = 0;
    this.var_29 = false;
    this.var_30 = 2;
    this.var_31 = false;
    this.var_32 = false;
    this.var_33 = 0;
    this.var_34 = 0;
    this.var_35 = 0;
    this.var_36 = 0;
    this.var_37 = 1;
    this.var_38 = 0;
    this.var_39 = 0;
    this.var_40 = 1;
    this.var_41 = 0;
    this.var_42 = 0;
    this.var_43 = 1;
    this.var_44 = 0;
    this.var_45 = 0;
    this.var_46 = 0;
  }
  print(printer) {
    printer.print("var_0");
    printer.print(this.var_0);
    printer.print("var_1");
    printer.print(this.var_1);
    printer.print("var_2");
    printer.print(this.var_2);
    printer.print("var_3");
    printer.print(this.var_3);
    printer.print("var_4");
    printer.print(this.var_4);
    printer.print("var_5");
    printer.print(this.var_5);
    printer.print("var_6");
    printer.print(this.var_6);
    printer.print("var_7");
    printer.print(this.var_7);
    printer.print("var_8");
    printer.print(this.var_8);
    printer.print("var_9");
    printer.print(this.var_9);
    printer.print("var_10");
    printer.print(this.var_10);
    printer.print("var_11");
    printer.print(this.var_11);
    printer.print("var_12");
    printer.print(this.var_12);
    printer.print("var_13");
    printer.print(this.var_13);
    printer.print("var_14");
    printer.print(this.var_14);
    printer.print("var_15");
    printer.print(this.var_15);
    printer.print("var_16");
    printer.print(this.var_16);
    printer.print("var_17");
    printer.print(this.var_17);
    printer.print("var_18");
    printer.print(this.var_18);
    printer.print("var_19");
    printer.print(this.var_19);
    printer.print("var_20");
    printer.print(this.var_20);
    printer.print("var_21");
    printer.print(this.var_21);
    printer.print("var_22");
    printer.print(this.var_22);
    printer.print("var_23");
    printer.print(this.var_23);
    printer.print("var_24");
    printer.print(this.var_24);
    printer.print("var_25");
    printer.print(this.var_25);
    printer.print("var_26");
    printer.print(this.var_26);
    printer.print("var_27");
    printer.print(this.var_27);
    printer.print("var_28");
    printer.print(this.var_28);
    printer.print("var_29");
    printer.print(this.var_29);
    printer.print("var_30");
    printer.print(this.var_30);
    printer.print("var_31");
    printer.print(this.var_31);
    printer.print("var_32");
    printer.print(this.var_32);
    printer.print("var_33");
    printer.print(this.var_33);
    printer.print("var_34");
    printer.print(this.var_34);
    printer.print("var_35");
    printer.print(this.var_35);
    printer.print("var_36");
    printer.print(this.var_36);
    printer.print("var_37");
    printer.print(this.var_37);
    printer.print("var_38");
    printer.print(this.var_38);
    printer.print("var_39");
    printer.print(this.var_39);
    printer.print("var_40");
    printer.print(this.var_40);
    printer.print("var_41");
    printer.print(this.var_41);
    printer.print("var_42");
    printer.print(this.var_42);
    printer.print("var_43");
    printer.print(this.var_43);
    printer.print("var_44");
    printer.print(this.var_44);
    printer.print("var_45");
    printer.print(this.var_45);
    printer.print("var_46");
    printer.print(this.var_46);
  }
};
var DonchianDesktop_CategoryObject_8 = class extends VectorFormulaConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.var_0 = false;
    this.var_1 = 1;
    this.var_2 = 0;
    this.var_3 = 0;
    this.var_4 = false;
    this.var_5 = 1;
    this.var_6 = 0;
    this.var_7 = 0;
    this.var_8 = false;
    this.var_9 = 1;
    this.var_10 = 0;
    this.var_11 = 0;
    this.var_12 = false;
    this.var_13 = 1;
    this.var_14 = 0;
    this.var_15 = 0;
    this.var_16 = false;
    this.var_17 = 1;
    this.var_18 = 0;
    this.var_19 = 0;
    let map2 = /* @__PURE__ */ new Map(
      []
    );
    this.performer.setAliasMap(map2, this);
    this.addVariableValue("Formula_1", 0, 0);
    this.addVariableValue("Formula_2", 0, 0);
    this.addVariableValue("Formula_3", 0, 0);
    this.addVariableValue("Formula_4", 0, 0);
    this.addVariableValue("Formula_5", 0, 0);
  }
  calculateTree() {
    this.success = true;
    this.variable = this.measurement0.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_0 = this.convert(this.variable);
    this.variable = this.var_0 ? this.var_1 : this.var_2;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_3 = this.convert(this.variable);
    this.variable = this.measurement4.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_4 = this.convert(this.variable);
    this.variable = this.var_4 ? this.var_5 : this.var_6;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_7 = this.convert(this.variable);
    this.variable = this.measurement8.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_8 = this.convert(this.variable);
    this.variable = this.var_8 ? this.var_9 : this.var_10;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_11 = this.convert(this.variable);
    this.variable = this.measurement12.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_12 = this.convert(this.variable);
    this.variable = this.var_12 ? this.var_13 : this.var_14;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_15 = this.convert(this.variable);
    this.variable = this.measurement16.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_16 = this.convert(this.variable);
    this.variable = this.var_16 ? this.var_17 : this.var_18;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_19 = this.convert(this.variable);
  }
  init() {
    var all = this.getAllMeasurements();
    this.fic = all;
    this.measurement0 = all[0].getMeasurement(0);
    this.measurement4 = all[0].getMeasurement(1);
    this.measurement8 = all[1].getMeasurement(4);
    this.measurement12 = all[1].getMeasurement(5);
    this.measurement16 = all[1].getMeasurement(6);
  }
  get_0() {
    return this.success ? this.var_0 : void 0;
  }
  get_1() {
    return this.success ? this.var_1 : void 0;
  }
  get_2() {
    return this.success ? this.var_2 : void 0;
  }
  get_3() {
    return this.success ? this.var_3 : void 0;
  }
  get_4() {
    return this.success ? this.var_4 : void 0;
  }
  get_5() {
    return this.success ? this.var_5 : void 0;
  }
  get_6() {
    return this.success ? this.var_6 : void 0;
  }
  get_7() {
    return this.success ? this.var_7 : void 0;
  }
  get_8() {
    return this.success ? this.var_8 : void 0;
  }
  get_9() {
    return this.success ? this.var_9 : void 0;
  }
  get_10() {
    return this.success ? this.var_10 : void 0;
  }
  get_11() {
    return this.success ? this.var_11 : void 0;
  }
  get_12() {
    return this.success ? this.var_12 : void 0;
  }
  get_13() {
    return this.success ? this.var_13 : void 0;
  }
  get_14() {
    return this.success ? this.var_14 : void 0;
  }
  get_15() {
    return this.success ? this.var_15 : void 0;
  }
  get_16() {
    return this.success ? this.var_16 : void 0;
  }
  get_17() {
    return this.success ? this.var_17 : void 0;
  }
  get_18() {
    return this.success ? this.var_18 : void 0;
  }
  get_19() {
    return this.success ? this.var_19 : void 0;
  }
  save() {
    var v = this.variables;
    var x0 = v.get("Formula_1");
    x0?.setIValue(this.get_3());
    var x1 = v.get("Formula_2");
    x1?.setIValue(this.get_7());
    var x2 = v.get("Formula_3");
    x2?.setIValue(this.get_11());
    var x3 = v.get("Formula_4");
    x3?.setIValue(this.get_15());
    var x4 = v.get("Formula_5");
    x4?.setIValue(this.get_19());
  }
  reset() {
    this.var_0 = false;
    this.var_1 = 1;
    this.var_2 = 0;
    this.var_3 = 0;
    this.var_4 = false;
    this.var_5 = 1;
    this.var_6 = 0;
    this.var_7 = 0;
    this.var_8 = false;
    this.var_9 = 1;
    this.var_10 = 0;
    this.var_11 = 0;
    this.var_12 = false;
    this.var_13 = 1;
    this.var_14 = 0;
    this.var_15 = 0;
    this.var_16 = false;
    this.var_17 = 1;
    this.var_18 = 0;
    this.var_19 = 0;
  }
  print(printer) {
    printer.print("var_0");
    printer.print(this.var_0);
    printer.print("var_1");
    printer.print(this.var_1);
    printer.print("var_2");
    printer.print(this.var_2);
    printer.print("var_3");
    printer.print(this.var_3);
    printer.print("var_4");
    printer.print(this.var_4);
    printer.print("var_5");
    printer.print(this.var_5);
    printer.print("var_6");
    printer.print(this.var_6);
    printer.print("var_7");
    printer.print(this.var_7);
    printer.print("var_8");
    printer.print(this.var_8);
    printer.print("var_9");
    printer.print(this.var_9);
    printer.print("var_10");
    printer.print(this.var_10);
    printer.print("var_11");
    printer.print(this.var_11);
    printer.print("var_12");
    printer.print(this.var_12);
    printer.print("var_13");
    printer.print(this.var_13);
    printer.print("var_14");
    printer.print(this.var_14);
    printer.print("var_15");
    printer.print(this.var_15);
    printer.print("var_16");
    printer.print(this.var_16);
    printer.print("var_17");
    printer.print(this.var_17);
    printer.print("var_18");
    printer.print(this.var_18);
    printer.print("var_19");
    printer.print(this.var_19);
  }
};
var DonchianDesktop_CategoryObject_9 = class extends VectorFormulaConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.var_0 = 0;
    this.var_1 = 0;
    this.var_2 = false;
    this.var_3 = 0;
    this.var_4 = 3;
    this.var_5 = 0;
    this.var_6 = 0;
    let map2 = /* @__PURE__ */ new Map(
      []
    );
    this.performer.setAliasMap(map2, this);
    this.addVariableValue("Formula_1", 0, 0);
  }
  calculateTree() {
    this.success = true;
    this.variable = this.measurement0.getMeasurementValue();
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_0 = this.convert(this.variable);
    this.variable = this.var_0 === this.var_1;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_2 = this.convert(this.variable);
    this.variable = this.var_4 - this.var_0;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_5 = this.convert(this.variable);
    this.variable = this.var_2 ? this.var_3 : this.var_5;
    if (this.check(this.variable)) {
      this.success = false;
      return;
    }
    this.var_6 = this.convert(this.variable);
  }
  init() {
    var all = this.getAllMeasurements();
    this.fic = all;
    this.measurement0 = all[0].getMeasurement(2);
  }
  get_0() {
    return this.success ? this.var_0 : void 0;
  }
  get_1() {
    return this.success ? this.var_1 : void 0;
  }
  get_2() {
    return this.success ? this.var_2 : void 0;
  }
  get_3() {
    return this.success ? this.var_3 : void 0;
  }
  get_4() {
    return this.success ? this.var_4 : void 0;
  }
  get_5() {
    return this.success ? this.var_5 : void 0;
  }
  get_6() {
    return this.success ? this.var_6 : void 0;
  }
  save() {
    var v = this.variables;
    var x0 = v.get("Formula_1");
    x0?.setIValue(this.get_6());
  }
  setFeedback() {
    let map2 = /* @__PURE__ */ new Map(
      [
        ["Formula_1", "Current Position.t"]
      ]
    );
    this.feedback = new FeedbackAliasCollection(map2, this, this);
  }
  reset() {
    this.var_0 = 0;
    this.var_1 = 0;
    this.var_2 = false;
    this.var_3 = 0;
    this.var_4 = 3;
    this.var_5 = 0;
    this.var_6 = 0;
  }
  print(printer) {
    printer.print("var_0");
    printer.print(this.var_0);
    printer.print("var_1");
    printer.print(this.var_1);
    printer.print("var_2");
    printer.print(this.var_2);
    printer.print("var_3");
    printer.print(this.var_3);
    printer.print("var_4");
    printer.print(this.var_4);
    printer.print("var_5");
    printer.print(this.var_5);
    printer.print("var_6");
    printer.print(this.var_6);
  }
};
var DonchianDesktop_CategoryObject_10 = class extends TradingOrder {
  constructor(desktop2, name) {
    super(desktop2, name);
    this.position = "Sell Buy.Formula_3";
    this.buyPrice = "Trading.Close";
    this.sellPrice = "Trading.Close";
    this.date = "Trading.FullTime";
  }
};
var DonchianDesktop_CategoryObject_11 = class extends DataConsumer {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_0 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_1 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_2 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_3 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_4 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_5 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_6 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_7 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_8 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_9 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_10 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_11 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_12 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_13 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_14 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_15 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_16 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_17 = class extends IteratorConsumerLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_18 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_19 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_20 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_21 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_22 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_23 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_24 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_25 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_26 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_27 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_28 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_29 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_30 = class extends IteratorConsumerLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop_CategoryArrow_31 = class extends DataLink {
  constructor(desktop2, name) {
    super(desktop2, name);
  }
};
var DonchianDesktop = class _DonchianDesktop extends Desktop {
  static async getDesktopAsync(controller, factory2) {
    let d = new _DonchianDesktop(factory2);
    await d.loadAsync(controller);
    return d;
  }
  constructor(factory2) {
    super(factory2);
    this.name = "DonchianDesktop";
    this.mapObjects.set("DonchianDesktop_CategoryObject_0", new DonchianDesktop_CategoryObject_0(this, "Trading"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_1", new DonchianDesktop_CategoryObject_1(this, "Average Short"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_2", new DonchianDesktop_CategoryObject_2(this, "Average Long"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_3", new DonchianDesktop_CategoryObject_3(this, "Donchian maximum"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_4", new DonchianDesktop_CategoryObject_4(this, "Donchian minimum"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_5", new DonchianDesktop_CategoryObject_5(this, "Current Position"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_6", new DonchianDesktop_CategoryObject_6(this, "Conditions"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_7", new DonchianDesktop_CategoryObject_7(this, "Sell Buy"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_8", new DonchianDesktop_CategoryObject_8(this, "Additional"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_9", new DonchianDesktop_CategoryObject_9(this, "Position"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_10", new DonchianDesktop_CategoryObject_10(this, "Order"));
    this.mapObjects.set("DonchianDesktop_CategoryObject_11", new DonchianDesktop_CategoryObject_11(this, "Chart"));
    new DonchianDesktop_CategoryArrow_0(this, "");
    new DonchianDesktop_CategoryArrow_1(this, "");
    new DonchianDesktop_CategoryArrow_2(this, "");
    new DonchianDesktop_CategoryArrow_3(this, "");
    new DonchianDesktop_CategoryArrow_4(this, "");
    new DonchianDesktop_CategoryArrow_5(this, "");
    new DonchianDesktop_CategoryArrow_6(this, "");
    new DonchianDesktop_CategoryArrow_7(this, "");
    new DonchianDesktop_CategoryArrow_8(this, "");
    new DonchianDesktop_CategoryArrow_9(this, "");
    new DonchianDesktop_CategoryArrow_10(this, "");
    new DonchianDesktop_CategoryArrow_11(this, "");
    new DonchianDesktop_CategoryArrow_12(this, "");
    new DonchianDesktop_CategoryArrow_13(this, "");
    new DonchianDesktop_CategoryArrow_14(this, "");
    new DonchianDesktop_CategoryArrow_15(this, "");
    new DonchianDesktop_CategoryArrow_16(this, "");
    new DonchianDesktop_CategoryArrow_17(this, "");
    new DonchianDesktop_CategoryArrow_18(this, "");
    new DonchianDesktop_CategoryArrow_19(this, "");
    new DonchianDesktop_CategoryArrow_20(this, "");
    new DonchianDesktop_CategoryArrow_21(this, "");
    new DonchianDesktop_CategoryArrow_22(this, "");
    new DonchianDesktop_CategoryArrow_23(this, "");
    new DonchianDesktop_CategoryArrow_24(this, "");
    new DonchianDesktop_CategoryArrow_25(this, "");
    new DonchianDesktop_CategoryArrow_26(this, "");
    new DonchianDesktop_CategoryArrow_27(this, "");
    new DonchianDesktop_CategoryArrow_28(this, "");
    new DonchianDesktop_CategoryArrow_29(this, "");
    new DonchianDesktop_CategoryArrow_30(this, "");
    new DonchianDesktop_CategoryArrow_31(this, "");
  }
  finish() {
    let objects = this.getCategoryObjects();
    let arrows = this.getCategoryArrows();
    let s0 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (s0 != void 0) arrows[0].setSource(s0);
    let t0 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t0 != void 0) arrows[0].setTarget(t0);
    let s1 = this.mapObjects.get("DonchianDesktop_CategoryObject_7");
    if (s1 != void 0) arrows[1].setSource(s1);
    let t1 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (t1 != void 0) arrows[1].setTarget(t1);
    let s2 = this.mapObjects.get("DonchianDesktop_CategoryObject_8");
    if (s2 != void 0) arrows[2].setSource(s2);
    let t2 = this.mapObjects.get("DonchianDesktop_CategoryObject_7");
    if (t2 != void 0) arrows[2].setTarget(t2);
    let s3 = this.mapObjects.get("DonchianDesktop_CategoryObject_8");
    if (s3 != void 0) arrows[3].setSource(s3);
    let t3 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (t3 != void 0) arrows[3].setTarget(t3);
    let s4 = this.mapObjects.get("DonchianDesktop_CategoryObject_7");
    if (s4 != void 0) arrows[4].setSource(s4);
    let t4 = this.mapObjects.get("DonchianDesktop_CategoryObject_5");
    if (t4 != void 0) arrows[4].setTarget(t4);
    let s5 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (s5 != void 0) arrows[5].setSource(s5);
    let t5 = this.mapObjects.get("DonchianDesktop_CategoryObject_5");
    if (t5 != void 0) arrows[5].setTarget(t5);
    let s6 = this.mapObjects.get("DonchianDesktop_CategoryObject_3");
    if (s6 != void 0) arrows[6].setSource(s6);
    let t6 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t6 != void 0) arrows[6].setTarget(t6);
    let s7 = this.mapObjects.get("DonchianDesktop_CategoryObject_4");
    if (s7 != void 0) arrows[7].setSource(s7);
    let t7 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t7 != void 0) arrows[7].setTarget(t7);
    let s8 = this.mapObjects.get("DonchianDesktop_CategoryObject_1");
    if (s8 != void 0) arrows[8].setSource(s8);
    let t8 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t8 != void 0) arrows[8].setTarget(t8);
    let s9 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (s9 != void 0) arrows[9].setSource(s9);
    let t9 = this.mapObjects.get("DonchianDesktop_CategoryObject_3");
    if (t9 != void 0) arrows[9].setTarget(t9);
    let s10 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (s10 != void 0) arrows[10].setSource(s10);
    let t10 = this.mapObjects.get("DonchianDesktop_CategoryObject_4");
    if (t10 != void 0) arrows[10].setTarget(t10);
    let s11 = this.mapObjects.get("DonchianDesktop_CategoryObject_2");
    if (s11 != void 0) arrows[11].setSource(s11);
    let t11 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t11 != void 0) arrows[11].setTarget(t11);
    let s12 = this.mapObjects.get("DonchianDesktop_CategoryObject_8");
    if (s12 != void 0) arrows[12].setSource(s12);
    let t12 = this.mapObjects.get("DonchianDesktop_CategoryObject_2");
    if (t12 != void 0) arrows[12].setTarget(t12);
    let s13 = this.mapObjects.get("DonchianDesktop_CategoryObject_8");
    if (s13 != void 0) arrows[13].setSource(s13);
    let t13 = this.mapObjects.get("DonchianDesktop_CategoryObject_1");
    if (t13 != void 0) arrows[13].setTarget(t13);
    let s14 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (s14 != void 0) arrows[14].setSource(s14);
    let t14 = this.mapObjects.get("DonchianDesktop_CategoryObject_2");
    if (t14 != void 0) arrows[14].setTarget(t14);
    let s15 = this.mapObjects.get("DonchianDesktop_CategoryObject_6");
    if (s15 != void 0) arrows[15].setSource(s15);
    let t15 = this.mapObjects.get("DonchianDesktop_CategoryObject_1");
    if (t15 != void 0) arrows[15].setTarget(t15);
    let s16 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s16 != void 0) arrows[16].setSource(s16);
    let t16 = this.mapObjects.get("DonchianDesktop_CategoryObject_7");
    if (t16 != void 0) arrows[16].setTarget(t16);
    let s17 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s17 != void 0) arrows[17].setSource(s17);
    let t17 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t17 != void 0) arrows[17].setTarget(t17);
    let s18 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s18 != void 0) arrows[18].setSource(s18);
    let t18 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t18 != void 0) arrows[18].setTarget(t18);
    let s19 = this.mapObjects.get("DonchianDesktop_CategoryObject_10");
    if (s19 != void 0) arrows[19].setSource(s19);
    let t19 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t19 != void 0) arrows[19].setTarget(t19);
    let s20 = this.mapObjects.get("DonchianDesktop_CategoryObject_10");
    if (s20 != void 0) arrows[20].setSource(s20);
    let t20 = this.mapObjects.get("DonchianDesktop_CategoryObject_7");
    if (t20 != void 0) arrows[20].setTarget(t20);
    let s21 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s21 != void 0) arrows[21].setSource(s21);
    let t21 = this.mapObjects.get("DonchianDesktop_CategoryObject_5");
    if (t21 != void 0) arrows[21].setTarget(t21);
    let s22 = this.mapObjects.get("DonchianDesktop_CategoryObject_10");
    if (s22 != void 0) arrows[22].setSource(s22);
    let t22 = this.mapObjects.get("DonchianDesktop_CategoryObject_5");
    if (t22 != void 0) arrows[22].setTarget(t22);
    let s23 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s23 != void 0) arrows[23].setSource(s23);
    let t23 = this.mapObjects.get("DonchianDesktop_CategoryObject_3");
    if (t23 != void 0) arrows[23].setTarget(t23);
    let s24 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s24 != void 0) arrows[24].setSource(s24);
    let t24 = this.mapObjects.get("DonchianDesktop_CategoryObject_4");
    if (t24 != void 0) arrows[24].setTarget(t24);
    let s25 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s25 != void 0) arrows[25].setSource(s25);
    let t25 = this.mapObjects.get("DonchianDesktop_CategoryObject_2");
    if (t25 != void 0) arrows[25].setTarget(t25);
    let s26 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s26 != void 0) arrows[26].setSource(s26);
    let t26 = this.mapObjects.get("DonchianDesktop_CategoryObject_1");
    if (t26 != void 0) arrows[26].setTarget(t26);
    let s27 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s27 != void 0) arrows[27].setSource(s27);
    let t27 = this.mapObjects.get("DonchianDesktop_CategoryObject_10");
    if (t27 != void 0) arrows[27].setTarget(t27);
    let s28 = this.mapObjects.get("DonchianDesktop_CategoryObject_9");
    if (s28 != void 0) arrows[28].setSource(s28);
    let t28 = this.mapObjects.get("DonchianDesktop_CategoryObject_7");
    if (t28 != void 0) arrows[28].setTarget(t28);
    let s29 = this.mapObjects.get("DonchianDesktop_CategoryObject_10");
    if (s29 != void 0) arrows[29].setSource(s29);
    let t29 = this.mapObjects.get("DonchianDesktop_CategoryObject_9");
    if (t29 != void 0) arrows[29].setTarget(t29);
    let s30 = this.mapObjects.get("DonchianDesktop_CategoryObject_10");
    if (s30 != void 0) arrows[30].setSource(s30);
    let t30 = this.mapObjects.get("DonchianDesktop_CategoryObject_0");
    if (t30 != void 0) arrows[30].setTarget(t30);
    let s31 = this.mapObjects.get("DonchianDesktop_CategoryObject_11");
    if (s31 != void 0) arrows[31].setSource(s31);
    let t31 = this.mapObjects.get("DonchianDesktop_CategoryObject_9");
    if (t31 != void 0) arrows[31].setTarget(t31);
    objects[1].postSetArrow();
    objects[2].postSetArrow();
    objects[3].postSetArrow();
    objects[4].postSetArrow();
    objects[5].postSetArrow();
    objects[6].postSetArrow();
    objects[7].postSetArrow();
    objects[8].postSetArrow();
    objects[9].postSetArrow();
    objects[10].postSetArrow();
    objects[11].postSetArrow();
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/EmptyChecker.ts
var EmptyChecker = class extends EmptyObject {
  constructor() {
    super("");
    this.types.push("ICheck");
    this.types.push("EmptyChecker");
    this.typeName = "EmptyChecker";
  }
  check(o) {
    return o == void 0;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/DifferentialEquations/Processors/DifferentialEquationProcessor.ts
var DifferentialEquationProcessor = class {
  constructor() {
    this.fstart = 0;
    this.ffinish = 0;
    this.performer = new Performer();
    this.dimension = 0;
    this.equations = [];
    this.norm = [];
    this.measurements = [];
    this.typeName = "DifferentialEquationProcessor";
    this.types = ["IObject", "IDifferentialEquationProcessor", "DifferentialEquationProcessor"];
    this.name = "";
  }
  actionT2(t1, t2) {
    this.stepDifferentialEquations(t1, t2);
  }
  isEmptyActionT2() {
    return false;
  }
  getName() {
    return this.name;
  }
  getClassName() {
    return this.typeName;
  }
  imlplementsType(type) {
    return this.types.includes(type);
  }
  getDifferentialEquations() {
    return this.equations;
  }
  addRangeDifferentialEquations(equations) {
    for (let e of equations) {
      this.equations.push(e);
      let m = e;
      this.measurements.push(m);
    }
  }
  stepDifferentialEquations(start, finish) {
    this.fstart = start;
    this.ffinish = finish;
    throw new OwnNotImplemented("DifferentialEquationProcessor");
  }
  updateDimension() {
    this.dimension = 0;
    for (var m of this.measurements) {
      this.dimension += m.getMeasurementsCount();
    }
  }
  getDifferentialEquationsTimeProvider() {
    return this.timeProvider;
  }
  setDifferentialEquationsTimeProvider(time) {
    this.timeProvider = time;
  }
  clearDifferentialEquations() {
    this.measurements.length = 0;
    this.norm.length = 0;
    this.equations.length = 0;
  }
  newDifferentialEquations() {
    throw new OwnNotImplemented("DifferentialEquationProcessor");
  }
  getDifferentialEquationsDimention() {
    return 0;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Measurements/DifferentialEquations/Processors/RungeProcessor.ts
var RungeProcessor = class _RungeProcessor extends DifferentialEquationProcessor {
  constructor() {
    super(...arguments);
    this.w = [];
    this.z = [];
    this.f = [];
    this.k = [];
    this.a = [0.5, 0.5, 1, 1, 0.5];
  }
  stepDifferentialEquations(t0, t1) {
    let dt = t1 - t0;
    let i = 0;
    for (let m of this.measurements) {
      let count2 = m.getMeasurementsCount();
      m.updateMeasurements();
      for (let j2 = 0; j2 < count2; j2++) {
        var mea = m.getMeasurement(j2);
        var x = mea.getMeasurementValue();
        let v = this.performer.convertFromAny(x);
        this.w[i] = v;
        this.f[i] = v;
        ++i;
      }
      var s = m;
      s.copyVariablesToSolver(i - count2, this.w);
    }
    let t = t0;
    this.timeProvider.setTime(t);
    i = 0;
    for (let s2 of this.equations) {
      s2.calculateDerivations();
      let m = s2;
      let count2 = m.getMeasurementsCount();
      for (var j = 0; j < count2; j++) {
        var mea = m.getMeasurement(j);
        this.z[i] = this.performer.getDerivationMeasurement(mea);
        this.k[0][i] = this.z[i] * dt;
        this.w[i] = this.f[i] + 0.5 * this.k[0][i];
        ++i;
      }
      s2.copyVariablesToSolver(i - count2, this.w);
    }
    t = t0 + 0.5 * dt;
    this.timeProvider.setTime(t);
    i = 0;
    for (let s2 of this.equations) {
      s2.calculateDerivations();
      let m = s2;
      let count2 = m.getMeasurementsCount();
      for (var j = 0; j < count2; j++) {
        var mea = m.getMeasurement(j);
        this.z[i] = this.performer.getDerivationMeasurement(mea);
        this.k[1][i] = this.z[i] * dt;
        this.w[i] = this.f[i] + 0.5 * this.k[1][i];
        ++i;
      }
      s2.copyVariablesToSolver(i - count2, this.w);
    }
    t = t0 + 0.5 * dt;
    this.timeProvider.setTime(t);
    i = 0;
    for (let s2 of this.equations) {
      s2.calculateDerivations();
      let m = s2;
      let count2 = m.getMeasurementsCount();
      for (var j = 0; j < count2; j++) {
        var mea = m.getMeasurement(j);
        this.z[i] = this.performer.getDerivationMeasurement(mea);
        this.k[2][i] = this.z[i] * dt;
        this.w[i] = this.f[i] + this.k[2][i];
        ++i;
      }
      s2.copyVariablesToSolver(i - count2, this.w);
    }
    t = t0 + dt;
    this.timeProvider.setTime(t);
    i = 0;
    for (let s2 of this.equations) {
      s2.calculateDerivations();
      let m = s2;
      let count2 = m.getMeasurementsCount();
      for (var j = 0; j < count2; j++) {
        var mea = m.getMeasurement(j);
        this.z[i] = this.performer.getDerivationMeasurement(mea);
        this.k[3][i] = this.z[i] * dt;
        ++i;
      }
      s2.copyVariablesToSolver(i - count2, this.w);
    }
    i = 0;
    for (let s2 of this.equations) {
      let m = s2;
      var count = m.getMeasurementsCount();
      for (var j = 0; j < count; j++) {
        let c = (this.k[0][i] + 2 * this.k[1][i] + 2 * this.k[2][i] + this.k[3][i]) / 6;
        this.f[i] += c;
        ++i;
      }
      s2.copyVariablesToSolver(i - count, this.f);
    }
  }
  updateDimension() {
    super.updateDimension();
    let n = this.dimension;
    this.z = new Array(n);
    this.f = new Array(n);
    this.w = new Array(n);
    for (let i = 0; i < 4; i++) {
      let x = new Array(n);
      this.k.push(x);
    }
  }
  newDifferentialEquations() {
    return new _RungeProcessor();
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/FactoryObject.ts
var FactoryObject = class extends EmptyObject {
  constructor(name, factory2) {
    super(name);
    this.types.push("IFactoryConsumer");
    this.types.push("FactoryObject");
    this.typeName = "FactoryObject";
    this.setFactory(factory2);
  }
  setConsumerFactory(factory2) {
    this.setFactory(factory2);
  }
  getConsumerFactory() {
    return this.factory;
  }
  detectShow() {
    if (this.showObj != void 0) return;
    const sh = this.factory.getFactory("IShowObject");
    if (sh != void 0) this.showObj = sh;
  }
  showObject(sender, object, name) {
    if (this.showObj == void 0) return;
    this.showObj.show(sender, object, name);
  }
  setFactory(factory2) {
    if (factory2 == null) return;
    this.factory = factory2;
    this.detectShow();
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/UniversalFactory.ts
var UniversalFactory = class extends FactoryObject {
  constructor() {
    super("", void 0);
    this.factories = /* @__PURE__ */ new Map();
    this.factory = this;
    this.types.push("IFactory");
    this.types.push("UniversalFactory");
    this.typeName = "UniversalFactory";
  }
  removeFactory(t, type) {
    let x = this.factories.get(type);
    if (x != t) throw new OwnError("Illegal delete factory", "", "");
    this.factories.delete(type);
  }
  getFactory(typeName) {
    var p = this.factories.get(typeName);
    var pp = this.performer.convertObject(p, typeName);
    return pp.length == 0 ? void 0 : pp[0];
  }
  addFactory(t, type) {
    if (this.factories.has(type)) throw new OwnError("Factory", type, "aleady exists");
    var tt = this.performer.convertObject(t, type);
    if (tt.length > 0) this.factories.set(type, tt[0]);
    else
      console.log("FAIL ", type);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Runtime/DataRuntimeConsumer.ts
var DataRuntimeConsumer = class extends EmptyObject {
  constructor(dataConsumer, factory2) {
    super("");
    this.name = "";
    this.performer = new Performer();
    this.mPerformer = new PerformerMeasuremets();
    this.measurements = [];
    this.categoryObjects = [];
    this.categoryObjectsMap = /* @__PURE__ */ new Map();
    this.categoryArrows = [];
    this.started = [];
    this.objects = [];
    this.typeName = "DataRuntimeConsumer";
    let tt = [
      "IComponentCollection",
      "IDataRuntime",
      "DataRuntimeConsumer",
      "IFactoryConsumer"
    ];
    for (let x of tt) {
      this.types.push(x);
    }
    this.factory = factory2;
    this.dataConsumer = dataConsumer;
    this.prepare(dataConsumer);
    this.objects = [];
    this.performer.getAllIObjects(this.categoryObjects, this.categoryArrows, this.objects);
  }
  setConsumerFactory(factory2) {
    this.factory = factory2;
  }
  getConsumerFactory() {
    return this.factory;
  }
  prepare(dataConsumer) {
    let nm = [];
    this.addDataConsumer(dataConsumer, nm);
    for (let i = nm.length - 1; i >= 0; i--) {
      var n = nm[i];
      this.measurements.push(nm[i]);
      if (this.performer.implementsType(n, "ICategoryObject")) {
        this.addCategoryObjectToRuntime(n);
      }
      if (this.performer.implementsType(n, "IStarted")) {
        this.started.push(n);
      }
    }
    if (this.performer.implementsType(dataConsumer, "IMeasurements")) {
      this.measurements.push(dataConsumer);
    }
    this.measurements = this.performer.sortMeasurements(this.measurements);
    var ehc = dataConsumer;
    if (ehc != void 0) {
      var evs = ehc.getEventHandlerEvents();
      for (let evt of evs) {
        var cov = evt;
        if (cov != void 0) {
          if (!this.categoryObjects.includes(cov)) {
            this.categoryObjects.push(cov);
          }
        }
      }
    }
    this.performer.addUnique(this.categoryObjects, dataConsumer);
  }
  getCategoryObjects() {
    return this.categoryObjects;
  }
  getCategoryArrows() {
    return this.categoryArrows;
  }
  getObjectCollection() {
    return this.objects;
  }
  getCategoryObject(name) {
    let a = this.categoryObjectsMap.get(name);
    if (a != void 0) return a;
    return void 0;
  }
  addCategoryObjectToRuntime(object) {
    this.categoryObjects.push(object);
    var n = object.getCategoryObjectName();
    this.categoryObjectsMap.set(n, object);
  }
  getRuntimeObject(name) {
    return this.categoryObjectsMap.get(name);
  }
  getStarted() {
    return this.started;
  }
  updateRuntime() {
    let n = this.measurements.length;
    for (let i = 0; i < n; i++) {
      this.measurements[i].updateMeasurements();
    }
  }
  stepRuntime(begin, end) {
    this.any = begin;
    this.any = end;
  }
  refreshRuntime() {
  }
  startRuntime(time) {
    for (let st of this.started) {
      st.startedStart(time);
    }
  }
  setTimeProvider(timeProvider) {
    this.timeProvider = timeProvider;
    this.mPerformer.setTimeProvider(timeProvider, this.measurements);
  }
  getTimeProvider() {
    return this.timeProvider;
  }
  getRuntimeObjects() {
    return this.categoryObjects;
  }
  getRuntimeArrows() {
    return this.categoryArrows;
  }
  addDataConsumer(dc, measurements) {
    var m = dc.getAllMeasurements();
    var n = m.length;
    if (n != 0) {
      for (let i = 0; i < n; i++) {
        let mea = m[i];
        if (measurements.indexOf(mea) >= 0) {
          continue;
        }
        measurements.push(mea);
        if (!this.performer.implementsType(mea, "IDataConsumer")) {
          continue;
        }
        let c = mea;
        this.addDataConsumer(c, measurements);
      }
    } else {
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Runtime/DataRuntimeConsumerODE.ts
var DataRuntimeConsumerODE = class extends DataRuntimeConsumer {
  constructor(consumer2, factory2) {
    super(consumer2, factory2);
    this.differentialEquations = [];
    this.typeName = "DataRuntimeConsumerODE";
    this.types.push("IStepActionHolder");
    this.types.push("DataRuntimeConsumerODE");
    let processor = factory2.getFactory("IDifferentialEquationProcessor");
    if (processor === void 0) {
      throw new OwnNotImplemented("DataRuntimeConsumerODE");
    }
    this.processor = processor.newDifferentialEquations();
    let equations = [];
    for (let measurements of this.measurements) {
      if (this.performer.implementsType(measurements, "IDifferentialEquationSolver")) {
        let solver = measurements;
        equations.push(solver);
      }
    }
    this.processor.addRangeDifferentialEquations(equations);
    this.processor.updateDimension();
  }
  getStepAction() {
    return this.processor;
  }
  setTimeProvider(timeProvider) {
    super.setTimeProvider(timeProvider);
    this.processor.setDifferentialEquationsTimeProvider(timeProvider);
  }
  stepRuntime(begin, end) {
    this.processor.stepDifferentialEquations(begin, end);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Event/PerformerEvents.ts
var PerformerEvents = class {
  constructor() {
    this.isEnabled = false;
    this.performer = new Performer();
    this.timerAction = new TimerAction();
  }
  actionT(t) {
    t.setEventEnabled(this.isEnabled);
  }
  static {
    this.timeScale = 1;
  }
  static getTimeScale() {
    return this.timeScale;
  }
  static setTimeScale(timeScale) {
    this.timeScale = timeScale;
  }
  setComponentCollectionEnabled(collection, enabled) {
    if (this.isEnabled == enabled) return;
    this.isEnabled = enabled;
    this.performer.forEach(collection, this, "IEventStart");
  }
  setComponentCollectionTimer(collection, factory2) {
    if (factory2 === void 0) return;
    this.timerAction.set(factory2);
    this.performer.forEach(collection, this.timerAction, "ITimerConsumer");
  }
  isEmptyActionT() {
    return false;
  }
};
var TimerAction = class {
  actionT(t) {
    t.setTimer(this.factory);
  }
  isEmptyActionT() {
    return false;
  }
  set(factory2) {
    this.factory = factory2;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Event/Runtime/DataRuntimeConsumerEvent.ts
var DataRuntimeConsumerEvent = class extends DataRuntimeConsumerODE {
  constructor(dataConsumer, factory2) {
    super(dataConsumer, factory2);
    this.ePerformer = new PerformerEvents();
    this.isEnabled = false;
    this.typeName = "DataRuntimeConsumerEvent";
    this.types.push("IRealtimeCollection");
    this.types.push("IExternalUpdate");
    this.types.push("DataRuntimeConsumerEvent");
    var up = this.dataConsumer;
    var ob = this.dataConsumer;
    let a = new ActionArray();
    this.getExternalUpdate(ob, this, a);
    up.setExternalUpdate(a);
  }
  getExternalUpdate(obj, realime, action) {
    this.mPerformer.createUpdateMeasurementsAction(this, action);
    this.act = action;
    this.fo = obj;
    this.fre = realime;
  }
  prepare(dataConsumer) {
    super.prepare(dataConsumer);
    let x = this.performer.convertObject(dataConsumer, "IEventHandler");
    if (x.length == 0) return;
    let evetns = x[0].getEventHandlerEvents();
    for (let event of evetns) {
      let y = this.performer.convertObject(event, "ICategoryObject");
      if (y.length > 0) {
        let z = y[0];
        if (!this.categoryObjects.includes(z)) {
          this.categoryObjects.push(z);
        }
      }
    }
  }
  getComponentCollection() {
    return this;
  }
  setComponentCollection(collection) {
    this.fc = collection;
  }
  isComponentCollectionRunning() {
    return this.isEnabled;
  }
  setComponentCollectionRunning(running) {
    if (this.isEnabled == running) return;
    this.isEnabled = running;
    this.ePerformer.setComponentCollectionEnabled(this, running);
  }
  setTimerFactory(timerFactory) {
    this.ePerformer.setComponentCollectionTimer(this, timerFactory);
  }
  setTimeProvider(timeProvider) {
    this.mPerformer.setTimeProviderCollection(this, timeProvider);
    this.processor.setDifferentialEquationsTimeProvider(timeProvider);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Comparators/PositionComparer.ts
var PositionComparer = class {
  compare(x, y) {
    if (this.isSource(x, y)) return -1;
    if (this.isSource(y, x)) return 1;
    return 0;
  }
  isSource(source, target) {
    var tp = target.getParentFrame();
    if (tp === void 0) {
      return false;
    }
    if (tp == source) {
      return true;
    }
    if (this.isSource(source, tp)) {
      return true;
    }
    return false;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/RealMatrixProcessor/RealMatrix.ts
var RealMatrix = class {
  createDiagonal(n, diag) {
    let m = [];
    for (var i = 0; i < n; i++) {
      let x = [];
      m.push(x);
      for (var j = 0; j < n; j++) {
        x.push(0);
      }
    }
    for (var i = 0; i < n; i++) m[i][i] = diag;
    return m;
  }
  partialSquare(x, startIndex, length) {
    let a = 0;
    for (let i = 0; i < length; i++) {
      let c = x[i + startIndex];
      a += c * c;
    }
    return a;
  }
  partialNorm(x, startIndex, length) {
    return Math.sqrt(this.partialSquare(x, startIndex, length));
  }
  plusEqual(x, y) {
    for (let i = 0; i < x.length; i++) {
      x[i] += y[i];
    }
  }
  setLength(x, n) {
    x.fill(0, 0, n - 1);
  }
  setLength2(x, n, m) {
    for (let i = 0; i < n; i++) {
      let y = [];
      this.setLength(y, m);
      x.push(y);
    }
  }
  normalize(inp, outp, offset) {
    let a = 0;
    for (let i = offset; i < outp.length + offset; i++) {
      let b = inp[i];
      a += b * b;
    }
    a = Math.sqrt(a);
    let c = 1 / a;
    for (let i = 0; i < outp.length; i++) {
      outp[i] = c * inp[i + offset];
    }
    return a;
  }
  getNorm(vector) {
    return Math.sqrt(this.square(vector));
  }
  copySign(a, b) {
    return Math.abs(a) * Math.sign(b);
  }
  invertA(a) {
    let x = [];
    var n = a.length;
    this.setLength2(x, n, n);
    this.invert(a, x);
    return x;
  }
  invert(a, aInverted) {
    let e = 0;
    let y = 0;
    let det = 0;
    let w = 0;
    let d = 0;
    let d1 = 0;
    let i = 0;
    let j = 0;
    let k = 0;
    let ir = 0;
    let ip = 0;
    let n = a.length;
    let jz = [];
    let c = [0];
    let ab = [0];
    jz.fill(0, 0, n - 1);
    c.fill(0, 0, n - 1);
    ab.fill(0, 0, n - 1);
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        aInverted[i][j] = a[i][j];
      }
    }
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        e = Math.abs(aInverted[i][j]);
        if (d < e) d = e;
      }
    }
    d1 = 1 / d;
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        aInverted[i][j] *= d1;
      }
    }
    e = 1e-26;
    det = 1;
    for (i = 0; i < n; i++) {
      jz[i] = i;
    }
    for (i = 0; i < n; i++) {
      k = i;
      y = aInverted[i][i];
      ir = i - 1;
      ip = i + 1;
      if (ip < n) {
        for (j = ip; j < n; j++) {
          w = aInverted[i][j];
          if (Math.abs(w) > Math.abs(y)) {
            k = j;
            y = w;
          }
        }
      }
      det *= y;
      y = 1 / y;
      for (j = 0; j < n; j++) {
        c[j] = aInverted[j][k];
        aInverted[j][k] = aInverted[j][i];
        aInverted[j][i] = -c[j] * y;
        ab[j] = aInverted[i][j] * y;
        aInverted[i][j] = ab[j];
      }
      aInverted[i][i] = y;
      j = jz[i];
      jz[i] = jz[k];
      jz[k] = j;
      k = 0;
      do {
        if (k <= ir || k >= ip) {
          j = 0;
          do {
            if (j <= ir || j >= ip) {
              aInverted[k][j] -= ab[j] * c[k];
            }
            j++;
          } while (j < n);
        }
        k++;
      } while (k < n);
    }
    i = 0;
    do {
      k = jz[i];
      if (k != i) {
        for (j = 0; j < n; j++) {
          w = aInverted[i][j];
          aInverted[i][j] = aInverted[k][j];
          aInverted[k][j] = w;
        }
        ip = jz[i];
        jz[i] = jz[k];
        jz[k] = ip;
        det = -det;
      } else {
        i++;
      }
    } while (i < n);
    d1 = 1 / d;
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        aInverted[i][j] *= d1;
      }
    }
  }
  det(a) {
    let A = [];
    let n = a.length;
    this.setLength2(A, n, n);
    for (let ii = 0; ii < n; ii++) {
      for (let jj = 0; jj < n; jj++) {
        A[ii][jj] = a[ii][jj];
      }
    }
    let bb = false;
    let MAX = 0;
    let D = 1;
    let T = 0;
    let k, i, j = 0;
    let z = 0;
    for (k = 0; k < n; k++) {
      MAX = 0;
      for (i = k; i < n; i++) {
        T = A[i][k];
        if (!(T == 0)) {
          MAX = T;
          j = i;
          bb = true;
        }
        if (bb) {
          break;
        }
      }
      if (MAX == 0) {
        return z;
      }
      if (j != k) {
        D = -D;
        for (i = k; i < n; i++) {
          T = A[j][i];
          A[j][i] = A[k][i];
          A[k][i] = T;
        }
      }
      for (i = k + 1; i < n; i++) {
        T = A[i][k] / MAX;
        for (j = k + 1; j < n; j++) {
          A[i][j] = A[i][j] - T * A[k][j];
        }
      }
      D = D * A[k][k];
    }
    return D;
  }
  scalarProduct(x, y) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      sum += x[i] * y[i];
    }
    return sum;
  }
  multiply(vector, coefficient) {
    for (let i = 0; i < vector.length; i++) {
      vector[i] = vector[i] * coefficient;
    }
  }
  multiplyMatrix(a, b, c) {
    let a1 = a.length;
    let a2 = a[0].length;
    let b1 = b.length;
    let b2 = b[0].length;
    let c1 = c.length;
    let c2 = c[0].length;
    if (a2 != b1 || a1 != c1 || b2 != c1) {
      throw new OwnError("Illegal matrix product dimension", "", "");
    }
    let i, j, k = 0;
    for (i = 0; i < c1; i++) {
      for (j = 0; j < c2; j++) {
        c[i][j] = 0;
      }
    }
    for (i = 0; i < a1; i++) {
      for (j = 0; j < b2; j++) {
        for (k = 0; k < a2; k++) {
          c[i][j] += a[i][k] * b[k][j];
        }
      }
    }
  }
  square(vec) {
    let a = 0;
    for (let x of vec) {
      a += x * x;
    }
    return a;
  }
  norm(vec) {
    return Math.sqrt(this.square(vec));
  }
  multiplyRight(matrix, vector, product) {
    if (matrix[0].length != vector.length || matrix.length != product.length) {
      throw new OwnError("Illegal dimension of vector or matrix product", "");
    }
    var i, j = 0;
    for (i = 0; i < product.length; i++) {
      product[i] = 0;
    }
    for (i = 0; i < matrix.length; i++) {
      for (j = 0; j < vector.length; j++) {
        product[i] += matrix[i][j] * vector[j];
      }
    }
  }
  multiplyLeft(vector, matrix, product) {
    if (matrix.length != vector.length || matrix[0].length != product.length) {
      throw new OwnError("Illegal dimension of vector or matrix product", "");
    }
    let i, j = 0;
    for (i = 0; i < product.length; i++) {
      product[i] = 0;
    }
    for (i = 0; i < matrix[0].length; i++) {
      for (j = 0; j < vector.length; j++) {
        product[i] += matrix[j][i] * vector[j];
      }
    }
  }
  transpose(x, y) {
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[0].length; j++) {
        y[j][i] = x[i][j];
      }
    }
  }
  htah(h, a, result) {
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[0].length; j++) {
        result[i][j] = 0;
        for (let k = 0; k < a.length; k++) {
          for (let l = 0; l < a[0].length; l++) {
            result[i][j] += h[k][i] * a[k][l] * h[l][j];
          }
        }
      }
    }
  }
  addMatrix(x, y, z) {
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[0].length; j++) {
        z[i][j] = x[i][j] + y[i][j];
      }
    }
  }
  addVector(x, y, z) {
    for (let i = 0; i < x.length; i++) {
      z[i] = x[i] + y[i];
    }
  }
  diffatrix(x, y, z) {
    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < x[0].length; j++) {
        z[i][j] = x[i][j] - y[i][j];
      }
    }
  }
  diffVector(x, y, z) {
    for (let i = 0; i < x.length; i++) {
      z[i] = x[i] + y[i];
    }
  }
  lu_Factor(A, indx) {
    let i = 0, j = 0, k = 0;
    let jp = 0;
    let t = 0;
    let M = A.length;
    let N = A[0].length;
    let minMN = M < N ? M : N;
    for (j = 0; j < minMN; j++) {
      jp = j;
      t = Math.abs(A[j][j]);
      for (i = j + 1; i < M; i++) {
        if (Math.abs(A[i][j]) > Math.abs(t)) {
          jp = i;
          t = Math.abs(A[i][j]);
        }
      }
      indx[j] = jp;
      let zero = 0;
      if (A[jp][j] == zero) {
        return false;
      }
      if (jp != j) {
        for (k = 0; k < N; k++) {
          t = A[j][k];
          A[j][k] = A[jp][k];
          A[jp][k] = t;
        }
      }
      if (j < M - 1) {
        let y = 1;
        let recp = y / A[j][j];
        for (k = j + 1; k < M; k++) {
          A[k][j] *= recp;
        }
      }
      if (j < minMN - 1) {
        let ii, jj = 0;
        for (ii = j + 1; ii < M; ii++) {
          for (jj = j + 1; jj < N; jj++) {
            A[ii][jj] -= A[ii][j] * A[j][jj];
          }
        }
      }
    }
    return true;
  }
  lu_Solve(A, indx, b) {
    let i, ii = -1, ip = 0, j;
    let n = b.length;
    let sum = 0;
    for (i = 0; i < n; i++) {
      ip = indx[i];
      sum = b[ip];
      b[ip] = b[i];
      if (ii >= 0) {
        for (j = ii; j < i; j++) {
          sum -= A[i][j] * b[j];
        }
      } else if (Math.abs(sum) > 0) {
        ii = i;
      }
      b[i] = sum;
    }
    for (i = n - 1; i >= 0; i--) {
      sum = b[i];
      for (j = i + 1; j < n; j++) {
        sum -= A[i][j] * b[j];
      }
      b[i] = sum / A[i][i];
    }
    return true;
  }
  solve(a, indx, b) {
    if (!this.lu_Factor(a, indx)) {
      return false;
    }
    if (!this.lu_Solve(a, indx, b)) {
      return false;
    }
    return true;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Utilities/Collections/CollectionProcessor.ts
var CollectionProcessor = class {
  arrayCopy(source, sourceIndex, destinationArray, destinationIndex, length) {
    for (let i = 0; i < length; i++) {
      destinationArray[destinationIndex + i] = source[sourceIndex + i];
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Vector3D/Vector3DProcessor.ts
var Vector3DProcessor = class {
  constructor() {
    // private idQuaternion: number[] = [1, 0, 0, 0];
    this.realMatrix = new RealMatrix();
    this.collectionProcessor = new CollectionProcessor();
  }
  quaternionNormalize(quaternion) {
    let a = 0;
    for (let q of quaternion) {
      a += q * q;
    }
    let b = 1 / Math.sqrt(a);
    for (var i = 0; i < 4; i++) {
      quaternion[i] *= b;
    }
  }
  quaternionNormalizeQ(quaternion) {
    let a = quaternion.W * quaternion.W + quaternion.X * quaternion.X + quaternion.Y * quaternion.Y + quaternion.Z * quaternion.Z;
    let b = 1 / Math.sqrt(a);
    quaternion.W *= b;
    quaternion.X *= b;
    quaternion.Y *= b;
    quaternion.Z *= b;
  }
  quaternionToEulerAngles(angles, quaternion) {
    this.quaternionToEulerAnglesXYZW(angles, quaternion[1], quaternion[2], quaternion[3], quaternion[0]);
  }
  quaternionToEulerAnglesXYZW(angles, x, y, z, w) {
    let sinr_cosp = 2 * (w * x + y * z);
    let cosr_cosp = 1 - 2 * (x * x + y * y);
    angles.setRoll(Math.atan2(sinr_cosp, cosr_cosp));
    let sinp = 2 * (w * y - z * x);
    if (Math.abs(sinp) >= 1) {
      angles.setPitch(this.realMatrix.copySign(Math.PI / 2, sinp));
    } else {
      angles.setPitch(Math.asin(sinp));
    }
    let siny_cosp = 2 * (w * z + x * y);
    let cosy_cosp = 1 - 2 * (y * y + z * z);
    angles.setYaw(Math.atan2(siny_cosp, cosy_cosp));
  }
  rotateOmega(omega, quaternion, time) {
    let o = this.realMatrix.partialNorm(omega, 0, 3);
    let phi = 0.5 * o * time;
    let s = Math.sin(phi);
    quaternion[0] = Math.sqrt(1 - s * s);
    o = 1 / o;
    for (let i = 0; i < 3; i++) {
      quaternion[i + 1] = o * s * omega[i];
    }
  }
  square3d(x) {
    if (x.length != 3) {
    }
    return x[0] * x[0] + x[1] * x[1] + x[2] * x[2];
  }
  vectorProduct(x, y, z) {
    z[0] = x[1] * y[2] - x[2] * y[1];
    z[1] = x[2] * y[0] - x[0] * y[2];
    z[2] = x[0] * y[1] - x[1] * y[0];
  }
  quaternionMultiply(x, y, z) {
    z[0] = x[0] * y[0] - x[1] * y[1] - x[2] * y[2] - x[3] * y[3];
    z[1] = x[0] * y[1] + x[1] * y[0] + x[2] * y[3] - x[3] * y[2];
    z[2] = x[0] * y[2] + x[2] * y[0] + x[3] * y[1] - x[1] * y[3];
    z[3] = x[0] * y[3] + x[3] * y[0] + x[1] * y[2] - x[2] * y[1];
  }
  quaternionMultiplyQ(x, y, z) {
    z.W = x.W * y.W - x.X * y.X - x.Y * y.Y - x.Z * y.Z;
    z.X = x.W * y.X + x.X * y.W + x.Y * y.Z - x.Z * y.Y;
    z.Y = x.W * y.Y + x.Y * y.W + x.Z * y.X - x.Z * y.Z;
    z.Z = x.W * y.Z + x.Z * y.W + x.X * y.Y - x.Y * y.X;
  }
  quaternionInvertMultiply(x, y, z) {
    z[0] = x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
    z[1] = x[0] * y[1] - x[1] * y[0] - x[2] * y[3] + x[3] * y[2];
    z[2] = x[0] * y[2] - x[2] * y[0] - x[3] * y[1] + x[1] * y[3];
    z[3] = x[0] * y[3] - x[3] * y[0] - x[1] * y[2] + x[2] * y[1];
  }
  quaternionInvertOmega(quaterinon, omegaIn, omegaOut) {
    omegaOut[0] = quaterinon[0] * omegaIn[0] - quaterinon[2] * omegaIn[2] + quaterinon[3] * omegaIn[1];
    omegaOut[1] = quaterinon[0] * omegaIn[1] - quaterinon[3] * omegaIn[0] + quaterinon[1] * omegaIn[2];
    omegaOut[2] = quaterinon[0] * omegaIn[2] - quaterinon[1] * omegaIn[1] + quaterinon[2] * omegaIn[0];
  }
  quaternionToMatrix(q, m, qq) {
    let norm = 1 / Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
    for (let i = 0; i < 4; i++) {
      q[i] *= norm;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j <= i; j++) {
        qq[i][j] = q[i] * q[j];
      }
    }
    m[0][0] = qq[0][0] + qq[1][1] - qq[2][2] - qq[3][3];
    m[0][1] = 2 * (qq[2][1] - qq[3][0]);
    m[0][2] = 2 * (qq[2][0] + qq[3][1]);
    m[1][0] = 2 * (qq[3][0] + qq[2][1]);
    m[1][1] = qq[0][0] - qq[1][1] + qq[2][2] - qq[3][3];
    m[1][2] = 2 * (qq[3][2] - qq[1][0]);
    m[2][0] = 2 * (qq[3][1] - qq[2][0]);
    m[2][1] = 2 * (qq[1][0] + qq[3][2]);
    m[2][2] = qq[0][0] - qq[1][1] - qq[2][2] + qq[3][3];
  }
  calculateDynamics(q, der, omega, qd) {
    let norm = 1 / Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
    for (let i = 0; i < 4; i++) {
      q[i] *= norm;
      der[i] *= norm;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        qd[i][j] = q[i] * der[j];
      }
    }
    omega[0] = 2 * (-qd[2][3] + qd[3][2] + qd[0][1] - qd[1][0]);
    omega[1] = 2 * (-qd[3][1] + qd[1][3] + qd[0][2] - qd[2][0]);
    omega[2] = 2 * (-qd[1][2] + qd[2][1] + qd[0][3] - qd[3][0]);
  }
  calculateDynamicsLong(q, der, m, omega, qq, qd) {
    this.calculateDynamics(q, der, omega, qd);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j <= i; j++) {
        qq[i][j] = q[i] * q[j];
      }
    }
    m[0][0] = qq[0][0] + qq[1][1] - qq[2][2] - qq[3][3];
    m[0][1] = 2 * (qq[2][1] - qq[3][0]);
    m[0][2] = 2 * (qq[2][0] + qq[3][1]);
    m[1][0] = 2 * (qq[3][0] + qq[2][1]);
    m[1][1] = qq[0][0] - qq[1][1] + qq[2][2] - qq[3][3];
    m[1][2] = 2 * (qq[3][2] - qq[1][0]);
    m[2][0] = 2 * (qq[3][1] - qq[2][0]);
    m[2][1] = 2 * (qq[1][0] + qq[3][2]);
    m[2][2] = qq[0][0] - qq[1][1] - qq[2][2] + qq[3][3];
  }
  calculateQuaternionDerivation(quaternion, omega, quaternionDerivation, auxQuaternion) {
    auxQuaternion[0] = 0;
    this.collectionProcessor.arrayCopy(omega, 0, auxQuaternion, 1, 3);
    this.quaternionMultiply(quaternion, auxQuaternion, quaternionDerivation);
    for (let i = 0; i < 4; i++) {
      quaternionDerivation[i] *= 0.5;
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/ReferenceFrame.ts
var ReferenceFrame = class {
  constructor() {
    this.nodes = [];
    this.performer = new Performer();
    this.realMatrix = new RealMatrix();
    this.vp = new Vector3DProcessor();
    this.positions = [];
    this.types = ["IObject", "IOrientation", "IPosition", "ReferenceFrame"];
    this.typeName = "ReferenceFrame";
    this.quaternion = [1, 0, 0, 0];
    /// <summary>
    /// Absolute position
    /// </summary>
    this.position = [0, 0, 0];
    /// <summary>
    /// Orientation matrix
    /// </summary>
    this.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    /// <summary>
    /// Auxiliary array
    /// </summary>
    this.qq = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    /// <summary>
    /// Auxiliary array
    /// </summary>
    this.p = [0, 0, 0];
    /// <summary>
    /// Auxliary position
    /// </summary>
    this.auxPos = [0, 0, 0];
  }
  setParameters(parameters) {
    this.parameters = parameters;
  }
  getParentT() {
    return this.parentNode;
  }
  setParentT(parent) {
    this.parentNode = parent;
  }
  getNodesT() {
    return this.nodes;
  }
  addNodeT(node) {
    this.nodes.push(node);
  }
  removeNodeT(node) {
    this.nodes = this.performer.remove(this.nodes, node);
  }
  getNodeValueT() {
    return this;
  }
  copyReferenceFrameFromArrays(q, p) {
    var mm = this.quaternion;
    for (var i = 0; i < mm.length; i++) {
      mm[i] = q[i];
    }
    var pp = this.position;
    for (var i = 0; i < p.length; i++) {
      pp[i] = p[i];
    }
    this.setMatrix();
  }
  copyReferenceFrameFromPositionQuatetnion(position, quaternion) {
    var p = this.position;
    for (var i = 0; i < p.length; i++) {
      p[i] = position[i];
    }
    var q = this.quaternion;
    for (var i = 0; i < q.length; i++) {
      q[i] = quaternion[i];
    }
    this.setMatrix();
  }
  copyReferenceFrameFrom(frame) {
    this.copyReferenceFrameFromArrays(frame.quaternion, frame.position);
  }
  setReferenceFrame(baseFrame, relative) {
    let m = baseFrame.getMatrix();
    var bp = baseFrame.getPosition();
    var rp = relative.getPosition();
    for (let i = 0; i < 3; i++) {
      this.position[i] = bp[i];
      for (let j = 0; j < 3; j++) {
        this.position[i] += m[i][j] * rp[j];
      }
    }
    this.vp.quaternionMultiply(baseFrame.quaternion, relative.quaternion, this.quaternion);
    this.setMatrix();
  }
  getQuaternion() {
    return this.quaternion;
  }
  getMatrix() {
    return this.matrix;
  }
  getPosition() {
    return this.position;
  }
  getParentFrame() {
    return this.parent;
  }
  setParentFrame(parent) {
    this.parent = parent;
  }
  getParameters() {
    return this.parameters;
  }
  updateReferenceFrame() {
    let p = this.getParentFrame();
    if (p === void 0) {
      return;
    }
    let r = p.getOwnFrame();
    if (r === void 0) {
      return;
    }
    this.position = r.getPosition();
    this.quaternion = r.getQuaternion();
    this.matrix = r.getMatrix();
  }
  getPositions() {
    return this.positions;
  }
  addPosition(position) {
    this.positions.push(position);
  }
  // new Error
  getClassName() {
    return this.typeName;
  }
  imlplementsType(type) {
    return this.types.indexOf(type) > 0;
  }
  getName() {
    return "";
  }
  getRelativePosition(inPosition, outPosition) {
    for (let i = 0; i < 3; i++) {
      this.auxPos[i] = inPosition[i] - this.position[i];
    }
    for (let i = 0; i < 3; i++) {
      outPosition[i] = 0;
      for (let j = 0; j < 3; j++) {
        outPosition[i] += this.matrix[j][i] * this.auxPos[j];
      }
    }
  }
  norm() {
    this.vp.quaternionNormalize(this.quaternion);
  }
  setMatrix() {
    this.norm();
    this.vp.quaternionToMatrix(this.quaternion, this.matrix, this.qq);
  }
  getPositionArray(position, coordinates) {
    let p1 = this.getPosition();
    let p2 = position.getPosition();
    for (let i = 0; i < 3; i++) {
      this.p[i] = p2[i] - p1[i];
    }
    for (let i = 0; i < 3; i++) {
      coordinates[i] = 0;
      for (let j = 0; j < 3; j++) {
        coordinates[i] += this.matrix[i][j] * this.p[j];
      }
    }
  }
  getRelative(baseFrame, relativeFrame, result, diff) {
    this.vp.quaternionInvertMultiply(relativeFrame.quaternion, baseFrame.quaternion, result.quaternion);
    result.setMatrix();
    for (let i = 0; i < 3; i++) {
      diff[i] = relativeFrame.position[i] - baseFrame.position[i];
    }
    let m = baseFrame.getMatrix();
    let p = result.getPosition();
    for (let i = 0; i < 3; i++) {
      p[i] = 0;
      for (let j = 0; j < 3; j++) {
        p[i] += m[j][i] * diff[j];
      }
    }
  }
  calculateRotatedPosition(abs, rot) {
    for (let i = 0; i < 3; i++) {
      rot[i] = 0;
      for (let j = 0; j < 3; j++) {
        rot[i] += this.matrix[j][i] * abs[j];
      }
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/RotatedFrame.ts
var RotatedFrame = class extends ReferenceFrame {
  constructor() {
    super();
    this.omega = [0, 0, 0];
    this.typeName = "RotatedFrame";
    this.types.push("IAngularVelocityMotion6D");
    this.types.push("RotatedFrame");
  }
  getOmega() {
    return this.omega;
  }
  setReferenceFrame(baseFrame, relative) {
    super.setReferenceFrame(baseFrame, relative);
    let ab = this.performer.convertObject(baseFrame, "IAngularVelocityMotion6D");
    let ar = this.performer.convertObject(relative, "IAngularVelocityMotion6D");
    let matrix = relative.getMatrix();
    let ob = ab[0].getOmega();
    let or = ar[0].getOmega();
    for (let i = 0; i < or.length; i++) {
      this.omega[i] = or[i];
      for (let j = 0; j < 3; j++) {
        this.omega[i] += matrix[i][j] * ob[j];
      }
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Motion6DFrame.ts
var Motion6DFrame = class extends RotatedFrame {
  constructor() {
    super();
    this.velocity = [0, 0, 0];
    this.hv = [0, 0, 0];
    //protected double[] relativeVelocity = new double[] { 0, 0, 0 };
    /// <summary>
    /// Derivation
    /// </summary>
    this.der = [0, 0, 0, 0];
    /// <summary>
    /// Quaternion derivation
    /// </summary>
    this.qd = [0, 0, 0, 0];
    this.typeName = "Motion6DFrame";
    this.types.push("IVelocity");
    this.types.push("Motion6DFrame");
  }
  getVelocity() {
    return this.velocity;
  }
  //         let ab = this.performer.convertObject<IAngularVelocityMotion6D, ReferenceFrame>(baseFrame, "IAngularVelocityMotion6D");
  setReferenceFrame(baseFrame, relative) {
    super.setReferenceFrame(baseFrame, relative);
    let baseOrientation = baseFrame;
    let baseVelocity = this.performer.convertObject(baseFrame, "IVelocity");
    let relativeVelocity = this.performer.convertObject(relative, "IVelocity");
    let baseAngular = this.performer.convertObject(baseFrame, "IAngularVelocityMotion6D");
    let velocityBase = baseVelocity[0].getVelocity();
    let velocityRelative = relativeVelocity[0].getVelocity();
    let mb = baseOrientation.getMatrix();
    let om = baseAngular[0].getOmega();
    let pos = relative.getPosition();
    this.vp.vectorProduct(om, pos, this.hv);
    for (let i = 0; i < 3; i++) {
      this.velocity[i] = velocityBase[i];
      for (let j = 0; j < 3; j++) {
        this.velocity[i] += mb[i][j] * (velocityRelative[j] + this.hv[j]);
      }
    }
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Motion6DAcceleratedFrame.ts
var Motion6DAcceleratedFrame = class extends Motion6DFrame {
  constructor() {
    super();
    this.relativeAcceleration = [0, 0, 0];
    this.acceleration = [0, 0, 0];
    this.angularAcceleration = [0, 0, 0];
    this.temp = [0, 0, 0];
    this.tempV = [0, 0, 0];
    this.typeName = "Motion6DAcceleratedFrame";
    this.types.push("IAcceleration");
    this.types.push("IAngularAcceleration");
    this.types.push("Motion6DAcceleratedFrame");
  }
  setReferenceFrame(baseFrame, relative) {
    super.setReferenceFrame(baseFrame, relative);
    let arn = this.performer.convertObject(relative, " IAngularAcceleration");
    let relativeVelocity = this.performer.convertObject(relative, "IVelocity");
    let baseAngulatVelocity = this.performer.convertObject(baseFrame, "IAngularVelocityMotion6D");
    let relativeAngularVelocity = this.performer.convertObject(relative, "IAngularVelocityMotion6D");
    var rp = this.getPosition();
    let m = this.getMatrix();
    let relativeOmega = relativeAngularVelocity[0].getOmega();
    let baseOmega = baseAngulatVelocity[0].getOmega();
    this.vp.vectorProduct(baseOmega, relativeVelocity[0].getVelocity(), this.tempV);
    let om2 = this.vp.square3d(baseOmega);
    let eps = arn[0].getAngularAcceleration();
    this.vp.vectorProduct(eps, rp, this.temp);
    for (let i = 0; i < 3; i++) {
      this.tempV[i] *= 2;
      this.tempV[i] += om2 * rp[i] + this.relativeAcceleration[i] + this.temp[i];
    }
    this.realMatrix.multiplyRight(m, this.tempV, this.acceleration);
    var relativeOrientation = relative;
    var relativeMatrix = relativeOrientation.getMatrix();
    this.realMatrix.multiplyLeft(baseOmega, relativeMatrix, this.temp);
    this.vp.vectorProduct(this.temp, relativeOmega, this.tempV);
    for (let i = 0; i < 3; i++) {
      this.temp[i] = eps[i] + this.tempV[i];
    }
    this.realMatrix.multiplyLeft(this.temp, m, this.angularAcceleration);
  }
  getAngularAcceleration() {
    return this.angularAcceleration;
  }
  getLineraAcceleration() {
    return this.acceleration;
    ;
  }
  getRelativeAcceleration() {
    return this.relativeAcceleration;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/UpdatePositionAction.ts
var UpdatePositionAction = class {
  constructor(position) {
    this.position = position;
  }
  action() {
    this.position.updateReferenceFrame();
  }
  isEmptyAction() {
    return false;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Motion6DPerformer.ts
var Motion6DPerformer = class _Motion6DPerformer {
  constructor() {
    this.performer = new Performer();
    this.comparer = new PositionComparer();
    this.sorting = new SortingAlgorithms();
  }
  static {
    this.baseFrame = new Motion6DFrame();
  }
  getBaseFrame() {
    return _Motion6DPerformer.baseFrame;
  }
  getOwnFrame(position) {
    var pp = this.performer.convertObject(position, "IReferenceFrame");
    if (pp.length > 0) return pp[0].getOwnFrame();
    return this.getParentFrame(position);
  }
  createUpdateFramesAction(collection) {
    let act = new ActionArray();
    let mea = this.performer.getAll(collection, "IPosition");
    let mm = this.sorting.mergesort(mea, this.comparer);
    for (let m of mm) {
      act.addAction(new UpdatePositionAction(m));
    }
    return act;
  }
  getFrame(position) {
    var f = this.performer.convertObject(position, "IReferenceFrame");
    if (f.length == 1) {
      return f[0].getOwnFrame();
    }
    return this.getParentFrame(position);
  }
  getParentOwn(position) {
    var p = position.getParentFrame();
    if (p === void 0) {
      return void 0;
    }
    var f = this.performer.convertObject(p, "IReferenceFrame");
    if (f.length > 0) {
      return this.getParentFrame(f[0]);
    }
    return void 0;
  }
  getParentFrame(position) {
    let p = position.getParentFrame();
    if (p === void 0) {
      return this.getBaseFrame();
    }
    return p.getOwnFrame();
  }
  getRelative(baseFrame, relative) {
    let frame;
    let bf = this.performer.convertObject(baseFrame, "Motion6DAcceleratedFrame");
    let rf = this.performer.convertObject(relative, "Motion6DAcceleratedFrame");
    if (bf.length > 0 && rf.length > 0) {
      frame = new Motion6DAcceleratedFrame();
    } else {
      frame = new ReferenceFrame();
    }
    frame.setReferenceFrame(baseFrame, relative);
    return frame;
  }
  getRelativeFrame(baseFrame, targetFrame, relative) {
    let bp = baseFrame.getPosition();
    let tp = targetFrame.getPosition();
    let bm = baseFrame.getMatrix();
    let rp = relative.getPosition();
    for (let i = 0; i < 3; i++) {
      rp[i] = 0;
      for (let j = 0; j < 3; j++) {
        rp[i] += bm[j][i] * (tp[i] - bp[i]);
      }
    }
    let tm = targetFrame.getMatrix();
    let rm = relative.getMatrix();
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        rm[i][j] = 0;
        for (let k = 0; k < 3; k++) {
          rm[i][j] += bm[k][i] * tm[k][j];
        }
      }
    }
  }
  addRecursive(frame, objects) {
    let co = frame;
    if (co != void 0) {
      if (!objects.includes(co)) objects.push(co);
    }
    let p = frame.getParentFrame();
    if (p != void 0)
      this.addRecursive(p, objects);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Runtime/Event/DataRuntimeConsumerMotion6DEvent.ts
var DataRuntimeConsumerMotion6DEvent = class extends DataRuntimeConsumerEvent {
  constructor(dataConsumer, factory2) {
    super(dataConsumer, factory2);
    this.motionPeformer = new Motion6DPerformer();
    if (this.motionPeformer === void 0) {
      this.motionPeformer = new Motion6DPerformer();
    }
  }
  prepare(dataConsumer) {
    super.prepare(dataConsumer);
    if (this.motionPeformer === void 0) {
      this.motionPeformer = new Motion6DPerformer();
    }
    var a = dataConsumer;
    if (a != void 0) {
      let ar = a.getAddRemoveObjects();
      for (var co of ar) {
        var fr = this.performer.convertObject(co, "IReferenceFrame");
        if (fr.length > 0) {
          this.motionPeformer.addRecursive(fr[0], this.categoryObjects);
        }
      }
    }
  }
  getExternalUpdate(obj, realime, act) {
    super.getExternalUpdate(obj, realime, act);
    if (this.motionPeformer === void 0) {
      this.motionPeformer = new Motion6DPerformer();
    }
    var a = this.motionPeformer.createUpdateFramesAction(this);
    act.addAction(a);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Runtime/EmptyRealtimeCollection.ts
var EmptyRealtimeCollection = class {
  constructor() {
    this.running = false;
  }
  setComponentCollection(collection) {
    this.collection = collection;
  }
  getComponentCollection() {
    throw new Error("Method not implemented.");
  }
  isComponentCollectionRunning() {
    throw new Error("Method not implemented.");
  }
  setComponentCollectionRunning(running) {
    this.running = running;
  }
  setTimerFactory(timerFactory) {
    this.timerFactory = timerFactory;
  }
  setTimeProvider(timeProvider) {
    this.timeProvider = timeProvider;
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory.ts
var Motion6DRealtimeFactory = class extends FactoryObject {
  constructor(mF) {
    super("", mF);
    this.mF = mF;
    this.types.push("IRealtimeCollectionFactory");
    this.types.push("Motion6DRealtimeFactory");
    this.typeName = "Motion6DRealtimeFactory";
  }
  createRealtimeFromCollection(collection) {
    this.collection = collection;
    return new EmptyRealtimeCollection();
  }
  createRealtimeFromDataConsumer(consumer2) {
    return new DataRuntimeConsumerMotion6DEvent(consumer2, this.mF);
  }
};

// src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Motion6DFactory.ts
var Motion6DFactory = class extends UniversalFactory {
  constructor() {
    super();
    this.types.push("Motion6DFactory");
    this.typeName = "Motion6DFactory";
    let processor = new RungeProcessor();
    this.addFactory(processor, "IDifferentialEquationProcessor");
    let f = new Motion6DRealtimeFactory(this);
    this.addFactory(f, "IRealtimeCollectionFactory");
  }
};

// experiments/trading/typescript.ts
var root = path.resolve(process.argv[2]);
var read = (f) => JSON.parse(readFileSync(path.join(root, f), "utf8"));
var config = read("config.json");
var bars = read("data/AAPL_1d.json");
var oaDate = (date) => Date.parse(date + "T00:00:00Z") / 864e5 + 25569;
var isoDate = (date) => new Date(Math.round((date - 25569) * 864e5)).toISOString().slice(0, 10);
var FileHistory = class extends EmptyObject {
  constructor() {
    super("AAPL fixture");
    this.types.push("ITradingDatabaseHistoryInterface");
  }
  async getSymbolsAsync() {
    return [["AAPL", "AAPL"]];
  }
  async getHistoricalDataMessageDateTimesAsync(_id, period, symbol, begin, end) {
    if (period !== config.interval || symbol !== config.symbol) throw Error("Wrong fixture query");
    return bars.filter((b) => oaDate(b.date) >= begin && oaDate(b.date) < end).map((b) => ({ ...b, date: oaDate(b.date), requestId: 0, count: 0, wap: 0, hasGaps: false }));
  }
};
var factory = new Motion6DFactory();
factory.addFactory(new EmptyChecker(), "ICheck");
factory.addFactory(new FileHistory(), "ITradingDatabaseHistoryInterface");
var abort = new AbortController();
var desktop = await DonchianDesktop.getDesktopAsync(abort, factory);
var query = desktop.getCategoryObject("Trading");
query.setQueryParameters(config.symbol, config.interval, oaDate(config.startInclusive), oaDate(config.endExclusive));
for (const size of [0, 1, 3]) {
  query.data = bars.slice(0, size).map((b) => ({ ...b, date: oaDate(b.date) }));
  for (let replay = 0; replay < 2; replay++) {
    query.resetIterator();
    let i = 0;
    while (query.nextIterator()) {
      if (i >= size || query.current.close !== bars[i].close || isoDate(query.current.date) !== bars[i].date)
        throw Error("TypeScript iterator alignment regression");
      i++;
    }
    if (i !== size) throw Error("TypeScript iterator count regression");
  }
}
console.log("TypeScript iterator checks: empty, singleton, multiple bars and reset passed");
for (const [name, setting] of [
  ["Average Short", "averageShort"],
  ["Average Long", "averageLong"],
  ["Donchian maximum", "donchianHigh"],
  ["Donchian minimum", "donchianLow"]
]) {
  desktop.getCategoryObject(name).getFilter().setFilterCount(config[setting]);
}
var consumer = desktop.getCategoryObject("Chart");
var map = /* @__PURE__ */ new Map([
  ["date", "Trading.DateTime"],
  ["close", "Trading.Close"],
  ["position", "Order.Position"],
  ["buyPrice", "Order.Buy Price"],
  ["sellPrice", "Order.Sell Price"],
  ["income", "Order.Income"],
  ["averageShort", "Average Short.Output"],
  ["averageLong", "Average Long.Output"],
  ["donchianHigh", "Donchian maximum.Output"],
  ["donchianLow", "Donchian minimum.Output"]
]);
var performer = new PerformerMeasuremets(factory);
performer.errorHandler = { handleException(error) {
  throw error;
}, log(message) {
  throw Error(message);
} };
var runtime = new DataRuntimeConsumer(consumer, factory);
var raw = await performer.performIteratorDataConsumerMapAsync(consumer, query, runtime, abort, map);
if (raw.length !== bars.length) throw Error(`Expected ${bars.length} rows, got ${raw.length}`);
var records = raw.map((item, i) => {
  const row = Object.fromEntries([...item].map(([k, v]) => [k, v === void 0 ? null : v]));
  row.date = isoDate(row.date);
  if (row.date !== bars[i].date || row.close !== bars[i].close) throw Error("Date/price alignment error");
  row.events = [];
  if (row.buyPrice !== null) row.events.push("buy");
  if (row.sellPrice !== null) row.events.push("sell");
  return row;
});
var metadata = { ...read(".build/metadata.json"), implementation: "TypeScript", runtime: process.version };
writeFileSync(path.join(root, "Trading_TypeScript.json"), '{\n"metadata":' + JSON.stringify(metadata) + ',\n"records":[\n' + records.map((r) => JSON.stringify(r)).join(",\n") + "\n]}\n");
console.log(`TypeScript: ${records.length} rows`);
