"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs = require("fs");
const path = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function listFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            fileList = listFiles(filePath, fileList);
        }
        else {
            fileList.push(filePath);
        }
    });
    return fileList;
}
let app;
async function bootstrap() {
    if (!app) {
        try {
            common_1.Logger.log('Starting application...');
            common_1.Logger.log(`Files in current directory:\n${listFiles(process.cwd()).join('\n')}`);
            common_1.Logger.log(`STRIPE_SECRET_KEY: ${process.env.STRIPE_SECRET_KEY ? `${process.env.STRIPE_SECRET_KEY}` : 'Not set'}`);
            app = await core_1.NestFactory.create(app_module_1.AppModule);
            common_1.Logger.log('Application created successfully');
            app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
            app.enableCors({
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            });
            await app.init();
            common_1.Logger.log('Application initialized');
        }
        catch (error) {
            if (error instanceof Error) {
                common_1.Logger.error('Error starting the application', error.stack);
            }
            else {
                common_1.Logger.error('An unknown error occurred while starting the application');
            }
            throw error;
        }
    }
    return app;
}
if (process.env.NODE_ENV !== 'production') {
    bootstrap().then(async (app) => {
        await app.listen(process.env.PORT || 3000);
        common_1.Logger.log(`Application is running on: ${await app.getUrl()}`);
    });
}
else {
    module.exports = async (req, res) => {
        if (!app) {
            app = await bootstrap();
        }
        app.getHttpAdapter().getInstance()(req, res);
    };
}
