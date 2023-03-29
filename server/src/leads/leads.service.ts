import * as fs from 'fs';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import ICredentialsData from '../types/ICredentialsData';

@Injectable()
export class LeadsService {
    async authenticate(): Promise<boolean> {
        try {
            const url = `https://${process.env.SUBDOMAIN}.amocrm.ru/oauth2/access_token`;
            const integrationData = {
                'client_id': process.env.CLIENT_ID,
                'client_secret': process.env.CLIENT_SECRET,
                'redirect_uri': process.env.REDIRECT_URI
            };

            // чтение данных из локального json-файла
            const credsData = this.getCredentialsData();

            // При наличии данных в credsData "refresh_token" используется для обновления "accessToken"
            // При отсутствии данных используется "код авторизации" для получения токенов
            if (credsData) {
                integrationData['grant_type'] = 'refresh_token';
                integrationData['refresh_token'] = credsData.refresh_token;
            } else {
                integrationData['grant_type'] = 'authorization_code';
                integrationData['code'] = process.env.AUTH_CODE;
            }

            const response = await axios.post(url, integrationData);

            // запись ответа (токенов) в json-файл
            fs.writeFileSync('.credentials.json', JSON.stringify(response.data));

            return true;
        } catch (error) {
            const code = error.response?.status;
            const message = error.response?.data?.hint;
            console.log('error #' + code + ': ' + message);

            return false;
        }
    }

    // чтение данных (токенов) из локального json
    private getCredentialsData(): ICredentialsData {
        const filePath = '.credentials.json';
        // существует ли json-файл с данными (при первом запуске его нет)
        // если файл есть, то данные из него считываются для получения токенов
        // иначе будет сделан запрос авторизации с сохранением данный в файл
        if (!fs.existsSync(filePath)) return null;

        const stringData = fs.readFileSync(filePath, 'utf-8');
        if (stringData.length === 0) return null;

        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    async getLeads(query: string) {
        try {
            const res = 'get all leads with query: ' + query;
            console.log(res);

            const url = `https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/leads`;
            const response = await axios.get(url);
            console.log('\nSUCCESS: ' + response + '\n\n\n');

            return res;
        } catch (error) {
            const code = error.response?.status;
            // 401 - Unauthorized
            if (code === 401) {
                console.log('Unauthorized. Try to Auth');
                const result = await this.authenticate();
                if (!result) throw new Error('Auth Error');
                return this.getLeads(query);
            }

            return [];
        }
    }
}
