import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, radius } from "../theme";

interface Props extends TextInputProps {
  label: string;
  rightAccessory?: React.ReactNode;
  error?: string | null; // có lỗi → viền đỏ + dòng báo lỗi NGAY DƯỚI ô nhập
}

export function FormField({ label, error, style, rightAccessory, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, rightAccessory ? { paddingRight: 48 } : null, error ? styles.inputError : null, style]}
          accessibilityLabel={label}
          placeholderTextColor={colors.muted}
          autoCapitalize="none"
          {...rest}
        />
        {rightAccessory ? <View style={styles.accessory}>{rightAccessory}</View> : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: { position: "relative" },
  accessory: { position: "absolute", right: 12, top: 0, bottom: 0, justifyContent: "center" },
  wrap: { gap: 4 },
  label: { fontWeight: "700", color: colors.text },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line, borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 10, color: colors.text },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: 12 },
});
