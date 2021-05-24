export default function integerToBRL(value) {
    let floatValue = parseFloat(value)
    return floatValue.toLocaleString('pt-br', {'style': 'currency', 'currency': 'BRL'})
}