export function toCamelCase(text: string): string {

    return text.replace(/([\-|\_|\s]\w)/g, (matches) => {
        return matches[1].toUpperCase();
    });
}
