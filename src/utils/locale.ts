export const locale = {
    name: 'ru',
    config: {
        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
            '_'
        ),
        monthsShort: 'Янв__Февр_Март_Апр_Май_Июль_Июнь_Авг_Сент_Окт_Нояб_Дек'.split(
            '_'
        ),
        weekdays: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
        weekdaysShort: 'Воскр_Пон_Втор_Сред_Четв_Пят_Суб'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY LT',
            LLLL: 'dddd D MMMM YYYY LT'
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'une année',
            yy: '%d années'
        },
        ordinalParse: /\d{1,2}(er|ème)/,
        ordinal: function(number: number) {
            return number + (number === 1 ? 'er' : 'ème');
        },
        meridiemParse: /PD|MD/,
        isPM: function(input: any) {
            return input.charAt(0) === 'M';
        },
        // in case the meridiem units are not separated around 12, then implement
        // this function (look at locale/id.js for an example)
        // meridiemHour : function (hour, meridiem) {
        //     return /* 0-23 hour, given meridiem token and hour 1-12 */
        // },
        meridiem: function(hours: number, minutes: number, isLower: number) {
            return hours < 12 ? 'PD' : 'MD';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    }
};
