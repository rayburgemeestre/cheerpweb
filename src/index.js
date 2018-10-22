import Vue from 'vue'
import App from './App.vue'


if (!window.included) {
    window.included = true;
    new Vue({
        el: '#app',
        render: h => h(App)
    })

    require('./mystyles.scss');
}
