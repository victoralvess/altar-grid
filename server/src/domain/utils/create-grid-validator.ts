export type CreateGridParams = {
    size: number;
    bias: string | null;
};

export interface CreateGridValidator {
    validateParams(params: CreateGridParams): CreateGridParams | never;
}