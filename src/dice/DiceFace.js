export function DiceFace({value, onChangeValue}) {
    return (
        <input className="face" value={value} onChange={e => onChangeValue(e.target.value)}/>
    );
}
