import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {
    public setItem<TStorage> (key: string, value: TStorage): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem<TStorage> (key: string): TStorage | null {
        try {
            return JSON.parse(window.localStorage.getItem(key) ?? '');
        } catch {
            return null;
        }
    }
}
