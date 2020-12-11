export interface CommonDialogConfig {
    title?: string;
    message?: string;
    textButton?: string;
    isCancelable?: boolean;
    data?: null | boolean | any;
    textButtonCancel?: string;
}

export class CommonDialog implements CommonDialogConfig {
    title = 'Title';
    message = 'message';
    textButton = 'OK';
    data = null;
    isCancelable = false;
    textButtonCancel = 'CANCEL';

    constructor(options: CommonDialogConfig) {
        Object.keys(options).forEach(key => {
            this[key] = options[key];
        });
    }
}

export class DialogEvent<T> {
    private event: 'start' | 'cancel' | 'submit' | 'destroy';
    private data: T;

    constructor(
        event: 'start' | 'cancel' | 'submit' | 'destroy' = 'start',
        data?: T
    ) {
        this.event = event;
        this.data = data;
    }

    isStart(): boolean {
        return this.event === 'start';
    }

    isCancel(): boolean {
        return this.event === 'cancel';
    }

    isSubmit(): boolean {
        return this.event === 'submit';
    }

    isDestroy(): boolean {
        return this.event === 'destroy';
    }

    getData(): T {
        return this.data;
    }

    setData(data: T): void {
        this.data = data;
    }

    getEvent(): 'start' | 'cancel' | 'submit' | 'destroy' {
        return this.event;
    }

    setEvent(event: 'start' | 'cancel' | 'submit' | 'destroy'): void {
        this.event = event;
    }
}
