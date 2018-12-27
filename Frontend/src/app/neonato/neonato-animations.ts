import { trigger, transition, style, animate } from "@angular/animations";


export const formularioStateTrigger = trigger('formularioState', [
    transition(':enter', [
        style({
            transform: 'translateX(-100%)',
            opacity:0
        }),
        animate('500ms ease-out')
    ]),
    transition(':leave', animate('500ms ease-in', style({
        transform: 'translateX(100%)',
        opacity: 0
    })))
])