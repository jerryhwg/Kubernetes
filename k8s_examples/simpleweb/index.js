// Automatic injection
//This line must come before importing any instrumented module.
// const tracer = require('dd-trace').init({
//   logInjection: true
// });

// Manual injection
//This line must come before importing any instrumented module.
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

class Logger {
    log(level, message) {
        const span = tracer.scope().active();
        const time = new Date().toISOString();
        const record = { time, level, message };

        if (span) {
            tracer.inject(span.context(), formats.LOG, record);
        }

        console.log(JSON.stringify(record));
    }
}

module.exports = Logger;

// App
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('How are you doing');
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});

// Garbage below
// const formats = require('dd-trace/ext/formats');

// class Logger {
//     log(level, message) {
//         const span = tracer.scope().active();
//         const time = new Date().toISOString();
//         const record = { time, level, message };

//         if (span) {
//             tracer.inject(span.context(), formats.LOG, record);
//         }

//         console.log(JSON.stringify(record));
//     }
// }

// module.exports = Logger;

// const span = tracer.scope().active()

// // add a foo:bar tag
// span.setTag('foo', 'bar')

// // add a user_id:5 tag
// span.setTag('user_id', 5)

// // add a obj.first:foo and obj.second:bar tags
// span.setTag('obj', { first: 'foo', second: 'bar' })

// // add a foo:bar and baz:qux tags
// span.addTags({
//   foo: 'bar',
//   baz: 'qux'
// })

// app.get('/make-sandwich', (req, res) => {
//   const sandwich = tracer.trace('sandwich.make', () => {
//     const ingredients = tracer.trace('get_ingredients', () => {
//       return getIngredients()
//     })

//     return tracer.trace('assemble_sandwich', () => {
//       assembleSandwich(ingredients)
//     })
//   })

//   res.end(sandwich)
// })