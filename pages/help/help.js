import initCalendar from '../../resource/component/calendar/main.js';
import {
    switchView
} from '../../resource/component/calendar/main.js';

const conf = {
    onShow: function() {
        initCalendar();
        switchView('week');
    }
};

Page(conf);