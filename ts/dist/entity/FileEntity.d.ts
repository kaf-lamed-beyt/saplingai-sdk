import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { File, FileCreateData } from '../SaplingSdkTypes';
declare class FileEntity extends SaplingSdkEntityBase<File> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: FileEntity): FileEntity;
    create(this: any, reqdata?: FileCreateData, ctrl?: Control): Promise<FileEntity>;
}
export { FileEntity };
