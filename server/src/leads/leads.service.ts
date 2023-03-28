import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadsService {
    getLeads(query: string): string {
        const res = 'get all leads with query: ' + query;
        console.log(res);
        return res;
    }
}
