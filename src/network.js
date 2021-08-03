export const tencentApplicationFetch = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: options.body,
            method: options.method || 'get',
            header: options.headers || {},
            success: (response) => {
                resolve(response)
            },
            fail: (error) => {
                reject(error)
            }
        })
    });
}

function createRequest() {
    let request = null
    if (wx && typeof wx.request === 'function') {
        request = tencentApplicationFetch
    }
    
    if (fetch) {
        request = fetch
    }
    return request;
}

export const request = createRequest();