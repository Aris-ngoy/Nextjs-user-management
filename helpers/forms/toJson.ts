export const toJson = <T>(data: T) => {
    const jsonString = JSON.stringify(data);
    return JSON.parse(jsonString);
}