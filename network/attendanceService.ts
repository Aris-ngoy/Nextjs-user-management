
export const onClockingOut = async <T>(id : string, attendance: any): Promise<T> => {
    const result = await fetch(`/api/attendance/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendance),
    })
    return result.json(); 
}

export const onExportingData = async <T>(data :any): Promise<T> => {
    const result = await fetch(`/api/attendance/export`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return result.json(); 
}