import * as fs from 'fs';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import ICredentialsData from 'src/types/ICredentialsData';
import ILead from 'src/types/ILead';
import IResponsibleUser from 'src/types/IResponsibleUser';
import IContact from 'src/types/IContact';
import IStatus from 'src/types/IStatus';

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

    // helper-функция для запроса к amoCRM
    private async makeAmoGetRequest(endpoint: string, params: string = '', destruct = true) {
        const url = `https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/${endpoint}${params}`;
        const accessToken = this.getCredentialsData()?.access_token;
        const response = await axios.get(url, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        });
        return destruct ? response.data._embedded[endpoint] : response.data._embedded;
    }

    private async getResponsibleUsers(): Promise<IResponsibleUser[]> {
        try {
            const responseData = await this.makeAmoGetRequest('users');
            const normalizedUsers: IResponsibleUser[] = [];
            responseData.forEach(el =>
                normalizedUsers.push({
                    id: el.id,
                    name: el.name,
                    email: el.email
                })
            );
            return normalizedUsers;
        } catch (error) {
            console.log('getResponsibleUsers error: ' + error);
        }
    }

    private async getAllStatuses() {
        try {
            const { pipelines } = await this.makeAmoGetRequest('leads/pipelines', '', false);
            const normalizedStatuses: IStatus[] = [];

            pipelines.forEach(pipeline => {
                pipeline._embedded.statuses.forEach(status => {
                    normalizedStatuses.push({
                        id: status.id,
                        name: status.name,
                        color: status.color
                    });
                });
            });

            return normalizedStatuses;
        } catch (error) {
            console.log('getAllStatuses error: ' + error);
        }
    }

    private async getAllContacts(): Promise<IContact[]> {
        try {
            const responseData = await this.makeAmoGetRequest('contacts');
            const normalizedContacts: IContact[] = [];
            responseData.forEach(el => {
                const email = el.custom_fields_values?.find(field => field.field_code === 'EMAIL');
                const phone = el.custom_fields_values?.find(field => field.field_code === 'PHONE');

                normalizedContacts.push({
                    id: el.id,
                    name: el.name,
                    email: email?.values[0].value,
                    phone: phone?.values[0].value
                });
            });
            return normalizedContacts;
        } catch (error) {
            console.log('getContacts error: ' + error);
        }
    }

    async getLeads(query: string) {
        try {
            console.log('Get All Leads with Query: ' + query);

            const leadsArray = await this.makeAmoGetRequest('leads', `?query=${query}&with=contacts`);
            console.log('Success. Найдено сделок:', leadsArray.length);

            const allResponsibles = await this.getResponsibleUsers();
            const allStatuses = await this.getAllStatuses();
            const allContacts = await this.getAllContacts();

            const normalizedLeads: ILead[] = [];
            leadsArray.forEach(lead => {
                const leadContacts = lead._embedded.contacts.map(contact => allContacts.find(c => contact.id === c.id));
                const leadStatus = allStatuses.find(status => status.id === lead.status_id);
                const leadResponsible = allResponsibles.find(user => user.id === lead.responsible_user_id);

                normalizedLeads.push({
                    id: lead.id,
                    name: lead.name,
                    price: lead.price,
                    responsible_user: leadResponsible,
                    status: leadStatus,
                    created_at: new Date(lead.created_at * 1000).toISOString(),
                    contacts: leadContacts
                });
            });

            return normalizedLeads;
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
