export interface ConfigMap {
    [key: string]: string; // Key is string, value is string
}

// Or for numbers:
export interface NumericMap {
    [key: string]: number;
}

// Or for booleans:
export interface BooleanMap {
    [key: string]: boolean;
}

export interface MixedMap {
    [key: string]: string | number | boolean | object | Array<any>;
}
