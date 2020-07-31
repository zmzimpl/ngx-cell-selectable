import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TableDataService {

    getTableColumns(): any[] {
        return [
            { binding: 'index', title: 'index' },
            { binding: 'name', title: 'name' },
            { binding: 'age', title: 'age' },
            { binding: 'address', title: 'address' },
        ];
    }


    getTableData(): any[] {
        const data = [];
        for (let i = 0; i < 200; i++) {
        data.push({
            index: i,
            name: `Edward`,
            age: i,
            address: `London`,
        });
        }
        return data;
    }
}
