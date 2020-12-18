export const getQueryStringParams = (params: { [x: string]: any }) =>
  Object.keys(params).length
    ? `?${Object.keys(params)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join('&')}`
    : '';
