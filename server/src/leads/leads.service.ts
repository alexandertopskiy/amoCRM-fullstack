import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadsService {
    async getLeads(query: string) {
        try {
            const res = 'get all leads with query: ' + query;
            console.log(res);

            const url = `https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/leads`;
            const response = await axios.get(url);
            console.log('\nSUCCESS: ' + response + '\n\n\n');

            return res;
        } catch (error) {
            const code = error.response.status;
            // 401 - Unauthorized
            if (code === 401) {
                console.log('Unauthorized. Try to Auth');
            }
        }
    }
}
