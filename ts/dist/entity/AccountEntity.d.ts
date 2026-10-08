import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { Account, AccountLoadMatch, AccountCreateData } from '../SaplingSdkTypes';
declare class AccountEntity extends SaplingSdkEntityBase<Account> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: AccountEntity): AccountEntity;
    load(this: any, reqmatch?: AccountLoadMatch, ctrl?: Control): Promise<AccountEntity>;
    create(this: any, reqdata?: AccountCreateData, ctrl?: Control): Promise<AccountEntity>;
}
export { AccountEntity };
