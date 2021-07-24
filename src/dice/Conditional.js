export function Conditional({condition, ifTrue, ifFalse}) {
    if (condition) return ifTrue;
    return ifFalse;
}
