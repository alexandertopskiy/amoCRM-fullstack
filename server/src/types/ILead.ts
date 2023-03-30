import IResponsibleUser from './IResponsibleUser';
import IContact from './IContact';
import IStatus from './IStatus';

export default interface ILead {
    id: number; // ID сделки
    name: string; // Название сделки
    price: number; // Бюджет сделки
    responsible_user: IResponsibleUser; // Ответственный за сделку
    status: IStatus; // Статус сделки
    created_at: string; // Дата создания сделки (ISO Date)
    contacts: IContact[]; // Связанные контакты
}
