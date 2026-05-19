import type { Performer } from '../../Performer';
export interface HttpRequest<REQB> {
    path: string;
    method?: string;
    body?: REQB;
    accessToken?: string;
}
export interface HttpResponse<RESB> {
    ok: boolean;
    body?: RESB;
}
export declare class HttpCommunication {
    http_cancel<RESB, REQB = undefined>(config: HttpRequest<REQB>, controller: AbortController): Promise<HttpResponse<RESB>>;
    http<RESB, REQB = undefined>(config: HttpRequest<REQB>): Promise<HttpResponse<RESB>>;
    logError(request: Request, response: Response): Promise<void>;
    setPerformer(performer: Performer): void;
    getPerformer(): Performer;
    protected performer: Performer;
}
//# sourceMappingURL=http_interface.d.ts.map