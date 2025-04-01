declare module 'react-confetti' {
    import { Component } from 'react';
    
    interface ConfettiProps {
        width?: number;
        height?: number;
        numberOfPieces?: number;
        recycle?: boolean;
        run?: boolean;
    }
    
    export default class Confetti extends Component<ConfettiProps> {}
}

declare module 'react-use/lib/useWindowSize' {
    export default function useWindowSize(): { width: number; height: number };
}
