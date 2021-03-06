import {observable, action, computed} from 'mobx';
import {BaseModel} from '../../models/base/BaseModel';
import {assign} from 'lodash';

interface BaseStoreOptions {
    model: BaseModel,
    [id: string]: any,
    socketKey?: string,
    single?: boolean
}

class BaseStore<T extends BaseModel> {
    private socketKey: string = '';

    public single: boolean = false;
    public model:BaseModel = null;

    @observable
    public _data: any = null;

    @observable
    public loading: boolean = false;

    /**
     * @param additionalObservables
     * @param additionalObservables.model {Object}
     * @param additionalObservables.endpoints {Object}
     */
    constructor(options: BaseStoreOptions) {
        assign(this, options);

        if (options.socketKey) {
            const global = (<any>window);

            global.SOCKET.on(this.socketKey, (jsonMsg: string) => {
                // if there will only ever be a single request, update the loading state
                // otherwise, responses should conditionally set their loading state in setData()
                if (this.single) {
                    this.loading = false;
                }

                this.setData(JSON.parse(jsonMsg));
            });

            global.SOCKET.on('error', (jsonMsg: string) => {
                this.loading = false;

                // TODO: something...
                console.error('An error was reported by the socket response.')
            });
        }
    }

    /**
     * Abstract method
     */
    initialize(): void {}

    @action
    setData(data: any): void {}

    @computed
    get data(): any {
        return true;
    }
}

export default BaseStore;