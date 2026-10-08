import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { Service, ServiceLoadMatch } from '../SaplingSdkTypes';
declare class ServiceEntity extends SaplingSdkEntityBase<Service> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: ServiceEntity): ServiceEntity;
    load(this: any, reqmatch?: ServiceLoadMatch, ctrl?: Control): Promise<ServiceEntity>;
}
export { ServiceEntity };
