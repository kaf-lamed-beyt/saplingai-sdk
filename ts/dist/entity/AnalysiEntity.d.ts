import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { Analysi, AnalysiListMatch, AnalysiCreateData, AnalysiRemoveMatch } from '../SaplingSdkTypes';
declare class AnalysiEntity extends SaplingSdkEntityBase<Analysi> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: AnalysiEntity): AnalysiEntity;
    list(this: any, reqmatch?: AnalysiListMatch, ctrl?: Control): Promise<AnalysiEntity[]>;
    create(this: any, reqdata?: AnalysiCreateData, ctrl?: Control): Promise<AnalysiEntity>;
    remove(this: any, reqmatch?: AnalysiRemoveMatch, ctrl?: Control): Promise<AnalysiEntity>;
}
export { AnalysiEntity };
