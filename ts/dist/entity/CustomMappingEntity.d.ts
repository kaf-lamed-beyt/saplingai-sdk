import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { CustomMapping, CustomMappingListMatch, CustomMappingCreateData, CustomMappingRemoveMatch } from '../SaplingSdkTypes';
declare class CustomMappingEntity extends SaplingSdkEntityBase<CustomMapping> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: CustomMappingEntity): CustomMappingEntity;
    list(this: any, reqmatch?: CustomMappingListMatch, ctrl?: Control): Promise<CustomMappingEntity[]>;
    create(this: any, reqdata?: CustomMappingCreateData, ctrl?: Control): Promise<CustomMappingEntity>;
    remove(this: any, reqmatch?: CustomMappingRemoveMatch, ctrl?: Control): Promise<CustomMappingEntity>;
}
export { CustomMappingEntity };
