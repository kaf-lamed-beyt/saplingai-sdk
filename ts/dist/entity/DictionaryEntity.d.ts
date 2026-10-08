import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { Dictionary, DictionaryListMatch, DictionaryCreateData, DictionaryRemoveMatch } from '../SaplingSdkTypes';
declare class DictionaryEntity extends SaplingSdkEntityBase<Dictionary> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: DictionaryEntity): DictionaryEntity;
    list(this: any, reqmatch?: DictionaryListMatch, ctrl?: Control): Promise<DictionaryEntity[]>;
    create(this: any, reqdata?: DictionaryCreateData, ctrl?: Control): Promise<DictionaryEntity>;
    remove(this: any, reqmatch?: DictionaryRemoveMatch, ctrl?: Control): Promise<DictionaryEntity>;
}
export { DictionaryEntity };
