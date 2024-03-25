export default (permission, bitPosition) => {
    return (permission & (1 << bitPosition)) !== 0;
}