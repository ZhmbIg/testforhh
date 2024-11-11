import dotenv from 'dotenv';
import axios from 'axios';
import { Tariff } from '../models/tariffs.js';

dotenv.config();

export const fetchTariffs = async (): Promise<Tariff[]> => {
    try {
        const date = new Date().toISOString().split('T')[0];

        const response = await axios.get('https://common-api.wildberries.ru/api/v1/tariffs/box', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.WILDBERRIES_API_KEY}`,
                'Content-Type': 'application/json',
            },
            params: { date },
        });

        const warehouseList = response.data.response.data.warehouseList;

        const tariffs: Tariff[] = warehouseList.map((item: any) => ({
            warehouse_name: item.warehouseName,
            box_delivery_and_storage_expr: item.boxDeliveryAndStorageExpr,
            box_delivery_base: item.boxDeliveryBase,
            box_delivery_liter: item.boxDeliveryLiter,
            box_storage_base: item.boxStorageBase,
            box_storage_liter: item.boxStorageLiter,
            dt_next_box: item.dtNextBox ? new Date(item.dtNextBox) : new Date(), 
            dt_till_max: item.dtTillMax ? new Date(item.dtTillMax) : new Date(),
            created_at: new Date(),
            updated_at: new Date(),
        }));

        return tariffs;
    } catch (error) {
        console.error('Error fetching tariffs from Wildberries API:', error);
        return [];
    }
};
