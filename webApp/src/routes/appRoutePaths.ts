export const appRoutePaths = {
    home: "/",
    employee:{
        list: "/employees",
        create: "/employee/create",
        detail: (employeeId: string) => `/employee/${employeeId}`,
        edit: (employeeId: string) => `/employee/${employeeId}/edit`,
    },
    employeeHistory: {
        list: (employeeId: string) => `/employee/${employeeId}/history`,
        detail: (employeeId: string, versionId: string) => `/employee/${employeeId}/history/${versionId}`,
    }
}