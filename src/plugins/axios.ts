import _Vue from 'vue';
import Axios from 'axios';

export function AxiosPlugin<AxiosPlugOptions>(
  Vue: typeof _Vue,
  options?: AxiosPluginOptions
): void {
  Vue.prototype.$api = Axios.create({
    baseURL: options?.baseUrl
  });
}

export class AxiosPluginOptions {
  baseUrl = '';
}
