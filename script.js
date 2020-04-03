var App = new Vue({
    el: '#AppVue',
    data: {
        json: {
            value: `[
  { "a": "A 1", "b": true, "c": "C 1", "f": "F 1" },
  { "a": "A 2", "b": "B 2", "d": "D 2", "g": "G 2", "h": "H 2" },
  { "a": "A 3", "b": 4, "e": "E 2", "f": "F 3", "h": "H 3", "i": "I 3" }
]`,
            error: '',
        },
        csv: {
            value: '',
            error: '',
        },
        table: {
            header: [],
            body: [],
        },
        hasHeader: true,
    },
    methods: {
        convertToCsv: function () {
            App.json.error = '';
            App.csv.value = '';
            App.table.header = [];
            App.table.body = [];

            try {
                const json = JSON.parse(App.json.value.trim());

                const isArray = Array.isArray(json);

                if (!isArray) throw 1;

                const csv = [];

                const allKeys = [];
                for (let i in json) {
                    for (let key in json[i]) {
                        if (allKeys.indexOf(key) < 0) allKeys.push(key);
                    }
                }
                allKeys.sort();

                const keysStr = JSON.stringify(allKeys);

                if (App.hasHeader) csv.push(keysStr.substr(1, keysStr.length - 2));
                App.table.header = allKeys;

                for (let i in json) {
                    let row = json[i];

                    let csvRow = [];

                    for (let j in allKeys) {
                        let key = allKeys[j];

                        if (typeof row[key] === 'undefined') {
                            csvRow.push('');
                        } else {
                            if (typeof row[key] !== 'object') {
                                if (typeof row[key] !== 'string') row[key] = row[key] + '';
                                csvRow.push(row[key]);
                            } else {
                                csvRow.push('');
                            }
                        }
                    }

                    let rowStr = JSON.stringify(csvRow);
                    csv.push(rowStr.substr(1, rowStr.length - 2));
                    App.table.body.push(csvRow);
                }

                App.csv.value = csv.join("\n");
            } catch (e) {
                if (e === 1) App.json.error = 'O JSON precisa ser uma lista.';
                else App.json.error = 'JSON inválido.';
            }
        },
        convertToJson: function () {
            /**/console.log('convertToJson()');
        },
    },
});

App.convertToCsv();