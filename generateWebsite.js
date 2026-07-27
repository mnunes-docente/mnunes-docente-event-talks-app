const fs = require('fs');
const path = require('path');
const { eventSchedule } = require('./eventData');

const templatePath = path.join(__dirname, 'template.html');
const outputPath = path.join(__dirname, 'index.html');

fs.readFile(templatePath, 'utf8', (err, templateHtml) => {
    if (err) {
        console.error('Error reading template.html:', err);
        return;
    }

    // Convert eventSchedule to a JSON string
    const scheduleJson = JSON.stringify(eventSchedule, (key, value) => {
        // Custom replacer for Date objects
        if (this[key] instanceof Date) {
            return this[key].toISOString();
        }
        return value;
    });

    // Inject the schedule data into the script tag
    const scriptToInject = `const fullSchedule = ${scheduleJson}.map(item => {
        if (item.startTime && item.endTime) {
            item.startTime = new Date(item.startTime);
            item.endTime = new Date(item.endTime);
        }
        return item;
    });`;

    const finalHtml = templateHtml.replace(
        '<script id="event-data-script">\n        // Event data and schedule will be injected here\n        const fullSchedule = []; // This will be replaced by actual data\n    </script>',
        `<script id="event-data-script">\n        ${scriptToInject}\n    </script>`
    );

    fs.writeFile(outputPath, finalHtml, 'utf8', (err) => {
        if (err) {
            console.error('Error writing index.html:', err);
            return;
        }
        console.log('Successfully generated index.html');
    });
});
