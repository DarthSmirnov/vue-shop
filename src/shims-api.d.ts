import Vue from 'vue';

import { AxiosStatic } from 'axios';

declare module 'vue/types/vue' {
  export interface Vue {
    $api: AxiosStatic;
  }
}
