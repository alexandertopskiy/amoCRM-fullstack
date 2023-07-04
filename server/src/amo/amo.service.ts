import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AmoService {
    // инжектим сервис для работы с файлами
    constructor(private filesService: FilesService) {}

    /**
     * Helper-функция для выполнения GET-запроса к amoCRM для получения данных
     *
     * @param endpoint - интересующий эндпоинт
     * @param params - параметры
     * @param destruct -
     * @returns {Promise<any>}
     */
    async makeAmoGetRequest(endpoint: string, params: string = '', destruct = true): Promise<any> {
        const url = `https://${process.env.SUBDOMAIN}.amocrm.ru/api/v4/${endpoint}${params}`;

        // получаем accessToken из локального JSON-файла
        const accessToken = (await this.filesService.getCredentialsData())?.access_token;

        // делаем запрос с токеном в Auth-хэдере
        const response = await axios.get(url, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        });

        return destruct ? response.data._embedded[endpoint] : response.data._embedded;
    }
}
