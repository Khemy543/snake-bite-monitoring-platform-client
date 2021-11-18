import Vue from 'vue'
import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import Card from '@/components/Cards/Card.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';
import BasePagination from '@/components/BasePagination.vue';
import { Input, InputNumber, Tooltip, Popover, Select, Option, DatePicker } from 'element-ui';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(BaseInput.name, BaseInput);
Vue.component(BasePagination.name, BasePagination);
Vue.component(BaseDropdown.name, BaseDropdown);
Vue.component(Card.name, Card);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BaseButton.name, BaseButton);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
