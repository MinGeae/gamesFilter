import { AuthService } from '../auth/auth.service';
import { AppService } from './app.service';
export declare class AppController {
    private readonly authService;
    private readonly appService;
    constructor(authService: AuthService, appService: AppService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    getList(): Record<string, any>;
}
