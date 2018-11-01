const app = require('./app');

const port = Number(app.get('port'));

app.listen(port, () => console.log(`Server is ready on port ${port}`));
