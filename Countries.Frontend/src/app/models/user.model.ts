import { Guid } from "guid-typescript";

export interface User {
    id: Guid;
    username: string;
    hashedPassword: string;
}
