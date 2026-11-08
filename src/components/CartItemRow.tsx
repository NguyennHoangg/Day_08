import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDebounce } from "../hooks/useDebounce";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);
  const pending = useRef(false);
  // Chỉ ghi thay đổi do nút bấm, tránh ghi giá trị cũ khi store vừa đổi.
  useEffect(() => {
    if (pending.current && debouncedQty === qty) {
      pending.current = false;
      if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty, qty, item.bookId, item.quantity, onChangeQty]);
  useEffect(() => {
    pending.current = false;
    setQty(item.quantity);
  }, [item.quantity]);
  const changeQty = (delta: number) => {
    pending.current = true;
    setQty((q) => Math.max(1, Math.min(item.stock, q + delta)));
  };
  const canDec = qty > 1;
  const canInc = qty < item.stock;
  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.controls}>
          <Pressable accessibilityRole="button" accessibilityLabel="Giảm" disabled={!canDec}
            style={[styles.step, !canDec && styles.disabled]} onPress={() => changeQty(-1)}><Text>−</Text></Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Tăng" disabled={!canInc}
            style={[styles.step, !canInc && styles.disabled]} onPress={() => changeQty(1)}><Text>+</Text></Pressable>
        </View>
        <Text style={styles.stock}>Còn {item.stock}</Text>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  controls: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 6 },
  step: { width: 34, height: 34, borderWidth: 1, borderColor: colors.line, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  disabled: { opacity: 0.35 },
  stock: { color: colors.muted, fontSize: 12 },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  trash: { fontSize: 22 },
});
