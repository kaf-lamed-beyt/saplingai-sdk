import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { Generation, GenerationCreateData } from '../SaplingSdkTypes';
declare class GenerationEntity extends SaplingSdkEntityBase<Generation> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: GenerationEntity): GenerationEntity;
    create(this: any, reqdata?: GenerationCreateData, ctrl?: Control): Promise<GenerationEntity>;
}
export { GenerationEntity };
