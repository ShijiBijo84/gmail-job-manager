export function confidenceVariant(confidence: number) {
    if (confidence >= 0.8) {
        return "bg-green-600 text-green-100 border-green-500";      // stronger green background and lighter text
    } else if (confidence >= 0.5) {
        return "bg-yellow-500 text-yellow-900 border-yellow-400";  // more distinct amber/yellow with dark text
    } else {
        return "bg-gray-400 text-gray-900 border-gray-600";        // noticeable gray background and dark text for contrast
    }
}
