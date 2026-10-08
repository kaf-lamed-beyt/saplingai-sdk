import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { CustomFilter, CustomFilterListMatch, CustomFilterCreateData, CustomFilterRemoveMatch } from '../SaplingSdkTypes';
declare class CustomFilterEntity extends SaplingSdkEntityBase<CustomFilter> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: CustomFilterEntity): CustomFilterEntity;
    list(this: any, reqmatch?: CustomFilterListMatch, ctrl?: Control): Promise<CustomFilterEntity[]>;
    create(this: any, reqdata?: CustomFilterCreateData, ctrl?: Control): Promise<CustomFilterEntity>;
    remove(this: any, reqmatch?: CustomFilterRemoveMatch, ctrl?: Control): Promise<CustomFilterEntity>;
}
export { CustomFilterEntity };
