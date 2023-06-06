export enum Env {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Staging = 'staging'
}

export enum Status {
    Idle,
    Loading,
    Succeeded,
    Failed
}

export enum UserStatus {
    Blocked = 'Blocked',
    Unblocked = 'Unblocked'
}

export const {
    NODE_ENV = Env.Development,
    REACT_APP_MANAGEMENT_URI
} = process.env;
