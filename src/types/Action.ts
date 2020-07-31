type Action<T extends string, A> = {
    type: T
    data: A
}

type CreateConnection = Action<"createConnection", string>

export type WSActions = CreateConnection
