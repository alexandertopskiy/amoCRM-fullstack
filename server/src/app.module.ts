import { Module } from '@nestjs/common';
import { LeadsModule } from './leads/leads.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        // Модуль конфигурации (для работы с переменными окружения)
        // по умолчанию метод forRoot ищет файл ".env"
        //  если название отличается, то нужно передать методу объект со свойством envFilePath: 'cutsomName'
        ConfigModule.forRoot(),
        LeadsModule
    ]
})
export class AppModule {}
