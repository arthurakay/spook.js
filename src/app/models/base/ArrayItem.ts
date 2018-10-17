import {BaseModel} from './BaseModel';
import ValueItem from './ValueItem';

interface ArrayItemConfig {
    name: string;
    values: Array<any>;
}

export default class ArrayItem extends BaseModel {
    public name: string;
    public values: Array<ValueItem>;

    constructor(config: ArrayItemConfig) {
        super({name: config.name});

        this.values = [];

        for (let prop in config.values) {
            this.values.push(
                new ValueItem({
                    name: prop,
                    pages: config.values[prop]
                })
            );
        }
    }
}