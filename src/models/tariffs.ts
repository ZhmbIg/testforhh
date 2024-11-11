export interface Tariff {
    id: number;
    warehouse_name: string;
    box_delivery_and_storage_expr: string;
    box_delivery_base: string;
    box_delivery_liter: string;
    box_storage_base: string;
    box_storage_liter: string;
    dt_next_box: string;
    dt_till_max: string;
    created_at: Date;
    updated_at: Date;
  }
  