const devBaseURL = "http://localhost:4000";
const proBaseURL = "https://production.org";

//判断是开发环境还是生产环境
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;
export const TIMEOUT = 5000;