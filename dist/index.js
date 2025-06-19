"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const express_handlebars_1 = require("express-handlebars");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.engine('hbs', (0, express_handlebars_1.engine)({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, {
    customSiteTitle: 'FastCart Admin API Docs',
    swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        defaultModelsExpandDepth: -1
    }
}));
app.use('/api/admin', auth_routes_1.default);
app.get('/', (_req, res) => {
    res.render('home');
});
app.get('/api/time', (req, res) => {
    const now = new Date();
    const serverTime = now.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    res.render('time', {
        serverTime,
        timezone,
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
