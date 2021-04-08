import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class WindowRef {
    private readonly _nativeWindow: Window;

    constructor () {
        // let's just assume it's always there 🙈
        this._nativeWindow = window;
    }

    public get window (): Window {
        return this._nativeWindow;
    }
}
