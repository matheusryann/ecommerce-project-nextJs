const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
};

export const escapeHtml = (html: string) => {
    return html.replace(/[&<>"'\/`=]/g, (match) => htmlEscapes[match]);
};