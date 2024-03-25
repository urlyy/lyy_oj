function isBitSet(number, bitPosition) {
    // 将 1 左移 bitPosition 位，与 number 进行按位与运算
    // 如果结果为 0，则表示该位上的值为 0；否则为 1
    return (number & (1 << bitPosition)) !== 0;
}

