require("dotenv/config");

/**
 * env file value fetcher
 * @param key string
 * @param default_value any
 * @returns 
 */
export const env = (key: string, default_value: any) => {
  const value = process.env[key];
  return value === undefined ? default_value : value;
}

/**
 * final response formatter 
 * @param data any
 * @param message string or error
 * @param success boolean
 * @returns 
 */
export const responseBuilder = (data: any, message: any, success: boolean) => {
  return {
    data: data,
    message: message,
    success: success,
  };
}

/**
 * converts wei value to ether value
 * @param weiValue number
 * @returns string
 */
export const weiConverterToEther = (weiValue) => {
    return (weiValue/Math.pow(10, 18)).toFixed(8)
}

/**
 * default addresses if a address is not passed in request
 */
export const defaultAddressArray = [
  "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  "0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b",
  "0x902c38F2bcddF95E7BCE50A14515B4B62F502Bf2",
  "0xBcFE52fEF72A70AD09245e40AEAcCE4B1e851320",
  "0x0560de6E5a452a00F58a90cb5501C18e77EB91B4",
];
