import {
    CompositionRepository
} from "./contracts";

export abstract class BaseCompositionRepository
implements CompositionRepository {

    abstract save(...args: any[]): Promise<void>;

    abstract update(...args: any[]): Promise<void>;

    abstract delete(...args: any[]): Promise<void>;

    abstract findById(...args: any[]): Promise<any>;

    abstract list(): Promise<any[]>;
}