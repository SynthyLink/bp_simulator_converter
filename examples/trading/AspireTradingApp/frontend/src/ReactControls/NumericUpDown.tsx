import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface NumericUpDownProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

export const NumericUpDown: React.FC<NumericUpDownProps> = ({
    value,
    onChange,
    min = -Infinity,
    max = Infinity,
    step = 1,
}) => {
    const handleIncrement = () => {
        const nextVal = value + step;
        if (nextVal <= max) onChange(nextVal);
    };

    const handleDecrement = () => {
        const nextVal = value - step;
        if (nextVal >= min) onChange(nextVal);
    };

    const handleTextChange = (text: string) => {
        const parsed = parseFloat(text);
        if (isNaN(parsed)) {
            onChange(min === -Infinity ? 0 : min);
        } else if (parsed >= min && parsed <= max) {
            onChange(parsed);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleDecrement}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(value)}
                onChangeText={handleTextChange}
            />

            <TouchableOpacity style={styles.button} onPress={handleIncrement}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 8,
    },
});
