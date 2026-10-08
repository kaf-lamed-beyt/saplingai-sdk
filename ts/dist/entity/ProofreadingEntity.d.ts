import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { Proofreading, ProofreadingCreateData } from '../SaplingSdkTypes';
declare class ProofreadingEntity extends SaplingSdkEntityBase<Proofreading> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: ProofreadingEntity): ProofreadingEntity;
    create(this: any, reqdata?: ProofreadingCreateData, ctrl?: Control): Promise<ProofreadingEntity>;
}
export { ProofreadingEntity };
