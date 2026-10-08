import { SaplingSdkEntityBase } from '../SaplingSdkEntityBase';
import type { SaplingSdkSDK } from '../SaplingSdkSDK';
import type { Control } from '../types';
import type { Detection, DetectionCreateData } from '../SaplingSdkTypes';
declare class DetectionEntity extends SaplingSdkEntityBase<Detection> {
    constructor(client: SaplingSdkSDK, entopts: any);
    make(this: DetectionEntity): DetectionEntity;
    create(this: any, reqdata?: DetectionCreateData, ctrl?: Control): Promise<DetectionEntity>;
}
export { DetectionEntity };
